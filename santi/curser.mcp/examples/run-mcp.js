// Script to run the MCP client and connect it to the server
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

async function main() {
  try {
    console.log('Starting MCP client and connecting to server...');
    
    // Create a transport that connects to our server script
    const transport = new StdioClientTransport({
      command: 'node',
      args: ['examples/server.js']
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
      console.log('Available resources:', JSON.stringify(resources, null, 2));
    } catch (error) {
      console.error('Error listing resources:', error.message);
    }

    // List available tools
    try {
      console.log('Listing tools...');
      const tools = await client.listTools();
      console.log('Available tools:', JSON.stringify(tools, null, 2));
    } catch (error) {
      console.error('Error listing tools:', error.message);
    }

    // List available prompts
    try {
      console.log('Listing prompts...');
      const prompts = await client.listPrompts();
      console.log('Available prompts:', JSON.stringify(prompts, null, 2));
    } catch (error) {
      console.error('Error listing prompts:', error.message);
    }

    // Call the add tool
    try {
      console.log('Calling add tool...');
      const result = await client.callTool({
        name: 'add',
        arguments: {
          a: 5,
          b: 7
        }
      });
      console.log('Add tool result:', JSON.stringify(result, null, 2));
    } catch (error) {
      console.error('Error calling add tool:', error.message);
    }

    // Read a greeting resource
    try {
      console.log('Reading greeting resource...');
      const resource = await client.readResource('greeting://World');
      console.log('Greeting resource:', JSON.stringify(resource, null, 2));
    } catch (error) {
      console.error('Error reading greeting resource:', error.message);
    }

    // Get a prompt
    try {
      console.log('Getting greet prompt...');
      const prompt = await client.getPrompt('greet', {
        name: 'World'
      });
      console.log('Greet prompt:', JSON.stringify(prompt, null, 2));
    } catch (error) {
      console.error('Error getting greet prompt:', error.message);
    }

    console.log('Client operations completed.');
  } catch (error) {
    console.error('Client error:', error);
  }
}

// Run the main function
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
}); 