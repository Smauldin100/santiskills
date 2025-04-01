# Setting Up OpenAI for Your Dashboard Chatbot

This guide will help you set up the OpenAI integration for your SantiSkills Dashboard chatbot.

## Prerequisites

1. An OpenAI account (create one at [https://platform.openai.com/signup](https://platform.openai.com/signup))
2. An API key from OpenAI

## Getting Your OpenAI API Key

1. Log in to your OpenAI account at [https://platform.openai.com](https://platform.openai.com)
2. Navigate to your API keys: [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
3. Click "Create new secret key"
4. Give your key a name (e.g., "SantiSkills Chatbot")
5. Copy the API key (important: you won't be able to view it again after closing the window)

## Setting Up Your API Key in the Dashboard

### Option 1: Using Environment Variables (Recommended for Development)

1. In your project root, create or edit the `.env` file
2. Add the following line, replacing `your-api-key-here` with your actual OpenAI API key:
   ```
   REACT_APP_OPENAI_API_KEY=your-api-key-here
   ```
3. Restart your development server with `npm start`

### Option 2: Updating the Code Directly (Not Recommended)

If you're unable to use environment variables, you can hardcode the API key, but this is not recommended for security reasons:

1. Open `src/utils/openaiService.js`
2. Replace the `OPENAI_API_KEY` value with your actual API key
3. Make sure not to commit this change to a public repository

## Using the Chatbot with OpenAI

Once set up, you can switch between the simulated AI and OpenAI:

1. Click the question mark icon to open the chatbot
2. Click the "Switch to OpenAI" button in the chatbot header
3. You can also type "use OpenAI" or "switch to OpenAI" as a message to enable OpenAI mode

## Protecting Your API Key

When deploying your application:

1. **Never commit your API key** to public repositories
2. Consider using environment variables on your hosting platform
3. For production applications, you may want to implement a backend service that securely handles the API calls to OpenAI

## Troubleshooting

If you see the error "OpenAI API key is not configured":
- Check that your `.env` file is properly set up with the correct variable name
- Make sure you've restarted your development server after adding the key
- Verify that your API key is valid in the OpenAI dashboard

## Further Security Considerations

For a production application, consider:

1. Using a backend proxy to make the API calls, so your API key isn't exposed in the frontend
2. Implementing rate limiting to control usage
3. Setting up proper authentication for users of your chatbot 