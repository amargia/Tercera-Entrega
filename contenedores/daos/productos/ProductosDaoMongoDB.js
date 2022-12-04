import ContenedorMongoDB from "../../ContenedorMongoDB.js";
import { Product } from "../../models/Product.js";

class ProductosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(Product);
    }
}

export default ProductosDaoMongoDB;