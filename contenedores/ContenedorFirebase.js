import admin from 'firebase-admin';
import serviceAccount from '../db/backend-segunda-entrega-3bd2b-firebase-adminsdk-xxnh8-20613a2d51.js';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://url-example.firebaseio.com"
});

console.log("Connected to DB");

class FirebaseContainer {
  constructor(collectionName) {
    this.query = db.collection(collectionName)
  }

  async list() {
    try {
      const array = []
      const snapshot = await this.query.get();
      snapshot.forEach((doc) => {
        array.push({id: doc.id, ...doc.data()})
      })
      return array;
    } catch (error) {
      console.log('No existen objetos en DB' + error);
    }
  }

  async add(object) {
    try {
      const saved = await this.query.add(object);
      console.log('Elemento guardado ', saved.id);
      return {...object, id: saved.id}
    } catch (error) {
      console.log('Elemento no se pudo guardar' + error);
    }
  }

  async getById(id) {
    try {
      const doc = await this.query.doc(id).get();
      if (!doc.exists) {
        throw new Error('Objeto no existe');
      } else {
        const data = doc.data();
        return {...data, id};
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      const deleted = await this.query.doc(id).delete();
      console.log('Objeto eliminado correctamente');
      return deleted;
    } catch (error) {
      console.log('Objeto no se pudo eliminar correctamente', error);
    }
  }

  async changeById(id, object) {
    try {
      const change = await this.query.doc(id).set(object);
      console.log('Objeto actualizado correctamente');
      return change;
    } catch (error) {
      console.log('Objeto no se pudo actualizar');
    }
  }
}

export default FirebaseContainer;