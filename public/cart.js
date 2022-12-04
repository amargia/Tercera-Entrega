const cartId = document.getElementById("cartId").innerHTML;
const cartContainer = document.getElementById("cartContainer");


const renderCart = async () => {
    const url = `http://localhost:8080/api/carrito/${cartId}/productos`;
    const data = await fetch(url);
    const productos = await data.json();

    cartContainer.innerHTML = "";

    if(productos.length == 0) {
        cartContainer.innerHTML = "<h3>No hay productos en el carrito</h3>";
    } else {
        productos.forEach(producto => {
            cartContainer.innerHTML += `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${producto.name}</h5>
                        <p class="card-text">${producto.description}</p>
                        <p class="card-text">${producto.price}</p>
                        <p class="card-text"><img scr="${producto.thumbnail}"></p>
                        <button class="btn btn-danger" onclick="deleteProduct(${producto.id})">Eliminar</button>`;
        });
    }
}

renderCart();

// Finalizar compra
const form = document.getElementById("finalizarCompra");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    // const formData = new FormData(form);
    // const data = {};
    // formData.forEach((value, key) => {
    //     data[key] = value;
    // });
    alert("hola")
    finalizarCompra();
})


const finalizarCompra = () => {
    console.log("finalizar compra");
    const url = '/carrito/finalizar-compra';
    fetch(url, {
        method: "PUT",
        // body: JSON.stringify(data),
        // headers: {
        //     "Content-Type": "application/json"
        // }
    })
    .then(res => res.json())
    .then(data => {
        alert("Compra realizada");
        window.location.href = "/";
        console.log(data);
    })
    .catch(err => console.log(err));
}

// Eliminar producto
const deleteProduct = (cartId, productId) => {
    const url = `http://localhost:8080/api/carrito/${cartId}/productos/${productId}`;
    fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        alert("Producto eliminado");
        renderCart();
        console.log(data);
    })
    .catch(err => console.log(err));
}