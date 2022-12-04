class ContenedorMemoria {
    constructor(array) {
        this.array = array;
    }

    async list() {
        return this.array;
    }

    async save(product) {
        let timestamp = new Date().getTime();
        let id;
        if (this.array.length === 0) {
            id = 1;
        } else {
            id = this.array.length + 1;
        }
        product.id = id;
        product.timestamp = timestamp;

        this.array.push(product);
        return product;
    }

    async getById(id) {
        if (this.array.length === 0) {
            return "No hay productos cargados";
        }
        let index = this.array.findIndex((el) => el.id == id);
        if (index == -1) {
            return `No hay producto con id ${id}`;
        } else {
            return this.array[index];
        }
    }

    async deleteById(id) {
        let index = this.array.findIndex((el) => el.id == id);
        if (index == -1) {
            return `No hay producto con id ${id}`;
        } else {
            this.array.splice(index, 1);
            return `Producto con id ${id} eliminado`;
        }
    }

    async changeById(id, product) {
        let index = this.array.findIndex((el) => el.id == id);
        if(index == -1) {
            return `No hay producto con id ${id}`;
        }
        product.id = id;
        product.timestamp = this.array[index].timestamp;
        const editedProduct = {...this.array[index], ...product};
        this.array[index] = editedProduct;
        return `Producto editado correctamente: ${editedProduct}`;
    }
}

export default ContenedorMemoria;