import { list, save, getById, deleteById, changeById } from '../utils/contenedor.js';

class ContenedorArchivo {
    constructor(ruta) {
        this.ruta = ruta;
    }
    async list() {
        return await list(this.ruta);
    }

    async save(product) {
        return await save(product, this.ruta);
    }
    async getById(id) {
        return await getById(id, this.ruta);
    }
    async deleteById(id) {
        return await deleteById(id, this.ruta);
    }
    async changeById(id, product) {
        return await changeById(id, product, this.ruta);
    }
}

export default ContenedorArchivo;