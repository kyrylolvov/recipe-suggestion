import { NextRequest, NextResponse } from 'next/server';

import { ChatOpenAI } from 'langchain/chat_models/openai';
import { ChatPromptTemplate } from 'langchain/prompts';
import { StringOutputParser } from 'langchain/schema/output_parser';

const prompt = ChatPromptTemplate.fromMessages([['human', 'Given ingredients ${ingredients}, suggest a recipe']]);
const model = new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.5 });

const outputParser = new StringOutputParser();

const chain = prompt.pipe(model).pipe(outputParser);

async function generateRecipes(ingredients: string): Promise<string> {
  const response = await chain.invoke({ ingredients: ingredients });
  return response;
}

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const ingredients = requestBody.ingredients as string;

    console.log(ingredients);

    if (!ingredients) {
      return NextResponse.json({ error: 'Invalid ingredients format' }, { status: 400 });
    }

    const recipe = await generateRecipes(ingredients);
    return NextResponse.json({ recipe }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error processing your request' }, { status: 500 });
  }
}
