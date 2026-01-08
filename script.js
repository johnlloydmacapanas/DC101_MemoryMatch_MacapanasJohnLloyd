const board = document.getElementById("board");
const restart = document.getElementById("restart");
const win = document.getElementById("win");

let first = null;
let second = null;
let lock = false;
let matches = 0;

const symbols = ["🐶","🐺","🐼","🐨","🐱","🦊","🐥","🐰"];

function setupGame() {
    win.style.display = "none";
    board.innerHTML = "";
    matches = 0;
    first = null;
    second = null;

    const deck = [...symbols, ...symbols].sort(() => Math.random() - 0.5);

    deck.forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.symbol = symbol;
        card.textContent = "";
        card.addEventListener("click", () => handleFlip(card));
        board.appendChild(card);
    });
}

function handleFlip(card) {
    if (lock || card === first || card.classList.contains("revealed")) return;

    card.textContent = card.dataset.symbol;
    card.classList.add("revealed");

    if (!first) {
        first = card;
        return;
    }

    second = card;
    lock = true;

    if (first.dataset.symbol === second.dataset.symbol) {
        first = null;
        second = null;
        lock = false;
        matches++;

        if (matches === symbols.length) {
            win.style.display = "block";
        }
    } else {
        setTimeout(() => {
            first.textContent = "";
            second.textContent = "";
            first.classList.remove("revealed");
            second.classList.remove("revealed");
            first = null;
            second = null;
            lock = false;
        }, 800);
    }
}

restart.addEventListener("click", setupGame);

// Start the first game
setupGame();
