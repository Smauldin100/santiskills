// Simple MCP client example
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

// This function demonstrates how to use the MCP client
async function runClient() {
  try {
    console.log('Starting MCP client...');
    
    // Create a transport that connects to a server via stdio
    // Replace 'node' and 'server.js' with your actual server command
    const transport = new StdioClientTransport({
      command: 'echo',
      args: ['{"jsonrpc":"2.0","id":"1","method":"hello","params":{"version":"1.0.0"}}']
    });

    // Create the client
    const client = new Client(
      {
        name: 'example-client',
        version: '1.0.0'
      },
      {
        capabilities: {
          prompts: {},
          resources: {},
          tools: {}
        }
      }
    );

    console.log('Connecting to server...');
    await client.connect(transport);
    console.log('Connected to server!');

    // List available resources
    try {
      console.log('Listing resources...');
      const resources = await client.listResources();
      console.log('Available resources:', resources);
    } catch (error) {
      console.error('Error listing resources:', error.message);
    }

    // List available tools
    try {
      console.log('Listing tools...');
      const tools = await client.listTools();
      console.log('Available tools:', tools);
    } catch (error) {
      console.error('Error listing tools:', error.message);
    }

    // List available prompts
    try {
      console.log('Listing prompts...');
      const prompts = await client.listPrompts();
      console.log('Available prompts:', prompts);
    } catch (error) {
      console.error('Error listing prompts:', error.message);
    }

    console.log('Client operations completed.');
  } catch (error) {
    console.error('Client error:', error);
  }
}

// Run the client
runClient().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
}); 