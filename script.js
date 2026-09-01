// ==========================================
// SUPABASE
// ==========================================

const SUPABASE_URL =
    "https://dxadtzmoyipxgfwslonz.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_K_0cA_cqTOk3LLbBXB1cJg_CCNcnY7C";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// ==========================================
// ELEMENTOS
// ==========================================

const bingoBoard =
    document.getElementById("bingo-board");

const completedCount =
    document.getElementById("completed-count");

const resetButton =
    document.getElementById("reset-button");

const randomDateButton =
    document.getElementById("random-date-button");


// ==========================================
// MODAL DOS DATES
// ==========================================

const modal =
    document.getElementById("date-modal");

const modalTitle =
    document.getElementById("modal-title");

const closeModal =
    document.getElementById("close-modal");

const photoInput =
    document.getElementById("photo-input");

const photoPreview =
    document.getElementById("photo-preview");

const noteInput =
    document.getElementById("note-input");

const saveDateButton =
    document.getElementById("save-date");

const personButtons =
    document.querySelectorAll(".person-button");


// ==========================================
// MODAL ADICIONAR DATE
// ==========================================

const addDateButton =
    document.getElementById("add-date-button");

const addDateModal =
    document.getElementById("add-date-modal");

const closeAddDateModal =
    document.getElementById("close-add-date-modal");

const newDateTitle =
    document.getElementById("new-date-title");

const saveNewDateButton =
    document.getElementById("save-new-date");


// ==========================================
// EMOJIS DO NOVO DATE
// ==========================================

const emojiOptions =
    document.querySelectorAll(".emoji-option");

let selectedNewDateEmoji = "❤️";


// ==========================================
// VARIÁVEIS
// ==========================================

let dates = [];

let currentBingoIds = [];

let completedBingoIds = [];

let selectedDateId = null;

let selectedPerson = null;

let selectedPhoto = null;


// ==========================================
// BINGO CONCLUÍDO
// ==========================================

let bingoAlreadyWon = false;

let winningCombination = [];


// ==========================================
// CRIAR POPUP DATE SORTEADO
// ==========================================

function createRandomDatePopup() {

    if (
        document.getElementById(
            "random-date-modal"
        )
    ) {
        return;
    }


    const popup =
        document.createElement("div");


    popup.id =
        "random-date-modal";


    popup.className =
        "random-date-modal hidden";


    popup.innerHTML = `

        <div class="random-date-content">

            <button
                id="close-random-date"
                class="random-date-close"
                type="button"
            >
                ×
            </button>


            <div class="random-date-icon">
                🎯
            </div>


            <p class="random-date-label">
                O vosso date sorteado é...
            </p>


            <div
                id="random-date-emoji"
                class="random-date-emoji"
            >
                ❤️
            </div>


            <h2
                id="random-date-title"
                class="random-date-title"
            >
                Date
            </h2>


            <p class="random-date-message">
                Que tal fazerem este date? ❤️
            </p>


            <button
                id="random-date-again"
                class="random-date-confirm"
                type="button"
            >
                🎲 Sortear outro
            </button>


            <button
                id="random-date-finish"
                class="continue-bingo-button"
                type="button"
                style="
                    margin-top: 10px;
                    width: 100%;
                "
            >
                Fechar ❤️
            </button>

        </div>

    `;


    document.body.appendChild(
        popup
    );


    const closeButton =
        document.getElementById(
            "close-random-date"
        );


    const againButton =
        document.getElementById(
            "random-date-again"
        );


    const finishButton =
        document.getElementById(
            "random-date-finish"
        );


    closeButton.addEventListener(
        "click",
        closeRandomDatePopup
    );


    finishButton.addEventListener(
        "click",
        closeRandomDatePopup
    );


    againButton.addEventListener(
        "click",
        randomDateFromBingo
    );


    popup.addEventListener(
        "click",
        event => {

            if (
                event.target === popup
            ) {

                closeRandomDatePopup();

            }

        }
    );

}


// ==========================================
// ABRIR POPUP DATE SORTEADO
// ==========================================

function showRandomDatePopup(
    selectedDate
) {

    createRandomDatePopup();


    const popup =
        document.getElementById(
            "random-date-modal"
        );


    const emoji =
        document.getElementById(
            "random-date-emoji"
        );


    const title =
        document.getElementById(
            "random-date-title"
        );


    if (!popup || !emoji || !title) {

        console.error(
            "Não foi possível criar o popup do date sorteado."
        );

        return;

    }


    emoji.textContent =
        selectedDate.emoji || "❤️";


    title.textContent =
        selectedDate.title;


    popup.classList.remove(
        "hidden"
    );

}


// ==========================================
// FECHAR POPUP DATE SORTEADO
// ==========================================

function closeRandomDatePopup() {

    const popup =
        document.getElementById(
            "random-date-modal"
        );


    if (!popup) return;


    popup.classList.add(
        "hidden"
    );

}


// ==========================================
// SORTEAR UM DOS 16 DATES
// ==========================================

function randomDateFromBingo() {

    console.log(
        "Botão Sortear Date pressionado."
    );


    // ======================================
    // VERIFICAR SE EXISTEM 16 CASAS
    // ======================================

    if (
        !currentBingoIds ||
        currentBingoIds.length !== 16
    ) {

        alert(
            "Ainda não existem 16 dates no Bingo ❤️"
        );

        console.error(
            "currentBingoIds:",
            currentBingoIds
        );

        return;

    }


    // ======================================
    // ENCONTRAR OS DATES DO BINGO
    // ======================================

    const bingoDates =
        currentBingoIds
            .map(
                id => {

                    return dates.find(
                        date =>
                            Number(date.id) ===
                            Number(id)
                    );

                }
            )
            .filter(Boolean);


    // ======================================
    // VERIFICAR SE ENCONTROU OS 16
    // ======================================

    if (
        bingoDates.length !== 16
    ) {

        alert(
            "Não foi possível encontrar os 16 dates do Bingo ❤️"
        );

        console.error(
            "Dates encontrados:",
            bingoDates
        );

        return;

    }


    // ======================================
    // ESCOLHER DATE ALEATÓRIO
    // ======================================

    const randomIndex =
        Math.floor(
            Math.random() *
            bingoDates.length
        );


    const selectedRandomDate =
        bingoDates[randomIndex];


    console.log(
        "Date sorteado:",
        selectedRandomDate
    );


    // ======================================
    // MOSTRAR POPUP
    // ======================================

    showRandomDatePopup(
        selectedRandomDate
    );

}


// ==========================================
// BOTÃO SORTEAR DATE
// ==========================================

if (randomDateButton) {

    console.log(
        "Botão Sortear Date encontrado."
    );


    randomDateButton.addEventListener(
        "click",
        randomDateFromBingo
    );

}

else {

    console.error(
        "ERRO: Não encontrei o botão #random-date-button no HTML."
    );

}


// ==========================================
// CRIAR POPUP DE BINGO
// ==========================================

function createBingoPopup() {

    if (document.getElementById("bingo-win-modal")) {
        return;
    }

    const popup =
        document.createElement("div");

    popup.id =
        "bingo-win-modal";

    popup.className =
        "bingo-win-modal hidden";

    popup.innerHTML = `

        <div class="bingo-win-content">

            <button
                id="close-bingo-win"
                class="bingo-win-close"
                type="button"
            >
                ×
            </button>

            <div class="bingo-win-icon">
                🎉
            </div>

            <h2>
                BINGO! ❤️
            </h2>

            <p class="bingo-win-message">
                Conseguiram completar uma linha!
            </p>

            <div
                id="winning-board"
                class="winning-board"
            ></div>

            <p class="bingo-win-small">
                Este foi o vosso Bingo! 🥰
            </p>

            <div class="bingo-win-buttons">

                <button
                    id="continue-bingo-button"
                    class="continue-bingo-button"
                    type="button"
                >
                    Continuar ❤️
                </button>

                <button
                    id="new-bingo-button"
                    class="new-bingo-button"
                    type="button"
                >
                    🎲 Novo Bingo
                </button>

            </div>

        </div>

    `;

    document.body.appendChild(popup);


    document
        .getElementById("close-bingo-win")
        .addEventListener(
            "click",
            closeBingoPopup
        );


    document
        .getElementById("continue-bingo-button")
        .addEventListener(
            "click",
            closeBingoPopup
        );


    document
        .getElementById("new-bingo-button")
        .addEventListener(
            "click",
            async () => {

                closeBingoPopup();

                await createNewBingo();

            }
        );


    popup.addEventListener(
        "click",
        event => {

            if (
                event.target === popup
            ) {

                closeBingoPopup();

            }

        }
    );

}


// ==========================================
// ABRIR POPUP BINGO
// ==========================================

function showBingoPopup() {

    createBingoPopup();


    const popup =
        document.getElementById(
            "bingo-win-modal"
        );


    const winningBoard =
        document.getElementById(
            "winning-board"
        );


    winningBoard.innerHTML = "";


    currentBingoIds.forEach(
        id => {

            const date =
                dates.find(
                    item =>
                        Number(item.id) ===
                        Number(id)
                );


            if (!date) return;


            const cell =
                document.createElement("div");


            cell.className =
                "winning-cell";


            const isCompleted =
                completedBingoIds.includes(
                    Number(id)
                );


            if (isCompleted) {

                cell.classList.add(
                    "winning-completed"
                );

            }


            const emoji =
                document.createElement("div");


            emoji.className =
                "winning-emoji";


            emoji.textContent =
                date.emoji || "❤️";


            const title =
                document.createElement("div");


            title.className =
                "winning-title";


            title.textContent =
                date.title;


            cell.appendChild(
                emoji
            );


            cell.appendChild(
                title
            );


            winningBoard.appendChild(
                cell
            );

        }
    );


    // ======================================
    // DESTACAR LINHA/COLUNA/DIAGONAL
    // ======================================

    const cells =
        winningBoard.querySelectorAll(
            ".winning-cell"
        );


    winningCombination.forEach(
        id => {

            currentBingoIds.forEach(
                (bingoId, index) => {

                    if (
                        Number(bingoId) ===
                        Number(id)
                    ) {

                        if (cells[index]) {

                            cells[index]
                                .classList
                                .add(
                                    "winning-line"
                                );

                        }

                    }

                }
            );

        }
    );


    popup.classList.remove(
        "hidden"
    );

}


// ==========================================
// FECHAR POPUP BINGO
// ==========================================

function closeBingoPopup() {

    const popup =
        document.getElementById(
            "bingo-win-modal"
        );


    if (!popup) return;


    popup.classList.add(
        "hidden"
    );

}


// ==========================================
// DETETAR BINGO
// ==========================================

function checkForBingo() {

    if (bingoAlreadyWon) {
        return false;
    }


    const completed =
        completedBingoIds.map(Number);


    // ======================================
    // LINHAS
    // ======================================

    for (
        let row = 0;
        row < 4;
        row++
    ) {

        const line = [];

        for (
            let column = 0;
            column < 4;
            column++
        ) {

            const index =
                row * 4 + column;

            const id =
                Number(
                    currentBingoIds[index]
                );

            line.push(id);

        }


        if (
            line.every(
                id =>
                    completed.includes(id)
            )
        ) {

            winningCombination =
                line;

            bingoAlreadyWon =
                true;

            return true;

        }

    }


    // ======================================
    // COLUNAS
    // ======================================

    for (
        let column = 0;
        column < 4;
        column++
    ) {

        const line = [];

        for (
            let row = 0;
            row < 4;
            row++
        ) {

            const index =
                row * 4 + column;

            const id =
                Number(
                    currentBingoIds[index]
                );

            line.push(id);

        }


        if (
            line.every(
                id =>
                    completed.includes(id)
            )
        ) {

            winningCombination =
                line;

            bingoAlreadyWon =
                true;

            return true;

        }

    }


    // ======================================
    // DIAGONAL \
    // ======================================

    const diagonal1 = [

        Number(
            currentBingoIds[0]
        ),

        Number(
            currentBingoIds[5]
        ),

        Number(
            currentBingoIds[10]
        ),

        Number(
            currentBingoIds[15]
        )

    ];


    if (
        diagonal1.every(
            id =>
                completed.includes(id)
        )
    ) {

        winningCombination =
            diagonal1;

        bingoAlreadyWon =
            true;

        return true;

    }


    // ======================================
    // DIAGONAL /
    // ======================================

    const diagonal2 = [

        Number(
            currentBingoIds[3]
        ),

        Number(
            currentBingoIds[6]
        ),

        Number(
            currentBingoIds[9]
        ),

        Number(
            currentBingoIds[12]
        )

    ];


    if (
        diagonal2.every(
            id =>
                completed.includes(id)
        )
    ) {

        winningCombination =
            diagonal2;

        bingoAlreadyWon =
            true;

        return true;

    }


    return false;

}


// ==========================================
// SORTEAR ARRAY
// ==========================================

function shuffleArray(array) {

    const shuffled =
        [...array];


    for (
        let i = shuffled.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            shuffled[i],
            shuffled[j]
        ] =
        [
            shuffled[j],
            shuffled[i]
        ];

    }


    return shuffled;

}


// ==========================================
// CARREGAR DATES
// ==========================================

async function loadDates() {

    const {
        data,
        error
    } =
        await supabaseClient
            .from("Dates")
            .select("*")
            .order(
                "created_at",
                {
                    ascending: true
                }
            );


    if (error) {

        console.error(
            "Erro ao carregar dates:",
            error
        );

        return;

    }


    dates =
        data || [];


    if (dates.length < 16) {

        bingoBoard.innerHTML = `

            <p style="
                grid-column: 1 / -1;
                text-align: center;
                padding: 30px;
            ">

                Precisam de existir pelo menos
                16 dates ❤️

            </p>

        `;

        return;

    }


    const {
        data: bingoData,
        error: bingoError
    } =
        await supabaseClient
            .from("CurrentBingo")
            .select("*")
            .eq(
                "id",
                1
            )
            .maybeSingle();


    if (bingoError) {

        console.error(
            "Erro ao carregar Bingo:",
            bingoError
        );

        return;

    }


    if (
        !bingoData ||
        !bingoData.date_ids ||
        bingoData.date_ids.length !== 16
    ) {

        await createNewBingo();

        return;

    }


    currentBingoIds =
        bingoData.date_ids.map(
            Number
        );


    completedBingoIds =
        (
            bingoData.completed_ids ||
            []
        ).map(
            Number
        );


    bingoAlreadyWon =
        false;

    winningCombination =
        [];


    const validBingo =
        currentBingoIds.every(
            id =>
                dates.some(
                    date =>
                        Number(date.id) ===
                        id
                )
        );


    if (!validBingo) {

        await createNewBingo();

        return;

    }


    createBoard();

    updateBoard();

}


// ==========================================
// CRIAR NOVO BINGO
// ==========================================

async function createNewBingo() {

    if (dates.length < 16) {

        alert(
            "Precisam de ter pelo menos 16 dates disponíveis ❤️"
        );

        return;

    }


    const shuffled =
        shuffleArray(dates);


    const selectedDates =
        shuffled.slice(
            0,
            16
        );


    currentBingoIds =
        selectedDates.map(
            date =>
                Number(date.id)
        );


    completedBingoIds =
        [];


    bingoAlreadyWon =
        false;


    winningCombination =
        [];


    const {
        data: existingBingo
    } =
        await supabaseClient
            .from("CurrentBingo")
            .select("id")
            .eq(
                "id",
                1
            )
            .maybeSingle();


    let error;


    if (existingBingo) {

        const result =
            await supabaseClient
                .from("CurrentBingo")
                .update({

                    date_ids:
                        currentBingoIds,

                    completed_ids:
                        [],

                    updated_at:
                        new Date()
                            .toISOString()

                })
                .eq(
                    "id",
                    1
                );


        error =
            result.error;

    }

    else {

        const result =
            await supabaseClient
                .from("CurrentBingo")
                .insert({

                    id:
                        1,

                    date_ids:
                        currentBingoIds,

                    completed_ids:
                        [],

                    updated_at:
                        new Date()
                            .toISOString()

                });


        error =
            result.error;

    }


    if (error) {

        console.error(
            "Erro ao criar Bingo:",
            error
        );

        alert(
            "Não foi possível criar o novo Bingo."
        );

        return;

    }


    createBoard();

    updateBoard();

}


// ==========================================
// CRIAR TABULEIRO
// ==========================================

function createBoard() {

    bingoBoard.innerHTML = "";


    currentBingoIds.forEach(
        id => {

            const date =
                dates.find(
                    item =>
                        Number(item.id) ===
                        Number(id)
                );


            if (!date) return;


            const cell =
                document.createElement("div");


            cell.classList.add(
                "bingo-cell"
            );


            cell.dataset.id =
                date.id;


            const isCompleted =
                completedBingoIds.includes(
                    Number(date.id)
                );


            if (
                isCompleted &&
                date.photo_url
            ) {

                const image =
                    document.createElement("img");


                image.src =
                    date.photo_url;


                image.alt =
                    date.title;


                image.classList.add(
                    "date-photo"
                );


                cell.appendChild(
                    image
                );


                const heart =
                    document.createElement("span");


                heart.classList.add(
                    "date-completed-heart"
                );


                heart.textContent =
                    "❤️";


                cell.appendChild(
                    heart
                );

            }

            else {

                const emoji =
                    document.createElement("div");


                emoji.classList.add(
                    "date-emoji"
                );


                emoji.textContent =
                    date.emoji ||
                    "❤️";


                const title =
                    document.createElement("div");


                title.classList.add(
                    "date-title"
                );


                title.textContent =
                    date.title;


                cell.appendChild(
                    emoji
                );


                cell.appendChild(
                    title
                );

            }


            cell.addEventListener(
                "click",
                () => {

                    openDateModal(
                        date.id
                    );

                }
            );


            bingoBoard.appendChild(
                cell
            );

        }
    );

}


// ==========================================
// ATUALIZAR TABULEIRO
// ==========================================

function updateBoard() {

    completedCount.textContent =
        completedBingoIds.length;


    document
        .querySelectorAll(
            ".bingo-cell"
        )
        .forEach(
            cell => {

                const id =
                    Number(
                        cell.dataset.id
                    );


                if (
                    completedBingoIds.includes(
                        id
                    )
                ) {

                    cell.classList.add(
                        "completed"
                    );

                }

                else {

                    cell.classList.remove(
                        "completed"
                    );

                }

            }
        );

}


// ==========================================
// ABRIR MODAL DATE
// ==========================================

function openDateModal(id) {

    const date =
        dates.find(
            item =>
                Number(item.id) ===
                Number(id)
        );


    if (!date) return;


    selectedDateId =
        Number(date.id);


    selectedPerson =
        date.completed_by ||
        null;


    selectedPhoto =
        null;


    modalTitle.textContent =
        `${date.emoji || "❤️"} ${date.title}`;


    noteInput.value =
        date.note || "";


    photoInput.value =
        "";


    photoPreview.innerHTML =
        "";


    if (date.photo_url) {

        const image =
            document.createElement("img");


        image.src =
            date.photo_url;


        image.classList.add(
            "preview-image"
        );


        photoPreview.appendChild(
            image
        );

    }


    personButtons.forEach(
        button => {

            button.classList.remove(
                "selected"
            );


            if (
                button.dataset.person ===
                date.completed_by
            ) {

                button.classList.add(
                    "selected"
                );

            }

        }
    );


    modal.classList.remove(
        "hidden"
    );

}


// ==========================================
// FECHAR MODAL DATE
// ==========================================

function closeDateModal() {

    modal.classList.add(
        "hidden"
    );


    selectedDateId =
        null;


    selectedPerson =
        null;


    selectedPhoto =
        null;

}


closeModal.addEventListener(
    "click",
    closeDateModal
);


modal.addEventListener(
    "click",
    event => {

        if (
            event.target === modal
        ) {

            closeDateModal();

        }

    }
);


// ==========================================
// PESSOA
// ==========================================

personButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                selectedPerson =
                    button.dataset.person;


                personButtons.forEach(
                    otherButton => {

                        otherButton.classList.remove(
                            "selected"
                        );

                    }
                );


                button.classList.add(
                    "selected"
                );

            }
        );

    }
);


// ==========================================
// FOTO
// ==========================================

photoInput.addEventListener(
    "change",
    () => {

        const file =
            photoInput.files[0];


        if (!file) {

            selectedPhoto =
                null;

            return;

        }


        selectedPhoto =
            file;


        const image =
            document.createElement("img");


        image.src =
            URL.createObjectURL(
                file
            );


        image.classList.add(
            "preview-image"
        );


        photoPreview.innerHTML =
            "";


        photoPreview.appendChild(
            image
        );

    }
);


// ==========================================
// GUARDAR DATE
// ==========================================

saveDateButton.addEventListener(
    "click",
    saveDate
);


async function saveDate() {

    if (!selectedDateId) return;


    const date =
        dates.find(
            item =>
                Number(item.id) ===
                Number(selectedDateId)
        );


    if (!date) return;


    const alreadyCompleted =
        completedBingoIds.includes(
            Number(selectedDateId)
        );


    if (
        !alreadyCompleted &&
        !selectedPhoto
    ) {

        alert(
            "Para completar o date precisam de adicionar uma fotografia 📸❤️"
        );

        return;

    }


    if (!selectedPerson) {

        alert(
            "Escolham quem participou no date ❤️"
        );

        return;

    }


    saveDateButton.disabled =
        true;


    saveDateButton.textContent =
        "A guardar...";


    try {

        let photoUrl =
            date.photo_url;


        if (selectedPhoto) {

            const extension =
                selectedPhoto.name
                    .split(".")
                    .pop();


            const fileName =
                `${date.id}-${Date.now()}.${extension}`;


            const {
                error: uploadError
            } =
                await supabaseClient
                    .storage
                    .from("date-photos")
                    .upload(
                        fileName,
                        selectedPhoto
                    );


            if (uploadError) {

                throw uploadError;

            }


            const {
                data: publicUrlData
            } =
                supabaseClient
                    .storage
                    .from("date-photos")
                    .getPublicUrl(
                        fileName
                    );


            photoUrl =
                publicUrlData.publicUrl;

        }


        const {
            error: updateError
        } =
            await supabaseClient
                .from("Dates")
                .update({

                    completed:
                        true,

                    completed_by:
                        selectedPerson,

                    completed_at:
                        new Date()
                            .toISOString(),

                    photo_url:
                        photoUrl,

                    note:
                        noteInput.value.trim()

                })
                .eq(
                    "id",
                    selectedDateId
                );


        if (updateError) {

            throw updateError;

        }


        if (
            !completedBingoIds.includes(
                Number(selectedDateId)
            )
        ) {

            completedBingoIds.push(
                Number(selectedDateId)
            );

        }


        const {
            error: bingoError
        } =
            await supabaseClient
                .from("CurrentBingo")
                .update({

                    completed_ids:
                        completedBingoIds,

                    updated_at:
                        new Date()
                            .toISOString()

                })
                .eq(
                    "id",
                    1
                );


        if (bingoError) {

            throw bingoError;

        }


        const localDate =
            dates.find(
                item =>
                    Number(item.id) ===
                    Number(selectedDateId)
            );


        if (localDate) {

            localDate.completed =
                true;

            localDate.completed_by =
                selectedPerson;

            localDate.completed_at =
                new Date()
                    .toISOString();

            localDate.photo_url =
                photoUrl;

            localDate.note =
                noteInput.value.trim();

        }


        createBoard();

        updateBoard();

        closeDateModal();


        const hasBingo =
            checkForBingo();


        if (hasBingo) {

            setTimeout(
                () => {

                    showBingoPopup();

                },
                400
            );

        }

    }


    catch (error) {

        console.error(
            "Erro ao guardar date:",
            error
        );


        alert(
            "Ocorreu um erro ao guardar o date."
        );

    }


    finally {

        saveDateButton.disabled =
            false;

        saveDateButton.textContent =
            "Guardar Date ❤️";

    }

}


// ==========================================
// NOVO BINGO
// ==========================================

resetButton.addEventListener(
    "click",
    async () => {

        const confirmation =
            confirm(
                "Criar um novo Bingo com 16 dates aleatórios? 🎲❤️"
            );


        if (!confirmation) return;


        resetButton.disabled =
            true;


        resetButton.textContent =
            "A sortear...";


        try {

            await createNewBingo();

        }

        finally {

            resetButton.disabled =
                false;

            resetButton.textContent =
                "🎲 Novo Bingo";

        }

    }
);


// ==========================================
// ADICIONAR DATE
// ==========================================

if (addDateButton) {

    addDateButton.addEventListener(
        "click",
        () => {

            newDateTitle.value =
                "";

            selectedNewDateEmoji =
                "❤️";


            emojiOptions.forEach(
                option => {

                    option.classList.remove(
                        "selected"
                    );


                    if (
                        option.textContent.trim() ===
                        "❤️"
                    ) {

                        option.classList.add(
                            "selected"
                        );

                    }

                }
            );


            const selectedEmojiText =
                document.getElementById(
                    "selected-emoji"
                );


            if (selectedEmojiText) {

                selectedEmojiText.textContent =
                    "Emoji escolhido: ❤️";

            }


            addDateModal.classList.remove(
                "hidden"
            );


            newDateTitle.focus();

        }
    );

}


// ==========================================
// ESCOLHER EMOJI
// ==========================================

emojiOptions.forEach(
    option => {

        option.addEventListener(
            "click",
            () => {

                selectedNewDateEmoji =
                    option.textContent.trim();


                emojiOptions.forEach(
                    otherOption => {

                        otherOption.classList.remove(
                            "selected"
                        );

                    }
                );


                option.classList.add(
                    "selected"
                );


                const selectedEmojiText =
                    document.getElementById(
                        "selected-emoji"
                    );


                if (selectedEmojiText) {

                    selectedEmojiText.textContent =
                        `Emoji escolhido: ${selectedNewDateEmoji}`;

                }

            }
        );

    }
);


// ==========================================
// FECHAR ADICIONAR DATE
// ==========================================

if (closeAddDateModal) {

    closeAddDateModal.addEventListener(
        "click",
        () => {

            addDateModal.classList.add(
                "hidden"
            );

        }
    );

}


if (addDateModal) {

    addDateModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                addDateModal
            ) {

                addDateModal.classList.add(
                    "hidden"
                );

            }

        }
    );

}


// ==========================================
// GUARDAR NOVO DATE
// ==========================================

if (saveNewDateButton) {

    saveNewDateButton.addEventListener(
        "click",
        addNewDate
    );

}


async function addNewDate() {

    const title =
        newDateTitle.value.trim();


    const emoji =
        selectedNewDateEmoji ||
        "❤️";


    if (!title) {

        alert(
            "Escrevam primeiro o nome do date ❤️"
        );

        newDateTitle.focus();

        return;

    }


    saveNewDateButton.disabled =
        true;


    saveNewDateButton.textContent =
        "A adicionar...";


    try {

        const {
            data: lastDates,
            error: positionError
        } =
            await supabaseClient
                .from("Dates")
                .select("position")
                .order(
                    "position",
                    {
                        ascending: false
                    }
                )
                .limit(1);


        if (positionError) {

            throw positionError;

        }


        let nextPosition =
            1;


        if (
            lastDates &&
            lastDates.length > 0 &&
            lastDates[0].position !== null
        ) {

            nextPosition =
                Number(
                    lastDates[0].position
                ) + 1;

        }


        const {
            error: insertError
        } =
            await supabaseClient
                .from("Dates")
                .insert({

                    title:
                        title,

                    emoji:
                        emoji,

                    position:
                        nextPosition,

                    completed:
                        false,

                    completed_by:
                        null,

                    completed_at:
                        null,

                    photo_url:
                        null,

                    note:
                        null

                });


        if (insertError) {

            throw insertError;

        }


        addDateModal.classList.add(
            "hidden"
        );


        newDateTitle.value =
            "";


        selectedNewDateEmoji =
            "❤️";


        emojiOptions.forEach(
            option => {

                option.classList.remove(
                    "selected"
                );


                if (
                    option.textContent.trim() ===
                    "❤️"
                ) {

                    option.classList.add(
                        "selected"
                    );

                }

            }
        );


        const selectedEmojiText =
            document.getElementById(
                "selected-emoji"
            );


        if (selectedEmojiText) {

            selectedEmojiText.textContent =
                "Emoji escolhido: ❤️";

        }


        alert(
            "Date adicionado com sucesso! ❤️"
        );


        await loadDates();

    }


    catch (error) {

        console.error(
            "Erro ao adicionar date:",
            error
        );


        alert(
            "Não foi possível adicionar o date."
        );

    }


    finally {

        saveNewDateButton.disabled =
            false;


        saveNewDateButton.textContent =
            "Adicionar Date ❤️";

    }

}


// ==========================================
// REALTIME — DATES
// ==========================================

supabaseClient
    .channel("dates-changes")
    .on(
        "postgres_changes",
        {
            event: "*",
            schema: "public",
            table: "Dates"
        },
        () => {

            loadDates();

        }
    )
    .subscribe();


// ==========================================
// REALTIME — BINGO
// ==========================================

supabaseClient
    .channel("bingo-changes")
    .on(
        "postgres_changes",
        {
            event: "*",
            schema: "public",
            table: "CurrentBingo"
        },
        () => {

            loadDates();

        }
    )
    .subscribe();


// ==========================================
// CRIAR POPUPS
// ==========================================

createBingoPopup();

createRandomDatePopup();


// ==========================================
// INICIAR
// ==========================================

loadDates();