document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('theme-light');
        body.classList.toggle('theme-dark');
        
        // Save theme preference
        const theme = body.classList.contains('theme-light') ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.classList.add(`theme-${savedTheme}`);
    
    // Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !sidebarToggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(async (e) => {
            const query = e.target.value.trim();
            if (query.length > 2) {
                try {
                    const response = await fetch('/api/search', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ query })
                    });
                    
                    if (response.ok) {
                        const data = await response.json();
                        // Handle search results
                        console.log('Search results:', data);
                    }
                } catch (error) {
                    console.error('Search error:', error);
                }
            }
        }, 300));
    }
    
    // Chat functionality
    const chatForm = document.getElementById('chatForm');
    const chatMessages = document.getElementById('chatMessages');
    
    if (chatForm && chatMessages) {
        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const messageInput = chatForm.querySelector('input[name="message"]');
            const message = messageInput.value.trim();
            
            if (message) {
                try {
                    // Add user message
                    appendMessage('user', message);
                    messageInput.value = '';
                    
                    const response = await fetch('/api/chat', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ message })
                    });
                    
                    if (response.ok) {
                        const data = await response.json();
                        // Add AI response
                        appendMessage('ai', data.response);
                    }
                } catch (error) {
                    console.error('Chat error:', error);
                    appendMessage('error', 'Sorry, something went wrong. Please try again.');
                }
            }
        });
    }
    
    // Data analysis functionality
    const analyzeForm = document.getElementById('analyzeForm');
    if (analyzeForm) {
        analyzeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const contentInput = analyzeForm.querySelector('textarea[name="content"]');
            const content = contentInput.value.trim();
            
            if (content) {
                try {
                    const response = await fetch('/api/analyze', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ content })
                    });
                    
                    if (response.ok) {
                        const data = await response.json();
                        // Display analysis results
                        displayAnalysis(data.analysis);
                    }
                } catch (error) {
                    console.error('Analysis error:', error);
                }
            }
        });
    }
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function appendMessage(type, content) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `message-${type}`, 'animate-fade-in');
    
    const iconSpan = document.createElement('span');
    iconSpan.classList.add('mdi');
    iconSpan.classList.add(type === 'user' ? 'mdi-account' : 'mdi-robot');
    
    const contentP = document.createElement('p');
    contentP.textContent = content;
    
    messageDiv.appendChild(iconSpan);
    messageDiv.appendChild(contentP);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function displayAnalysis(analysis) {
    const resultsDiv = document.getElementById('analysisResults');
    if (resultsDiv) {
        resultsDiv.innerHTML = '';
        
        const card = document.createElement('div');
        card.classList.add('card', 'animate-fade-in');
        
        const content = document.createElement('div');
        content.classList.add('card-content');
        content.innerHTML = marked.parse(analysis); // Using marked.js for markdown parsing
        
        card.appendChild(content);
        resultsDiv.appendChild(card);
    }
} 