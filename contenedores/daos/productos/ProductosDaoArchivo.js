import ContenedorArchivo from "../../ContenedorArchivo.js";

const ruta = "./db/products.json";

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super(ruta);
    }
}

export default ProductosDaoArchivo;