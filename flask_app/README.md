# AI Dashboard

A modern and futuristic AI Dashboard with OpenAI integration, featuring dynamic layouts and interactive tools.

## Features

- 🎨 Modern and responsive UI with dark/light theme support
- 💬 Interactive AI chat with GPT-3.5/GPT-4 models
- 🛠️ Various AI tools for text analysis, image processing, and more
- 📊 Data visualization and analysis capabilities
- 🔄 Real-time updates and animations
- 📱 Mobile-friendly design

## Tech Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **AI Integration**: OpenAI API
- **Icons**: Material Design Icons
- **Styling**: Custom CSS with CSS Variables
- **Session Management**: Flask-Session

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Smauldin100/ai-dashboard.git
cd ai-dashboard
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the project root:
```env
FLASK_SECRET_KEY=your-secret-key
OPENAI_API_KEY=your-openai-api-key
```

5. Run the application:
```bash
python app.py
```

The application will be available at `http://localhost:5003`.

## Project Structure

```
ai-dashboard/
├── app.py              # Main Flask application
├── requirements.txt    # Python dependencies
├── static/
│   ├── css/
│   │   └── styles.css # Global styles
│   └── js/
│       └── main.js    # Global JavaScript
└── templates/
    ├── base.html      # Base template
    ├── index.html     # Home page
    ├── chat.html      # Chat interface
    └── tools.html     # AI tools page
```

## Features in Detail

### AI Chat
- Real-time chat interface with OpenAI models
- Adjustable parameters (temperature, context length)
- Message history and export options
- Copy and save functionality for messages

### Tools
- Text Analysis: Process and analyze text content
- Image Processing: Handle and transform images
- Data Analysis: Analyze datasets with AI
- Translation: Translate text between languages

### Theme Support
- Dark and light theme options
- Persistent theme preference
- Smooth theme transitions

### Responsive Design
- Mobile-first approach
- Collapsible sidebar
- Adaptive layouts

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 