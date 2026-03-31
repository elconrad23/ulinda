document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chatBox');
    const userInput = document.getElementById('userInput');
    const sendMessageButton = document.getElementById('sendMessage');

    sendMessageButton.addEventListener('click', async () => {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            appendMessage('User', userMessage);
            userInput.value = '';

            const botResponse = await getBotResponse(userMessage);
            appendMessage('Bot', botResponse);
        }
    });

    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessageButton.click();
        }
    });

    function appendMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    async function getBotResponse(userMessage) {
        const apiUrl = 'http://localhost:4000/api/grok';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: userMessage })
            });

            if (!response.ok) {
                console.error('Grok proxy error', response.status, response.statusText);
                return 'Sorry, I could not reach the legal assistant right now.';
            }

            const data = await response.json();
            return data.answer || 'Sorry, I could not generate an answer right now.';
        } catch (error) {
            console.error('Grok request failed', error);
            return 'Sorry, the legal assistant is unavailable right now.';
        }
    }
});


// NAVIGATING TO PREVIOUS PAGE
document.addEventListener('DOMContentLoaded', () => {
    const prevPageButton = document.querySelector('.prev-page');
    prevPageButton.addEventListener('click', () => {
        window.history.back();
    });
});
