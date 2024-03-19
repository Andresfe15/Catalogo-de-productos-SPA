export default class CategoryFilter {
    constructor(categories, onSelect) {
        this.categories = categories || []; // Aseguramos que categories sea un array
        this.onSelect = onSelect;
        this.render();
    }

    render() {
        const select = document.createElement('select');
        select.addEventListener('change', (event) => {
            const selectedCategory = event.target.value;
            this.onSelect(selectedCategory);
        });

        const defaultOption = document.createElement('option');
        defaultOption.textContent = 'Todas las categorías';
        defaultOption.value = '';
        select.appendChild(defaultOption);

        this.categories.forEach(category => {
            const option = document.createElement('option');
            option.textContent = category;
            option.value = category;
            select.appendChild(option);
        });

        document.body.appendChild(select);
    }
}

