import FirebaseContainer from '../../ContenedorFirebase.js';

class CarritoDaoFirebase extends FirebaseContainer {
    constructor () {
        super("carrito")
    }

    async addCart() {
        let object = {products: []}
        let timestamp = new Date().getTime();
        object.timestamp = timestamp;
        super.addCart(object)
    }

    async addProduct(idCart, product) {
        try {
            const array = super.list();
            if (array.length === 0) {
                console.log("No hay carrito creado");
            }
            let indexCart = array.findIndex(el => el.id == id.idCart)
            if (indexCart == -1) {
                return ({error: 'carrito no encontrado'})
            }

            array[indexCart].products.push(product)
            await super.changeById(idCart, array[indexCart])
            return 'Producto agregado al carrito';
        } catch (error) {
            console.log('Producto no se pudo agregar al carrito', error);
        }
    }
}

export default CarritoDaoFirebase;