export default function ProductItem(product) {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = `
        <h3>${product.name}</h3>
        <p>Precio: ${product.price}</p>
        <p>Categoría: ${product.category}</p>
    `;
    return productElement;
}
