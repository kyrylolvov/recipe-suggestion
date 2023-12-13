import { NextRequest, NextResponse } from 'next/server';
import { LangChainStream, StreamingTextResponse } from 'ai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { HumanMessage, AIMessage } from 'langchain/schema';

// Indicate that this function runs on Vercel's Edge runtime
export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body from the incoming request
    const requestBody = await request.json();
    const ingredients = requestBody.ingredients as string;

    // Validate the input; return an error response if validation fails
    if (!ingredients) {
      return NextResponse.json({ error: 'Invalid ingredients format' }, { status: 400 });
    }

    // Initialize LangChainStream for handling streaming responses
    const { stream, handlers } = LangChainStream();

    // Create an instance of ChatOpenAI with necessary configurations
    // Ensure that the API key is securely provided through environment variables
    const model = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.5,
      streaming: true, // Enable streaming
    });

    // Call the ChatOpenAI model with the user's message
    // Handlers are used to manage streaming callbacks
    model
      .call([new HumanMessage(`Given ingredients ${ingredients}, suggest a recipe`)], {}, [handlers])
      .catch(console.error); // Catch and log any errors during the API call

    // Return a StreamingTextResponse to stream the AI output back to the client
    return new StreamingTextResponse(stream);
  } catch (error) {
    // Handle any other errors and send an error response to the client
    console.error(error);
    return NextResponse.json({ error: 'Error processing your request' }, { status: 500 });
  }
}
