const dates = [
    "Ver um filme juntos 🎬",
    "Cozinhar a mesma receita 🍝",
    "Jogar um jogo online 🎮",
    "Ter um jantar à luz das velas 🕯️",
    "Fazer uma chamada até adormecer 🌙",

    "Escolher uma música um para o outro 🎵",
    "Fazer uma playlist juntos 🎧",
    "Tomar café juntos por videochamada ☕",
    "Ter um date de madrugada 🌃",
    "Fazer karaoke juntos 🎤",

    "Planear uma viagem juntos ✈️",
    "Fazer um quiz sobre nós 🧠",
    "Ver o pôr do sol em chamada 🌅",
    "Ler juntos durante 30 minutos 📚",
    "Jogar cartas online 🃏",

    "Pedir a mesma comida 🍕",
    "Recriar o nosso primeiro date ❤️",
    "Fazer um date surpresa 🎁",
    "Ver fotos antigas juntos 📸",
    "Fazer um desenho um do outro 🎨",

    "Contar 3 coisas que adoramos um no outro 💕",
    "Ter um date sem telemóveis 📵",
    "Ver uma série juntos 📺",
    "Fazer um date completamente aleatório 🎲",
    "FREE DATE ❤️"
];


const bingoBoard = document.getElementById("bingo-board");
const completedCount = document.getElementById("completed-count");
const resetButton = document.getElementById("reset-button");

let completedDates = [];


/* CRIAR O BINGO */

function createBoard() {

    bingoBoard.innerHTML = "";

    dates.forEach((date, index) => {

        const cell = document.createElement("div");

        cell.classList.add("bingo-cell");

        cell.textContent = date;

        cell.dataset.index = index;


        cell.addEventListener("click", () => {

            toggleDate(index);

        });


        bingoBoard.appendChild(cell);

    });

}


/* MARCAR / DESMARCAR DATE */

function toggleDate(index) {

    if (completedDates.includes(index)) {

        completedDates = completedDates.filter(
            dateIndex => dateIndex !== index
        );

    } else {

        completedDates.push(index);

    }

    updateBoard();

}


/* ATUALIZAR O VISUAL */

function updateBoard() {

    const cells = document.querySelectorAll(".bingo-cell");

    cells.forEach((cell, index) => {

        if (completedDates.includes(index)) {

            cell.classList.add("completed");

        } else {

            cell.classList.remove("completed");

        }

    });


    completedCount.textContent = completedDates.length;

}


/* RESET */

resetButton.addEventListener("click", () => {

    const confirmation = confirm(
        "Têm a certeza que querem apagar todos os dates?"
    );

    if (confirmation) {

        completedDates = [];

        updateBoard();

    }

});


/* INICIAR */

createBoard();
