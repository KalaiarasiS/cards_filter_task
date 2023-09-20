const categoryFilter = document.getElementById('category-filter');
const cardContainer = document.getElementById('card-container');
const sortSelect = document.getElementById('sort-select'); 

fetch('example.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-category', item.category);
            card.setAttribute('data-created-date', item.createdDate); 

            const image = document.createElement('img');
            image.src = item.image;

            const title = document.createElement('h2');
            title.textContent = item.title;

            const description = document.createElement('p');
            description.textContent = item.description;

            const buy = document.createElement('h4');
            buy.textContent = item.buy;

            card.append(image);
            card.appendChild(title);
            card.appendChild(description);
            card.appendChild(buy);

            cardContainer.appendChild(card);
        });

        // Create filter options dynamically
        const categories = [...new Set(data.map(item => item.category))];
        categories.unshift('all');
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            categoryFilter.appendChild(option);
        });

        categoryFilter.addEventListener('change', filterCards);

        const sortOptions = [
            { value: 'asc', label: 'Oldest First' },
            { value: 'desc', label: 'Newest First' },
        ];
        sortOptions.forEach(option => {
            const sortOption = document.createElement('option');
            sortOption.value = option.value;
            sortOption.textContent = option.label;
            sortSelect.appendChild(sortOption);
        });

        sortSelect.addEventListener('change', sortCards);
        sortCards();
    });

function filterCards() {
    const selectedCategory = categoryFilter.value;
    const cards = cardContainer.querySelectorAll('.card');

    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all' || selectedCategory === cardCategory) {
            card.style.display = 'inline-block';
        } else {
            card.style.display = 'none';
        }
    });
}

function sortCards() {
    const sortingDirection = sortSelect.value;
    const cards = Array.from(cardContainer.querySelectorAll('.card'));

    cards.sort((cardA, cardB) => {
        const dateA = new Date(cardA.getAttribute('data-created-date'));
        const dateB = new Date(cardB.getAttribute('data-created-date'));

        if (sortingDirection === 'asc') {
            return dateA - dateB;
        } else {
            return dateB - dateA;
        }
    });

    cardContainer.innerHTML = '';

    cards.forEach(card => {
        cardContainer.appendChild(card);
    });
}
