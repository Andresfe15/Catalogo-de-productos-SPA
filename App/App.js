// App.js

import CategoryFilter from './components/CategoryFilter.js';
import PriceInput from './components/PriceInput.js';
import ProductItem from './components/ProductItem.js';

document.addEventListener('DOMContentLoaded', function () {
    const categories = ['Tecnología', 'Moda', 'Hogar y Jardín', 'Deportes y Fitness']; // Ejemplo de categorías
    let data = []; // Variable para almacenar los datos de los productos

    // Objeto que mapea nombres de categoría a sus correspondientes category_id
    const categoryIds = {
        'Tecnología': 'MLA1051',
        'Moda': 'MLA1430',
        'Hogar y Jardín': 'MLA3524',
        'Deportes y Fitness': 'MLA1276'
    };

    const onSelectCategory = (selectedCategory) => {
        console.log('Categoría seleccionada:', selectedCategory);
        // Filtrar productos por categoría seleccionada
        const filteredProducts = data.filter(product => {
            if (selectedCategory === '' || product.category_id === categoryIds[selectedCategory]) {
                return true;
            }
            return false;
        });
        // Renderizar los productos filtrados
        renderProducts(filteredProducts);
    };

    const onPriceChange = (maxPrice) => {
        console.log('Precio máximo seleccionado:', maxPrice);
        // Filtrar productos por precio máximo
        const filteredProducts = data.filter(product => {
            return product.price <= maxPrice;
        });
        // Renderizar los productos filtrados
        renderProducts(filteredProducts);
    };

    const categoryFilter = new CategoryFilter(categories, onSelectCategory);
    const priceInput = new PriceInput(onPriceChange);
    const productsContainer = document.getElementById('products-container');

    // Función para obtener los productos desde la API de Mercado Libre
    async function fetchProducts() {
        try {
            const response = await fetch('https://api.mercadolibre.com/sites/MLA/search?q=productos');
            if (!response.ok) {
                throw new Error('Error al obtener los productos');
            }
            const responseData = await response.json();
            data = responseData.results; // Almacenar los datos de los resultados en la variable data
            renderProducts(data);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    // Función para renderizar productos
    function renderProducts(products) {
        productsContainer.innerHTML = '';
        if (products.length === 0) {
            const noProductsMessage = document.createElement('p');
            noProductsMessage.textContent = 'No hay productos disponibles.';
            noProductsMessage.classList.add('no-products');
            productsContainer.appendChild(noProductsMessage);
        } else {
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product');
                productElement.innerHTML = `
                    <h3>${product.title}</h3>
                    <p>Precio: ${product.price}</p>
                    <img src="${product.thumbnail}" alt="${product.title}">
                `;
                productsContainer.appendChild(productElement);
            });
        }
    }

    // Llamar a la función para obtener los productos desde la API
    fetchProducts();
});










