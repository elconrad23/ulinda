document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const resultsDiv = document.getElementById('results');

    analyzeBtn.addEventListener('click', () => {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(event) {
                const text = event.target.result;
                const analysisResults = analyzeContract(text);
                displayResults(analysisResults);
            };

            if (file.type === 'application/pdf') {
                // For simplicity, assume that the contract is a text file for this example.
                alert('PDF files are not yet supported, contact admin at E-Shield');
                return;
            }

            reader.readAsText(file);
        } else {
            alert('Please upload a contract file.');
        }
    });

    function analyzeContract(contractText) {
        // Placeholder for analysis logic
        return {
            summary: 'This is a summary of the contract.',
            recommendations: 'Clarify the implications of termination, including the handling of outstanding obligations, intellectual property rights, and confidentiality agreements. This ensures that both parties understand their responsibilities post-termination.'
        };
    }

    function displayResults(results) {
        resultsDiv.innerHTML = `
            <h2>Analysis Results</h2>
            <p><strong>Summary:</strong> ${results.summary}</p>
            <p><strong>Recommendations:</strong> ${results.recommendations}</p>
        `;
    }
});


// NAVIGATING TO PREVIOUS PAGE
document.addEventListener('DOMContentLoaded', () => {
    const prevPageButton = document.querySelector('.prev-page');
    prevPageButton.addEventListener('click', () => {
        window.history.back();
    });
});