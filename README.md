# Santiskills Dashboard

Futuristic personal finance and productivity workspace built with React, Tailwind-inspired styling, and an AI copilot powered by OpenAI. The project bundles a rich front-end dashboard, a Flask API for AI/chat tooling, and an optional Plaid sandbox backend for financial account linking.

---

## ✨ Features
- **Unified dashboard** for budgets, expenses, income tracking, tasks, calendar, and analytics
- **AI Copilot** chat drawer that streams answers from OpenAI with persistent local history
- **Financial widgets** including crypto prices, planner, and tracker views
- **Responsive layout** with glassmorphism and neon accents designed for desktop/mobile
- **Backend services**
  - `flask_app/` exposes chat, data-analysis, and crypto endpoints
  - `backend-plaid/` provides Plaid link token generation (sandbox ready)
- **Proxy routing** via `src/setupProxy.js` so the React dev server can talk to Flask without CORS headaches

---

## 🧱 Project Structure
```
├── src/                    # React application
│   ├── components/         # Layout, finance widgets, AI Copilot
│   ├── pages/              # Route-level pages (Dashboard, Planner, etc.)
│   ├── services/           # Local storage, crypto helpers, proxy config
│   └── utils/              # OpenAI client and data helpers
├── flask_app/              # Flask backend (OpenAI proxy, crypto APIs)
├── backend-plaid/          # Express Plaid sandbox server
├── test-openai.mjs         # Node script to sanity-check OpenAI credentials
└── use-token.sh            # Helper for updating git remotes with PATs
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- Python 3.11+
- (Optional) Plaid sandbox keys if you intend to run the Plaid backend

### 1. Clone & Install Frontend
```bash
git clone https://github.com/Smauldin100/santiskills.git
cd santiskills
npm install
```

### 2. Configure Environment
Create a `.env` file at the repository root (already git-ignored):
```dotenv
OPENAI_API_KEY=sk-your-secret
REACT_APP_OPENAI_API_KEY=sk-your-secret   # CRA only exposes REACT_APP* vars to the browser
# Optional: point the proxy to a remote Flask instance
# REACT_APP_API_PROXY_TARGET=https://your-backend-host
```
> The React OpenAI client will refuse to run until a key (length > 20) is supplied.

### 3. Run the React App
```bash
npm start
```
The CRA dev server proxies `/api/*` and `/healthz` to the Flask backend on `http://127.0.0.1:5003` by default (see `src/setupProxy.js`).

---

## 🧠 AI & Backend Services

### Flask App (`flask_app/`)
Handles OpenAI chat completions, data analysis, and crypto endpoints.

```bash
cd flask_app
python -m venv .venv
. .venv/Scripts/activate   # Windows
pip install -r requirements.txt

# Environment (.venv/.env or shell)
export OPENAI_API_KEY=sk-your-secret
export FLASK_SECRET_KEY=super-secret
export CRYPTO_API_KEY=...        # optional, CoinGecko demo key also works
export CRYPTO_API_URL=https://api.coingecko.com/api/v3

python app.py  # runs on http://127.0.0.1:5003 by default
```

### Plaid Backend (`backend-plaid/`)
Provides a sandbox link-token endpoint.
```bash
cd backend-plaid
npm install
cp .env.example .env   # create if needed
# Set PLAID_CLIENT_ID, PLAID_SECRET, PORT=8080 etc.
npm start
```
Update `PLAID_CLIENT_ID` and `PLAID_SECRET` with real sandbox credentials before production use.

---

## 🧪 Testing & Utilities
- `npm test` — CRA testing harness (currently smoke tests only)
- `npm run build` — production build
- `node test-openai.mjs` — quick OpenAI token sanity check

---

## 🔐 Security Notes
- `.env`, `.env*`, `build/`, and other local artifacts are ignored via `.gitignore`
- Never commit real API keys or Plaid secrets; the repo contains sandbox placeholders only
- `dangerouslyAllowBrowser: true` is enabled in `openaiService.js` for development convenience; prefer proxying through the Flask backend in production

---

## 📄 License
This repository inherits license information from the original Santiskills dashboard. See the appropriate `LICENSE` files under `ChatStorege/package/` and `flask_app/` if applicable.

---

## 🙌 Contributing
1. Fork the repo & create a feature branch
2. Run `npm test` and/or backend tests before submitting
3. Open a PR with a concise summary of the change

Feel free to file issues or feature requests in the GitHub repo!
