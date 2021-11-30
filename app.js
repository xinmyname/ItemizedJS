import LootDatabase from "./Infrastructure/LootDatabase.js";
import Inventory from "./Models/Inventory.js";
import Item from "./Models/Item.js";

if ("serviceWorker" in navigator) {

    const scope = (location.hostname == "localhost")
    ? "."
    : "/ItemizedJS"

    navigator.serviceWorker.register(`${scope}/sw.js`)
        .then((reg) => {
            // registration worked
            console.info('Registration succeeded. Scope is ' + reg.scope);
        }).catch((error) => {
            // registration failed
            console.error('Registration failed with ' + error);
        });
}

const db = new LootDatabase(await fetch('data/loot.json').then(_ => _.json()));
let inventory = new Inventory();

inventory.add(new Item([1,1]));

for (let i = 0; i < 10; i++)
    inventory.add(db.makeItem());

for (let [item,quantity] of inventory.slots()) {
    console.debug(db.describe(item, quantity));
}

console.info("Initialization succeeded.");

const runButton = document.querySelector("#run");

runButton.addEventListener("click", () => {

    const itemsField = document.querySelector("#items");
    const itemsText = itemsField.value;
    let numItems = (itemsText.length) ? Number.parseInt(itemsText) : 10;

    for (; numItems > 0; numItems -= 1)
        inventory.add(db.makeItem());

    const main = document.querySelector("main");

    main.innerHTML = "";

    let ul = document.createElement("ul");

    for (let [item,quantity] of inventory.slots()) {
        let li = document.createElement("li");
        li.innerText = db.describe(item, quantity);
        ul.appendChild(li);
    }
            
    main.appendChild(ul);
});
