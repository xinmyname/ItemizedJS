const main = document.querySelector("main");

let ul = document.createElement("ul");

for (let i = 0; i < 10; i++) {
    let li = document.createElement("li");
    li.innerText = `Item ${i+1}`;
    ul.appendChild(li);
}

main.appendChild(ul);
