import LootDatabase from "./Infrastructure/LootDatabase.js";
import Inventory from "./Models/Inventory.js";

if ("serviceWorker" in navigator) {
    const scope = (location.hostname == "localhost")
    ? "."
    : "/ItemizedJS"

    await navigator.serviceWorker.register(`${scope}/sw.js`, { type: 'module'})
}

const db = new LootDatabase(await fetch('data/loot.json').then(_ => _.json()));
let inventory = new Inventory();

console.info("Initialization succeeded.");

const runButton = document.querySelector("#run");

runButton.addEventListener("click", () => {

    const itemsField = document.querySelector("#items");
    const itemsText = itemsField.value;
    let numItems = (itemsText.length) ? Number.parseInt(itemsText) : 10;

    const counts = [1,1,1,1,1,1,1,2,2,3];

    for (; numItems > 0; numItems -= 1)
        inventory.add(db.makeItem(), counts[Math.floor(Math.random() * counts.length)]);

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
