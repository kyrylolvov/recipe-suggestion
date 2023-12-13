import { NextRequest, NextResponse } from 'next/server';
import { LangChainStream, StreamingTextResponse } from 'ai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { HumanMessage, AIMessage } from 'langchain/schema';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const ingredients = requestBody.ingredients as string;

    if (!ingredients) {
      return NextResponse.json({ error: 'Invalid ingredients format' }, { status: 400 });
    }

    const { stream, handlers } = LangChainStream();

    const model = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.5,
      streaming: true,
    });

    model
      .call([new HumanMessage(`Given ingredients ${ingredients}, suggest a recipe`)], {}, [handlers])
      .catch(console.error);

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error processing your request' }, { status: 500 });
  }
}
