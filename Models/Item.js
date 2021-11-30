export default class Item {

    #contents;

    constructor(contents) {

        if (Array.isArray(contents)) {
            this.#contents = [...contents];
        } else {
            this.#contents = contents.split(":").map(_ => Number.parseInt(_));
        }
    }

    isUnique() {
        return this.#contents[0] != 0;
    }

    toString() {
        return this.#contents.join(":");
    }
    
}