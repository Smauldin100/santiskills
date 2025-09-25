import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './components/Navigation/Sidebar';
import Settings from './components/Settings/Settings';
import FinancesSection from './components/Finances/FinancesSection';
import ProfilePage from './components/Profile/ProfilePage';
import CalendarPage from './components/Calendar/CalendarPage';
import TasksPage from './components/Tasks/TasksPage';
import NotificationsPage from './components/Notifications/NotificationsPage';
import ProfileHeader from './components/ProfileHeader';
import SkillsRadarChart from './components/charts/SkillsRadarChart';
import ProjectsSection from './components/sections/ProjectsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import EducationSection from './components/sections/EducationSection';
import CertificationsSection from './components/sections/CertificationsSection';
import SkillsTimelineChart from './components/charts/SkillsTimelineChart';
import LanguageUsageChart from './components/charts/LanguageUsageChart';
import Globe from 'react-globe.gl';
import CryptoDataView from './components/CryptoDataView';
import axios from 'axios';
import './App.css';
import FilesMediaPage from './components/Files/FilesMediaPage';
import TrackersPage from './components/Trackers/TrackersPage';
import CryptoPricesDisplay from './components/Finances/CryptoPricesDisplay';
import Copilot from './components/Copilot/Copilot';

const AppContainer = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  margin-left: 250px;
  width: calc(100% - 250px);
  min-height: 100vh;
  background: #f8f9fa;
  padding: 20px;
  box-sizing: border-box;
`;

const Dashboard = () => (
  <>
    <ProfileHeader />
    <div className="dashboard-layout">
      <div className="dashboard-left-column">
        <CryptoPricesDisplay />
      </div>
      <div className="dashboard-right-content">
        <div className="dashboard-grid">
          <div className="dashboard-item skills-item">
            <SkillsRadarChart />
          </div>
          <div className="dashboard-item language-item">
            <LanguageUsageChart />
          </div>
        </div>
        <SkillsTimelineChart />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <CertificationsSection />
      </div>
    </div>
  </>
);

const ChatPage = styled.div`
  height: calc(100vh - 40px);
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

function App() {
  const [showToolsPanel, setShowToolsPanel] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [mapWeather, setMapWeather] = useState([]);
  const [mapExchanges, setMapExchanges] = useState([]);
  const [toolsPanelOutput, setToolsPanelOutput] = useState('');

  const handleShowMap = () => {
    setShowMap(true);
    axios
      .get('https://api.openweathermap.org/data/2.5/find', {
        params: {
          lat: 0,
          lon: 0,
          cnt: 30,
          appid: 'b6907d289e10d714a6e88b30761fae22',
        },
      })
      .then(res => setMapWeather(res.data.list || []));
    axios
      .get('https://api.coingecko.com/api/v3/exchanges')
      .then(res => setMapExchanges(res.data.slice(0, 30)));
  };

  const handleToolsPanelAction = async type => {
    if (type === 'crypto trending') {
      const res = await axios.get(
        'https://api.coingecko.com/api/v3/search/trending'
      );
      const coins = res.data.coins.map(c => c.item);
      setToolsPanelOutput(
        'Trending coins:\n' +
          coins.map(c => `${c.name} (${c.symbol})`).join(', ')
      );
    } else if (type === 'news headlines') {
      const res = await axios.get('https://gnews.io/api/v4/top-headlines', {
        params: {
          token: '1c1b8e7e7e2e4e7e8e7e2e4e7e8e7e2e',
          lang: 'en',
          max: 5,
        },
      });
      const articles = res.data.articles;
      setToolsPanelOutput(
        'Top headlines:\n' + articles.map(a => `- ${a.title}`).join('\n')
      );
    } else if (type === 'list my files') {
      const files = JSON.parse(localStorage.getItem('chatbot_files') || '[]');
      setToolsPanelOutput(
        files.length
          ? 'Your files:\n' + files.map(f => `- ${f.name}`).join('\n')
          : 'No files selected.'
      );
    } else if (type === 'recall chat') {
      const history = JSON.parse(
        localStorage.getItem('chatbot_history') || '[]'
      );
      setToolsPanelOutput(
        history.length
          ? 'Recent chats:\n' +
              history
                .slice(-10)
                .map(m => `- ${m.text}`)
                .join('\n')
          : 'No chat history.'
      );
    } else if (type === 'crypto price') {
      setToolsPanelOutput('Try in chatbot: crypto price BTC');
    } else if (type === 'weather') {
      setToolsPanelOutput('Try in chatbot: weather in London');
    }
  };

  return (
    <Router>
      <AppContainer>
        <Sidebar />
        <MainContent>
          <button
            style={{
              position: 'fixed',
              left: 20,
              bottom: 20,
              zIndex: 2001,
              borderRadius: '50%',
              width: 56,
              height: 56,
              fontSize: 28,
              background: 'linear-gradient(45deg, #2193b0 30%, #6dd5ed 90%)',
              color: '#fff',
              border: 'none',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              cursor: 'pointer',
              outline: 'none',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onClick={() => setShowToolsPanel(v => !v)}
            title="Toggle Tools Panel"
          >
            🛠️
          </button>
          {showToolsPanel && (
            <div
              style={{
                position: 'fixed',
                left: 20,
                bottom: 90,
                zIndex: 2001,
                background: '#fff',
                borderRadius: 16,
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                padding: 20,
                minWidth: 300,
                maxWidth: 380,
                animation: 'fadeInUp 0.3s ease-out',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  flexWrap: 'wrap',
                  marginBottom: 15,
                  justifyContent: 'center',
                }}
              >
                <button
                  style={{
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid #ccc',
                    background: '#eee',
                  }}
                  onClick={() => handleToolsPanelAction('crypto price')}
                >
                  💲 Crypto Price
                </button>
                <button
                  style={{
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid #ccc',
                    background: '#eee',
                  }}
                  onClick={() => handleToolsPanelAction('crypto trending')}
                >
                  🔥 Trending
                </button>
                <button
                  style={{
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid #ccc',
                    background: '#eee',
                  }}
                  onClick={() => handleToolsPanelAction('weather')}
                >
                  ☁️ Weather
                </button>
                <button
                  style={{
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid #ccc',
                    background: '#eee',
                  }}
                  onClick={() => handleToolsPanelAction('news headlines')}
                >
                  📰 News
                </button>
                <button
                  style={{
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid #ccc',
                    background: '#eee',
                  }}
                  onClick={() => handleToolsPanelAction('recall chat')}
                >
                  🔎 Recall Chat
                </button>
                <button
                  style={{
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid #ccc',
                    background: '#eee',
                  }}
                  onClick={() => handleToolsPanelAction('list my files')}
                >
                  📁 My Files
                </button>
                <button
                  style={{
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid #ccc',
                    background: '#eee',
                  }}
                  onClick={handleShowMap}
                >
                  🌍 Map
                </button>
                <button
                  style={{
                    marginLeft: 'auto',
                    background: 'none',
                    border: 'none',
                    fontSize: 20,
                    cursor: 'pointer',
                  }}
                  onClick={() => setShowToolsPanel(false)}
                >
                  ✖
                </button>
              </div>
              <pre
                style={{
                  whiteSpace: 'pre-wrap',
                  fontSize: 14,
                  background: '#e9ecef',
                  borderRadius: 8,
                  padding: 12,
                  minHeight: 60,
                  maxHeight: 200,
                  overflowY: 'auto',
                }}
              >
                {toolsPanelOutput}
              </pre>
            </div>
          )}
          {showMap && (
            <div className="global-modal-overlay">
              <div
                className="global-modal-content"
                style={{ padding: 0, overflow: 'hidden' }}
              >
                <button
                  className="global-modal-close"
                  onClick={() => setShowMap(false)}
                >
                  ✖
                </button>
                <div style={{ width: '100%', height: '100%' }}>
                  <Globe
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
                    pointsData={mapWeather
                      .map(w => ({
                        lat: w.coord.lat,
                        lng: w.coord.lon,
                        size: 0.5,
                        color: 'skyblue',
                        label: `${w.name}: ${w.weather[0].main}`,
                      }))
                      .concat(
                        mapExchanges.map(e => ({
                          lat: e.centralized ? e.country_lat : 0,
                          lng: e.centralized ? e.country_lng : 0,
                          size: 0.7,
                          color: 'gold',
                          label: e.name,
                        }))
                      )}
                    pointAltitude="size"
                    pointColor="color"
                    pointLabel="label"
                  />
                </div>
              </div>
            </div>
          )}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            {/* Chats route removed */}
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/projects" element={<ProjectsSection />} />
            <Route path="/finances" element={<FinancesSection />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/files" element={<FilesMediaPage />} />
            <Route path="/trackers" element={<TrackersPage />} />
            <Route path="/crypto-data" element={<CryptoDataView />} />
          </Routes>
        </MainContent>
        <Copilot />
      </AppContainer>
    </Router>
  );
}

export default App;

// Dashboard styles are now in App.css
