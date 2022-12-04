const form = document.getElementById("editProduct");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    editProduct(data);
});

const editProduct = (data) => {
    const url = `http://localhost:8080/api/productos/${productId}`;
    fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })

    .then(res => res.json())
    .then(data => {
        alert("Producto editado");
        window.location.href = "/productos";
        console.log(data);
    })
    .catch(err => console.log(err));
}