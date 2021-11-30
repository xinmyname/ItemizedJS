export default class Inventory {

    #slots;

    constructor() {
        this.#slots = {}
    }

    add(item, quantity = 1) {
        if (this.#slots.hasOwnProperty(item)) { 
            const currentQuantity = this.#slots[item];
            this.#slots[item] = currentQuantity + quantity;
        } else {
            this.#slots[item] = quantity;
        }
    }

    * slots() {
        for (const item in this.#slots) {
            yield [item, this.#slots[item]];
        }
    }
}