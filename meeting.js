// ==========================================
// NEXT MEETING ❤️
// ==========================================

console.log("meeting.js carregado");


// ==========================================
// ELEMENTOS
// ==========================================

const meetingDateElement =
    document.getElementById("meeting-date");

const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");

const changeMeetingButton =
    document.getElementById("change-meeting-button");

const meetingModal =
    document.getElementById("meeting-modal");

const closeMeetingModal =
    document.getElementById("close-meeting-modal");

const meetingDateInput =
    document.getElementById("meeting-date-input");

const saveMeetingButton =
    document.getElementById("save-meeting");


// ==========================================
// VERIFICAR ELEMENTOS
// ==========================================

console.log("Elementos do Next Meeting:", {
    meetingDateElement,
    daysElement,
    hoursElement,
    minutesElement,
    secondsElement,
    changeMeetingButton,
    meetingModal,
    closeMeetingModal,
    meetingDateInput,
    saveMeetingButton
});


// ==========================================
// VARIÁVEL
// ==========================================

let nextMeetingDate = null;


// ==========================================
// CARREGAR DATA DO SUPABASE
// ==========================================

async function loadNextMeeting() {

    console.log("A carregar NextMeeting...");

    const { data, error } =
        await supabaseClient
            .from("NextMeeting")
            .select("*")
            .eq("id", 1)
            .single();


    if (error) {

        console.error(
            "Erro ao carregar NextMeeting:",
            error
        );

        meetingDateElement.textContent =
            "Erro ao carregar a data ❤️";

        return;
    }


    console.log(
        "Dados recebidos:",
        data
    );


    if (!data || !data.meeting_date) {

        meetingDateElement.textContent =
            "Escolham o próximo encontro ❤️";

        return;
    }


    nextMeetingDate =
        new Date(data.meeting_date);


    console.log(
        "Data convertida:",
        nextMeetingDate
    );


    updateMeetingDisplay();

}


// ==========================================
// MOSTRAR DATA
// ==========================================

function updateMeetingDisplay() {

    if (!nextMeetingDate) return;


    meetingDateElement.textContent =
        nextMeetingDate.toLocaleString(
            "pt-PT",
            {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    updateCountdown();

}


// ==========================================
// CONTADOR
// ==========================================

function updateCountdown() {

    if (!nextMeetingDate) return;


    const now =
        new Date();


    const difference =
        nextMeetingDate.getTime()
        - now.getTime();


    console.log(
        "Segundos restantes:",
        Math.floor(difference / 1000)
    );


    if (difference <= 0) {

        daysElement.textContent = "0";

        hoursElement.textContent = "00";

        minutesElement.textContent = "00";

        secondsElement.textContent = "00";

        meetingDateElement.textContent =
            "Estamos juntos novamente! ❤️";

        return;
    }


    const totalSeconds =
        Math.floor(
            difference / 1000
        );


    const days =
        Math.floor(
            totalSeconds / 86400
        );


    const hours =
        Math.floor(
            (totalSeconds % 86400) / 3600
        );


    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );


    const seconds =
        totalSeconds % 60;


    daysElement.textContent =
        days;

    hoursElement.textContent =
        String(hours)
            .padStart(2, "0");

    minutesElement.textContent =
        String(minutes)
            .padStart(2, "0");

    secondsElement.textContent =
        String(seconds)
            .padStart(2, "0");

}


// ==========================================
// ATUALIZAR A CADA SEGUNDO
// ==========================================

setInterval(
    updateCountdown,
    1000
);


// ==========================================
// ABRIR JANELA
// ==========================================

if (changeMeetingButton) {

    changeMeetingButton.addEventListener(
        "click",
        () => {

            console.log(
                "Botão Alterar data clicado"
            );


            if (nextMeetingDate) {

                const year =
                    nextMeetingDate
                        .getFullYear();

                const month =
                    String(
                        nextMeetingDate
                            .getMonth() + 1
                    )
                    .padStart(2, "0");

                const day =
                    String(
                        nextMeetingDate
                            .getDate()
                    )
                    .padStart(2, "0");

                const hours =
                    String(
                        nextMeetingDate
                            .getHours()
                    )
                    .padStart(2, "0");

                const minutes =
                    String(
                        nextMeetingDate
                            .getMinutes()
                    )
                    .padStart(2, "0");


                meetingDateInput.value =
                    `${year}-${month}-${day}T${hours}:${minutes}`;

            }


            meetingModal.classList.remove(
                "hidden"
            );

        }
    );

}


// ==========================================
// FECHAR JANELA
// ==========================================

if (closeMeetingModal) {

    closeMeetingModal.addEventListener(
        "click",
        () => {

            meetingModal.classList.add(
                "hidden"
            );

        }
    );

}


// ==========================================
// FECHAR AO CLICAR FORA
// ==========================================

if (meetingModal) {

    meetingModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                meetingModal
            ) {

                meetingModal.classList.add(
                    "hidden"
                );

            }

        }
    );

}


// ==========================================
// GUARDAR NOVA DATA
// ==========================================

if (saveMeetingButton) {

    saveMeetingButton.addEventListener(
        "click",
        async () => {

            console.log(
                "Guardar data clicado"
            );


            if (!meetingDateInput.value) {

                alert(
                    "Escolhe primeiro uma data ❤️"
                );

                return;

            }


            const newDate =
                new Date(
                    meetingDateInput.value
                );


            if (
                isNaN(
                    newDate.getTime()
                )
            ) {

                alert(
                    "A data escolhida não é válida."
                );

                return;

            }


            saveMeetingButton.disabled =
                true;

            saveMeetingButton.textContent =
                "A guardar...";


            try {

                const {
                    error
                } =
                    await supabaseClient
                        .from("NextMeeting")
                        .update({

                            meeting_date:
                                newDate.toISOString(),

                            updated_at:
                                new Date()
                                    .toISOString()

                        })
                        .eq(
                            "id",
                            1
                        );


                if (error) {

                    throw error;

                }


                console.log(
                    "Data guardada com sucesso!"
                );


                nextMeetingDate =
                    newDate;


                updateMeetingDisplay();


                meetingModal.classList.add(
                    "hidden"
                );


            }

            catch (error) {

                console.error(
                    "Erro ao guardar data:",
                    error
                );


                alert(
                    "Não foi possível guardar a data."
                );

            }


            finally {

                saveMeetingButton.disabled =
                    false;

                saveMeetingButton.textContent =
                    "Guardar data ❤️";

            }

        }
    );

}


// ==========================================
// REALTIME
// ==========================================

supabaseClient

    .channel("next-meeting-changes")

    .on(
        "postgres_changes",
        {
            event: "*",
            schema: "public",
            table: "NextMeeting"
        },
        () => {

            console.log(
                "NextMeeting foi alterado!"
            );

            loadNextMeeting();

        }
    )

    .subscribe();


// ==========================================
// INICIAR
// ==========================================

loadNextMeeting();
