export default class IndexedStore {

    #name;
    #db;

    constructor(name) {
        this.#name = name;
        this.#db = null;
    }

    open() {
        return new Promise(
            (resolve, reject) => {

                let request = indexedDB.open(this.#name, 1);

                request.onerror = (event) => {
                    reject(event.target.error);
                };

                request.onsuccess = () => {
                    this.#db = request.result;
                    resolve();
                }

                request.onupgradeneeded = (event) => {
                    let db = event.target.result;
                    db.createObjectStore(this.#name);
                }
            });
    }

    put(key, value) {
        return new Promise(
            (resolve, reject) => {

                let tx = this.#db.transaction([this.#name], "readwrite");
                let store = tx.objectStore(this.#name);
                let request = store.put(value, key);

                request.onsuccess = () => {
                    resolve();
                }

                request.onerror = (event) => {
                    reject(event.target.error);
                }
            });
    }

    get(key) {
        return new Promise(
            (resolve, reject) => {

                let tx = this.#db.transaction([this.#name], "readwrite");
                let store = tx.objectStore(this.#name);
                let request = store.get(key);

                request.onsuccess = () => {
                    resolve(request.result);
                }

                request.onerror = (event) => {
                    reject(event.target.error);
                }
            });
    }
}