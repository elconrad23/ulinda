document.addEventListener('DOMContentLoaded', () => {
    const articlesList = document.getElementById('articles-list');

    const articles = [
        {
            title: 'Consumer Protection in Uganda',
            category: 'consumer-rights',
            date: 'September 21, 2024',
            content: 'Introduction and Overview of the Consumer Protection Act.',
            imageUrl: '../../images/providers-verification.jpg',
            link: '/routes/Blogposts/Consumerprotection/consumerprotection.html'
        },
        {
            title: 'COVID-19 and Consumer Protection in Uganda',
            category: 'safe-shopping',
            date: 'September 20, 2024',
            content: "COVID-19 and the Evolution of Consumer Protection in Uganda's Online Marketplace.",
            imageUrl: '../../images/hero-image.png',
            link: '/routes/Blogposts/CovidEffect/Consumer-COVID-19-effects.html'
        },
        {
            title: "Building Trust in Uganda's Digital Marketplace",
            category: 'legal-advice',
            date: 'September 18, 2024',
            content: 'Building Trust in the Digital Marketplace: A Call to Action for Online Service Providers in Uganda.',
            imageUrl: '../../images/providers-verification.jpg',
            link: '/routes/Blogposts/ProvidersPerspective/Service-Providers-Perspective.html'
        }
        // Add more articles as needed
    ];

    function renderArticles(category) {
        articlesList.innerHTML = '';
        const filteredArticles = category ? articles.filter(article => article.category === category) : articles;

        filteredArticles.forEach(article => {
            const articleDiv = document.createElement('div');
            articleDiv.classList.add('article');
            articleDiv.innerHTML = `
                <img src="${article.imageUrl}" alt="${article.title} image" style="width: 100px; height: auto;">
                <h3>${article.title}</h3>
                <p><em>${article.date}</em></p>
                <p>${article.content}</p>
                <a href="${article.link}">Read More</a> 
            `;
            articlesList.appendChild(articleDiv);
        });
    }

    document.querySelectorAll('.categories a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const category = event.target.getAttribute('data-category');
            renderArticles(category);
        });
    });

    // Initial load
    renderArticles();

    // NAVIGATING TO PREVIOUS PAGE
    const prevPageButton = document.querySelector('.prev-page');
    if (prevPageButton) {
        prevPageButton.addEventListener('click', () => {
            window.history.back();
        });
    }
});
