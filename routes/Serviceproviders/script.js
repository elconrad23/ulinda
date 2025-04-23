document.addEventListener('DOMContentLoaded', () => {
    const providers = [
        { name: 'Joshtes online market', category: 'Marketplace', location: 'Mbarara', description: 'Expert in buying and selling online.' },
        { name: 'Jane Smith Electrical', category: 'electrical', location: 'Jinja', description: 'Certified electrician for all needs.' },
        { name: 'CleanSweep', category: 'cleaning', location: 'Mukono', description: 'Top-rated cleaning service.' },
        { name: 'Kampala Bookstore', category: 'Retail', location: 'Kampala', description: 'A wide range of books and educational materials.' },
        { name: 'Entebbe Tech Hub', category: 'Technology', location: 'Entebbe', description: 'Innovative solutions and tech support for businesses.' },
        { name: 'Jinja Crafts', category: 'Artisan', location: 'Jinja', description: 'Handmade crafts and local art pieces.' },
        { name: 'Gulu Green Grocers', category: 'Food', location: 'Gulu', description: 'Fresh produce and organic groceries.' },
        { name: 'Mbale Fitness Center', category: 'Health & Wellness', location: 'Mbale', description: 'State-of-the-art gym and fitness programs.' },
        { name: 'Fort Portal Travel Agency', category: 'Travel & Tourism', location: 'Fort Portal', description: 'Customized travel packages and tours.' },
        { name: 'Masaka Auto Repairs', category: 'Automotive', location: 'Masaka', description: 'Reliable car repair and maintenance services.' },
        { name: 'Kabaale Construction Co.', category: 'Construction', location: 'Kabaale', description: 'Expert building and renovation services.' },
        { name: 'Lira Electronics', category: 'Retail', location: 'Lira', description: 'Latest electronics and gadgets at competitive prices.' },
        { name: 'Kasese Fashion House', category: 'Fashion', location: 'Kasese', description: 'Trendy clothing and accessories for all ages.' }
    ];

    const providerList = document.getElementById('providerList');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const locationFilter = document.getElementById('locationFilter');

    function renderProviders(filteredProviders) {
        providerList.innerHTML = '';
        filteredProviders.forEach(provider => {
            const providerItem = document.createElement('div');
            providerItem.classList.add('provider-item');
            providerItem.innerHTML = `
                <h2>${provider.name}</h2>
                <p><strong>Category:</strong> ${provider.category}</p>
                <p><strong>Location:</strong> ${provider.location}</p>
                <p>${provider.description}</p>
            `;
            providerList.appendChild(providerItem);
        });
    }

    function filterProviders() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const selectedLocation = locationFilter.value;

        const filteredProviders = providers.filter(provider => {
            return (
                (provider.name.toLowerCase().includes(searchTerm) || provider.description.toLowerCase().includes(searchTerm)) &&
                (selectedCategory === '' || provider.category === selectedCategory) &&
                (selectedLocation === '' || provider.location === selectedLocation)
            );
        });

        renderProviders(filteredProviders);
    }

    searchInput.addEventListener('input', filterProviders);
    categoryFilter.addEventListener('change', filterProviders);
    locationFilter.addEventListener('change', filterProviders);

    // Initial render
    renderProviders(providers);
});


// NAVIGATING TO PREVIOUS PAGE
document.addEventListener('DOMContentLoaded', () => {
    const prevPageButton = document.querySelector('.prev-page');
    prevPageButton.addEventListener('click', () => {
        window.history.back();
    });
});