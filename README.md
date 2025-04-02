# SantiSkills Dashboard

An interactive dashboard showcasing Santiago Mauldin's skills, projects, experience, education, and certifications. Built with React and Material-UI.

## 📌 Live Demo
Visit the live dashboard at: [https://smauldin100.github.io/santiskills-dashboard](https://smauldin100.github.io/santiskills-dashboard)

## ✨ Features
- Professional profile section with contact information
- Interactive skills radar chart with category filtering
- Project portfolio with detailed cards and completion status
- Interactive experience timeline
- Education and certification sections
- Skills growth timeline showing progression over time
- Programming language usage statistics
- Modern Material-UI design system
- Responsive layout for all devices

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/Smauldin100/santiskills-dashboard.git
cd santiskills-dashboard
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set Up Environment Variables
Create a `.env` file in the root directory and add necessary environment variables:
```env
REACT_APP_API_URL=your_api_url_here
```

### Step 4: Start Development Server
```bash
npm start
```
The app will open at [http://localhost:3000](http://localhost:3000)

## 📦 Project Structure
```
santiskills-dashboard/
├── public/                 # Static files
├── src/                    # Source code
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── assets/           # Images and static assets
│   ├── styles/           # CSS and style files
│   ├── utils/            # Utility functions
│   └── App.js            # Main App component
├── package.json          # Project dependencies
└── README.md            # Project documentation
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Runs the app in development mode |
| `npm test` | Launches the test runner |
| `npm run build` | Builds the app for production |
| `npm run deploy` | Deploys the app to GitHub Pages |

## 🚀 Deployment Guide

### Deploying to GitHub Pages

1. Update the `homepage` field in `package.json`:
```json
{
  "homepage": "https://Smauldin100.github.io/santiskills-dashboard"
}
```

2. Install GitHub Pages dependency (if not already installed):
```bash
npm install --save-dev gh-pages
```

3. Deploy the application:
```bash
npm run deploy
```

The app will be deployed to the `gh-pages` branch and accessible at your GitHub Pages URL.

## 🔧 Technologies Used
- React 18
- Material-UI
- React Router DOM
- Recharts for data visualization
- Firebase (for backend services)
- GitHub Pages (for deployment)
- Formik & Yup (for form handling)
- React Big Calendar
- Styled Components

## 🤝 Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Create a Pull Request

## 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact
Santiago Mauldin - [GitHub Profile](https://github.com/Smauldin100)

## 🙏 Acknowledgments
- Create React App team for the initial project setup
- Material-UI team for the component library
- All contributors who have helped improve this dashboard
