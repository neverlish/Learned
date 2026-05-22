const chatContainer = document.getElementById('chat-container');
const urlInput = document.getElementById('url-input');
const queryInput = document.getElementById('query-input');

async function processURL() {
    const url = urlInput.value;
    if (!url) return;

    addMessage('System', 'Processing URL...', 'system');

    try {
        const response = await fetch('/process_url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to process URL');
        }
        
        const data = await response.json();
        addMessage('System', data.message, 'system');
    } catch (error) {
        console.error('Error in processURL:', error);
        addMessage('Error', `Failed to process URL: ${error.message}`, 'error');
    }
}

async function askQuestion() {
    const query = queryInput.value;
    if (!query) return;

    addMessage('You', query, 'user');
    queryInput.value = '';

    try {
        const response = await fetch('/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
            credentials: 'same-origin'
        });
        
        const data = await response.json();
        addMessage('Bot', data.answer, 'bot');
    } catch (error) {
        console.error('Error in askQuestion:', error);
        addMessage('Error', `Failed to get answer: ${error.message}`, 'error');
    }
}

function addMessage(sender, message, className) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${className}`;
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Enter 키로 질문 제출
queryInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        askQuestion();
    }
});
