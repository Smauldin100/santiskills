import 'dotenv/config';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function run() {
  try {
    const res = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: 'Reply with: ✅ OpenAI key is working' }],
      temperature: 0
    });
    console.log(res.choices[0].message.content);
  } catch (e) {
    console.error('❌ OpenAI key test failed:', e.message);
  }
}
run();

import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js"
import { Client } from "@modelcontextprotocol/sdk/client/index.js"

const transport = new StreamableHTTPClientTransport("https://server.smithery.ai/@docfork/mcp/mcp?api_key=9185d773-d696-4de4-b390-69369b7ee528&profile=initial-limpet-LCy2gf")

// Create MCP client
const client = new Client({
	name: "Docfork",
	version: "1.0.0"
})
await client.connect(transport)

// List available tools
const tools = await client.listTools()
console.log(`Available tools: ${tools.map(t => t.name).join(", ")}`)

/* Call a tool (when LLM requests it)
const result = await client.callTool({
  name: "tool-name",
  arguments: { arg1: "value" }
})
console.log("Tool result:", result.content) */