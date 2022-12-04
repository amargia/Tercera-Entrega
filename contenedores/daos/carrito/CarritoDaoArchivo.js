import ContenedorArchivo from "../../ContenedorArchivo.js";

const ruta = "./db/cart.json";

class CarritoDaoArchivo extends ContenedorArchivo {
    constructor() {
        super(ruta);
    }
    async save() {
        let object = {products: []};
        let timestamp = new Date().getTime();
        let id;

        const array = await super.list();
        if (array.length === 0) {
            id = 1;
        } else {
            id = array.length + 1;
        }
        object.id = id;
        object.timestamp = timestamp;

        super.save(object);
    }

    async addProduct(idCart, product) {
        try {
            const array = await super.list();
            const index = array.findIndex((el) => el.id == idCart);
            if (array.length === 0) {
                return ("No hay carritos cargados");
            } else if (index == -1) {
                return (`No hay carrito con id ${idCart}`);
            } else {
                array[index].products.push(product);
                await super.changeById(idCart, array[index]);
                return (`Producto agregado al carrito con id ${idCart}`);
            }
        } catch (error) {
            throw new Error(`No se pudo leer el archivo. Error: ${error}`);
        }
    }
}

export default CarritoDaoArchivo;