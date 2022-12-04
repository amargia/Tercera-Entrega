const renderCounter = () => {
    const counter = document.getElementById("counter");
    const cartId = document.getElementById("cartId").innerHTML;
    const url = `/carrito/${cartId}/productos`;

    fetch(url)
        .then((res) => res.json())
        .then((res) => {
            counter.innerHTML = `<p>${res.length}</p>`;
            cartContainer.appendChild(counter);
        })
        .catch((err) => console.log(err));
};
    
renderCounter();

// Add products to cart
const addProductToCart = async (cartId, productId) => {
    const url = `/api/carrito/${cartId}/productos/${productId}`;
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        })
        .then((res) => res.json())
        .then((data) => {
            alert("Producto agregado al carrito");
            renderCounter();
            console.log(data);
        })
        .catch((err) => console.log(err));
};

// Render products
const renderProducts = (products) => {
    const productsContainer = document.getElementById("productsContainer");
    const cartId = document.getElementById("cartId");
    const idCart = cartId.textContent
    productsContainer.innerHTML = "";
    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "productCard";
        productCard.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button id="${product._id}" name="${idCart}" class="addBtn btn btn-primary">Agregar al carrito</button>
        `;
        productsContainer.appendChild(productCard);
    });
    const addBtn = document.querySelectorAll(".addBtn");
    addBtn.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const productId = e.target.id;
            const cartId = document.getElementById("cartId").innerHTML;
            addProductToCart(cartId, productId);
        });
    });
};



const url = "/lista-productos";
fetch(url)
    .then((response) => response.json())
    .then((data) => {
        renderProducts(data);
    }
    )
    .catch((err) => console.log(err));

// Search filter
const searchFilter =document.getElementById("searchFilter");
searchFilter.addEventListener("keyup", (e) => {
    const url = "/lista-productos";
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const searchValue = e.target.value.toLowerCase();
            const filteredProducts = data.filter((product) => {
                return product.nombre.toLowerCase().includes(searchValue);
            });
            renderProducts(filteredProducts);
        }
        )
        .catch((err) => console.log(err));
});