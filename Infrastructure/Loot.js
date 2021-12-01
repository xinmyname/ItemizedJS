import Item from "../Models/Item.js";
import ItemProperty from "../Models/ItemProperty.js";
import Table from "./Table.js";
import { Pluralizer } from "./Pluralize.js";

export default class Loot {

    #propertyTables;
    #commonItemTable;
    #uniqueItemTable;

    constructor(loot) {

        this.#propertyTables = {};
    
        for (const tableName in loot.properties) {
            this.#propertyTables[tableName] = new Table(tableName, loot.properties[tableName]);
        }

        this.#commonItemTable = new Table("common", loot.common);
        this.#uniqueItemTable = new Table("unique", loot.unique);
    }

    makeItem() {

        let contents = [];

        if (Math.floor(Math.random() * 1000) == 999) {
            contents.push(1);
            contents.push(this.#uniqueItemTable.randomId());
        } else {

            contents.push(0);

            const id = this.#commonItemTable.randomId();
            contents.push(id);

            for (const itemProperty of this.#getPropertiesFromItemTemplate(this.#commonItemTable.valueFor(id))) {
                const table = this.#propertyTables[itemProperty.name];
                contents.push(table.randomId(itemProperty.optional));
            }
        }

        return new Item(contents);
    }

    describe(item, quantity) {
        
        const rawDescription = this.#rawDescription(item);
        const description = this.#pluralize(rawDescription, quantity).trim();

        let quantityText = "";
        
        if (quantity == 1) {
            quantityText = "aeiouAEIOU".includes(description[0])
                ? "An"
                : "A";
        } else {
            switch (quantity) {
                case 2: quantityText = "Two"; break;
                case 3: quantityText = "Three"; break;
                case 4: quantityText = "Four"; break;
                case 5: quantityText = "Five"; break;
                case 6: quantityText = "Six"; break;
                case 7: quantityText = "Seven"; break;
                case 8: quantityText = "Eight"; break;
                case 9: quantityText = "Nine"; break;
                default: quantityText = `${quantity}`;
            }
        }

        return `${quantityText} ${description}`;
    }

    #pluralize(text, quantity) {

        if (quantity == 1)
            return text.replaceAll("^", "");

        let pluralText = "";

        for (let i = 0; i < text.length; i++) {

            const ch = text[i];

            if (ch == '^') {
                const start = i+1;
                let end = start;

                while (end < text.length && text[end] != ' ')
                    end += 1;

                i = end-1;

                let item = text.substring(start,end);

                pluralText += Pluralizer.pluralOf(item);

            } else
                pluralText += ch;
        }

        return pluralText;
    }

    #rawDescription(item) {

        let indices = String(item).split(':').map(_ => Number.parseInt(_));

        if (indices.shift() == 1)
            return this.#uniqueItemTable.valueFor(indices.shift());

        let description = "";
        const itemTemplate = this.#commonItemTable.valueFor(indices.shift());
  
        for (let i = 0; i < itemTemplate.length; i += 1) {
            let start = i;
            let ch = itemTemplate[i];

            if (ch == '{') {

                const end = itemTemplate.indexOf('}', start);
                const itemProperty = new ItemProperty(itemTemplate.substring(start+1,end));

                i = end;

                const index = indices.shift();

                if (index == 0)
                    continue;

                const table = this.#propertyTables[itemProperty.name];

                description += table.valueFor(index);

            } else {
                description += ch;
            }
        }

        return description.replaceAll("  ", " ");
    }

    * #getPropertiesFromItemTemplate(itemTemplate) {

        for (let start = itemTemplate.indexOf('{'); start != -1; start = itemTemplate.indexOf('{', start+1)) {
            const end = itemTemplate.indexOf('}', start);
            yield new ItemProperty(itemTemplate.substring(start+1,end));
        }
    }
}