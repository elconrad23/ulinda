document.addEventListener('DOMContentLoaded', () => {
    const faqButtons = document.querySelectorAll('.faq-question');

    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.nextElementSibling;

            // Toggle the display of the answer
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
            } else {
                // Hide all other answers
                document.querySelectorAll('.faq-answer').forEach(el => el.style.display = 'none');
                answer.style.display = 'block';
            }
        });
    });
});
