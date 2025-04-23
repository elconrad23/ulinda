document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chatBox');
    const userInput = document.getElementById('userInput');
    const sendMessageButton = document.getElementById('sendMessage');

    sendMessageButton.addEventListener('click', () => {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            appendMessage('User', userMessage);
            userInput.value = '';

            // Simulate a bot response
            const botResponse = getBotResponse(userMessage);
            setTimeout(() => {
                appendMessage('Bot', botResponse);
            }, 500);
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

    function getBotResponse(userMessage) {
        // Placeholder for actual bot logic
        const responses = {
            'hello': 'Hello! How can I assist you today?',
            'what is a contract?': 'A contract is a legally binding agreement between two or more parties.',
            'help': 'I can help you with general legal information. Please ask a specific question.'
        };

        const response = responses[userMessage.toLowerCase()] || 'I am not sure how to respond to that. Can you please rephrase your question?';
        return response;
    }
});


// NAVIGATING TO PREVIOUS PAGE
document.addEventListener('DOMContentLoaded', () => {
    const prevPageButton = document.querySelector('.prev-page');
    prevPageButton.addEventListener('click', () => {
        window.history.back();
    });
});