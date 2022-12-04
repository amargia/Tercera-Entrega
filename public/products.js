const getProducts = async () => {
    const url = '/lista-productos'
    const data = await fetch(url)
    const products = await data.json()
    return products;
}

//Add product
const form = document.getElementById('addProduct');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    })

    addProduct(data);
    form.reset();
});

const addProduct = (product) => {
    const url = '/productos';
    const body = JSON.stringify(product);

    fetch(url, {
        method: 'POST',
        body,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(async data => {
        const products = await getProducts();
        alert("Producto agregado");
        renderProducts(products);
        console.log(data);
    })
    .catch(err => console.log(err));
}

//Delete product
const deleteProduct = (_id) => {
    const url = `/productos/${_id}`;
    fetch(url, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(async data => {
        const products = await getProducts();
        renderProducts(products);
        console.log(data);
    })
    .catch(err => console.log(err));
}

//render products
const renderProducts = (products) => {
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        productsContainer.innerHTML += `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">
                        ${product.name}
                    </h5>
                    <p class="card-text">
                        ${product.description}
                    </p>
                    <p class="card-text">
                        ${product.price}
                    </p>
                    <a href="/productos/editProduct/${product._id}" class="btn btn-primary">Editar Producto</a>
                    <button class="btn btn-danger" onclick="deleteProduct('${product._id}')">
                        Eliminar
                    </button>
                </div>
            </div>
        `;
    });
}

const url = '/lista-productos';
fetch(url)
    .then(res => res.json())
    .then(data => {
        renderProducts(data);
    })
    .catch(err => console.log(err));


// Search tab
const search = document.getElementById('search');
search.addEventListener('keyup', (e) => {
    const url = '/lista-productos';
    //fetch url
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const products = data.filter(product => {
                return product.name.toLowerCase().includes(e.target.value.toLowerCase());
            });
            renderProducts(products);
        })
        .catch(err => console.log(err));
});
