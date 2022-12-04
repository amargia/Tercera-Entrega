import * as fs from 'fs';

const list = async (ruta) => {
    try {
        const data = await fs.readFileSync(ruta, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (error) {
        console.log(`No se pudo leer el archivo. Error: ${error}`);
    }
}

const lastID = (arr) => {  
    let id = 0;
    if (arr.length > 0) {
      for (const el of arr ) {
        if (el.id > id) {
          id = el.id
        }
      }
    }
    return id
}

const save = async (product, ruta) => {
    try {
        let timestamp = new Date().getTime();
        const array = await list(ruta);
        const id = lastID(array);
        product.id = id + 1;
        product.timestamp = timestamp;
        array.push(product);
        fs.writeFileSync(ruta, JSON.stringify(array, null, 2));
        return (product);
    } catch (error) {
        console.log(`No se pudo guardar el archivo. Error: ${error}`);
    }
}

const getById = async (id, ruta) => {
    try {
        const array = await list(ruta);
        if (array.length === 0) {
            return ("No hay productos cargados");
        } else {
            return array.find((el) => el.id == id);
        }
    } catch (error) {
        console.log(`No se pudo leer el archivo. Error: ${error}`);
    }
}

const deleteById = async (id, ruta) => {
    try {
        const array = await list(ruta);
        const index = array.findIndex((el) => el.id == id);
        if (index == -1) {
            return (`No hay producto con id ${id}`);
        } else {
            array.filter((el) => el.id != id);
            fs.writeFileSync(ruta, JSON.stringify(array, null, 2));
            return (`Producto con id ${id} eliminado`);
        }
    } catch (error) {
        console.log(`No se pudo leer el archivo. Error: ${error}`);
    }
}

const changeById = async (id, product, ruta) => {
    try {
        const array = await list(ruta);
        const index = array.findIndex((el) => el.id == id);
        if (index == -1) {
            return (`No hay producto con id ${id}`);
        } else {
            product.id = id;
            product.timestamp = array[index].timestamp;
            const editedProduct = {...array[index], ...product};
            array[index] = editedProduct;
            fs.writeFileSync(ruta, JSON.stringify(array, null, 2));
            return (`Producto cambiado ${product}`);
        }
    } catch (error) {
        console.log(`No se pudo leer el archivo. Error: ${error}`);
    }
}

export { list, save, getById, deleteById, changeById };