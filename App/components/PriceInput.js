export default class PriceInput {
    constructor(onChange) {
        this.onChange = onChange;
        this.render();
    }

    render() {
        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = 'Precio máximo';
        input.addEventListener('input', (event) => {
            const maxPrice = parseFloat(event.target.value);
            this.onChange(maxPrice);
        });

        document.body.appendChild(input);
    }
}
