if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
            // registration worked
            console.info('Registration succeeded. Scope is ' + reg.scope);
        }).catch((error) => {
            // registration failed
            console.error('Registration failed with ' + error);
        });
}

const main = document.querySelector("main");

let ul = document.createElement("ul");

for (let i = 0; i < 10; i++) {
    let li = document.createElement("li");
    li.innerText = `Item ${i+1}`;
    ul.appendChild(li);
}

main.appendChild(ul);
