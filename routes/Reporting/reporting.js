document.addEventListener('DOMContentLoaded', () => {
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const confirmation = document.getElementById('confirmation');

    const categorySelect = document.getElementById('category');
    const detailsTextArea = document.getElementById('details');
    const reviewCategory = document.getElementById('reviewCategory');
    const reviewDetails = document.getElementById('reviewDetails');

    const next1 = document.getElementById('next1');
    const prev2 = document.getElementById('prev2');
    const next2 = document.getElementById('next2');
    const prev3 = document.getElementById('prev3');
    const submit = document.getElementById('submit');

    next1.addEventListener('click', () => {
        if (categorySelect.value) {
            step1.style.display = 'none';
            step2.style.display = 'block';
        } else {
            alert('Please select a category.');
        }
    });

    prev2.addEventListener('click', () => {
        step2.style.display = 'none';
        step1.style.display = 'block';
    });

    next2.addEventListener('click', () => {
        if (detailsTextArea.value.trim()) {
            reviewCategory.textContent = categorySelect.value;
            reviewDetails.textContent = detailsTextArea.value;
            step2.style.display = 'none';
            step3.style.display = 'block';
        } else {
            alert('Please provide details.');
        }
    });

    prev3.addEventListener('click', () => {
        step3.style.display = 'none';
        step2.style.display = 'block';
    });

    submit.addEventListener('click', () => {
        // In a real application, you'd send this data to a server here.
        step3.style.display = 'none';
        confirmation.style.display = 'block';
    });
});



// NAVIGATING TO PREVIOUS PAGE
document.addEventListener('DOMContentLoaded', () => {
    const prevPageButton = document.querySelector('.prev-page');
    prevPageButton.addEventListener('click', () => {
        window.history.back();
    });
});