from flask import Flask, render_template, jsonify, request
from dotenv import load_dotenv
import os
import openai
import requests

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('FLASK_SECRET_KEY', 'default-secret-key')

# Initialize OpenAI client
openai.api_key = os.getenv('OPENAI_API_KEY')
DEFAULT_MODEL = os.getenv('OPENAI_MODEL', 'gpt-4o-mini')
DEFAULT_TEMPERATURE = float(os.getenv('OPENAI_TEMPERATURE', '0.3'))

# Crypto API configuration
CRYPTO_API_KEY = os.getenv('CRYPTO_API_KEY')
CRYPTO_API_URL = os.getenv('CRYPTO_API_URL', 'https://api.coingecko.com/api/v3')

# Server configuration
HOST = os.getenv('HOST', '0.0.0.0')
PORT = int(os.getenv('PORT', 5003))
DEBUG = os.getenv('DEBUG', 'True').lower() == 'true'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/chat')
def chat():
    return render_template('chat.html')

@app.route('/tools')
def tools():
    return render_template('tools.html')

@app.route('/api/chat', methods=['POST'])
def process_chat():
    try:
        data = request.json
        message = data.get('message', '')
        system_prompt = data.get('system')
        
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": message})

        response = openai.chat.completions.create(
            model=DEFAULT_MODEL,
            temperature=DEFAULT_TEMPERATURE,
            messages=messages
        )
        
        return jsonify({
            'response': response.choices[0].message.content,
            'status': 'success'
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

@app.route('/api/analyze', methods=['POST'])
def analyze_data():
    try:
        data = request.json
        content = data.get('content', '')
        
        response = openai.chat.completions.create(
            model=DEFAULT_MODEL,
            temperature=DEFAULT_TEMPERATURE,
            messages=[
                {"role": "system", "content": "You are a helpful data analysis assistant."},
                {"role": "user", "content": content}
            ]
        )
        
        return jsonify({
            'analysis': response.choices[0].message.content,
            'status': 'success'
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

@app.route('/api/copilot/chat', methods=['POST'])
def copilot_chat():
    try:
        data = request.json or {}
        messages = data.get('messages', [])
        temperature = float(data.get('temperature', DEFAULT_TEMPERATURE))
        model = data.get('model', DEFAULT_MODEL)

        if not messages:
            return jsonify({
                'error': 'messages required',
                'status': 'error'
            }), 400

        response = openai.chat.completions.create(
            model=model,
            temperature=temperature,
            messages=messages
        )

        return jsonify({
            'content': response.choices[0].message.content,
            'model': model,
            'status': 'success'
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

@app.route('/api/crypto/prices', methods=['GET'])
def get_crypto_prices():
    try:
        # Get list of cryptocurrencies from query parameters
        coins = request.args.get('coins', 'bitcoin,ethereum,cardano')
        vs_currency = request.args.get('vs_currency', 'usd')
        
        # Make request to CoinGecko API
        url = f"{CRYPTO_API_URL}/simple/price"
        params = {
            'ids': coins,
            'vs_currencies': vs_currency,
            'include_24hr_change': 'true'
        }
        
        # Add API key if available
        headers = {}
        if CRYPTO_API_KEY:
            headers['x-cg-demo-api-key'] = CRYPTO_API_KEY
        
        response = requests.get(url, params=params, headers=headers)
        response.raise_for_status()
        
        return jsonify({
            'data': response.json(),
            'status': 'success'
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

@app.route('/api/crypto/trending', methods=['GET'])
def get_trending_crypto():
    try:
        url = f"{CRYPTO_API_URL}/search/trending"
        headers = {}
        if CRYPTO_API_KEY:
            headers['x-cg-demo-api-key'] = CRYPTO_API_KEY
        
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        return jsonify({
            'data': response.json(),
            'status': 'success'
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

@app.route('/healthz', methods=['GET'])
def health_check():
    """Health check endpoint for monitoring and CI/CD"""
    return jsonify({
        'ok': True,
        'status': 'healthy',
        'timestamp': str(os.getenv('HOST', '0.0.0.0')),
        'port': PORT
    }), 200

if __name__ == '__main__':
    app.run(host=HOST, port=PORT, debug=DEBUG) 