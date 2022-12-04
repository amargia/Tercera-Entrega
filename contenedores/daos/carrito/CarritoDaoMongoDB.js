import ContenedorMongoDB from "../../ContenedorMongoDB.js";
import { Cart } from "../../models/Cart.js";

class CarritoDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super(Cart);
  }

  async addProduct(idCart, product) {
    const cart = await Cart.findById(idCart);
    cart.products.push(product);
    await cart.save();
    return cart;
  }
  
  async save(userId) {
    let object = { userId, products: []}
    const data = await super.save(object)
    return data;
  }

  async deleteProduct(idCart, idProduct) {
    const cart = await Cart.findById(idCart);
    const indexProduct = cart.products.findIndex((product) => product._id === idProduct);
    cart.products.splice(indexProduct, 1);
    await cart.save();
    return cart;
  }

  async deleteAllProducts(idCart) {
    const cart = await Cart.findById(idCart);
    cart.products = [];
    await cart.save();
    return cart;
  }
}

export default CarritoDaoMongoDB;