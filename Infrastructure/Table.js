export default class Table {

    #values;

    constructor(name, values) {

        this.Name = name;
        this.#values = {};

        let nextId = 1;

        for (const value of values) {

            if (!value)
                continue;

            this.#values[nextId] = value;

            nextId += 1;
        }
    }

    valueFor(id) {
        return this.#values[id];
    }

    randomId(optional = false) {
        const keys = Object.keys(this.#values);
        const index = optional
            ? Math.floor(Math.random() * keys.length+1)
            : Math.floor(Math.random() * keys.length);
        
        if (index==keys.length)
            return 0;

        const value = keys[index];

        return Number.parseInt(keys[index]);
    }
}