// --- REFERENCIAS A ELEMENTOS DEL DOM ---
const revisarBtn = document.getElementById('revisarBtn');
const reiniciarBtn = document.getElementById('reiniciarBtn');
const feedbackArea = document.getElementById('feedback-area');
const inputs = document.querySelectorAll('.transaction-input');
const totalCargoCell = document.getElementById('total_cargo');
const totalAbonoCell = document.getElementById('total_abono');
const saldoFinalCell = document.getElementById('saldo_final');
const toggleBtn = document.getElementById('toggleInstructionsBtn');
const instructionsContent = document.getElementById('instructionsContent');

// --- DEFINICIÓN DE LAS RESPUESTAS CORRECTAS ---
const answerKey = {
    // El id del HTML es "cargo_bancos", la clave aquí debe ser "bancos"
    bancos: { cargo: 850000, abono: 0 },
    prov: { cargo: 0, abono: 17700 },
    maq: { cargo: 120000, abono: 0 },
    zaza: { cargo: 25000, abono: 0 },
    via: { cargo: 0, abono: 70000 }
};

// --- FUNCIONES AUXILIARES ---

// Lee un valor de un input (incluso si tiene comas) y lo convierte a número
const getNumericValue = (id) => {
    const value = document.getElementById(id).value;
    // Elimina todo lo que no sea un dígito (comas, símbolos de peso, etc.)
    const cleanValue = value.replace(/\D/g, '');
    return parseInt(cleanValue, 10) || 0;
};

// Da formato de moneda MXN para mostrar los resultados
const formatCurrency = (num) => new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
}).format(num);

// --- LÓGICA PRINCIPAL ---

function checkAnswers() {
    let score = 0;
    const totalPossibleScore = Object.keys(answerKey).length;
    inputs.forEach(input => input.classList.remove('input-correct', 'input-incorrect'));

    // Itera sobre las respuestas para verificar cada una
    for (const key in answerKey) {
        // Obtenemos los elementos de input correspondientes
        const cargoInputEl = document.getElementById(`cargo_${key}`);
        const abonoInputEl = document.getElementById(`abono_${key}`);

        // Obtenemos los valores numéricos ingresados por el usuario
        const userCargo = getNumericValue(`cargo_${key}`);
        const userAbono = getNumericValue(`abono_${key}`);

        // Comparamos con las respuestas correctas
        const isCargoCorrect = userCargo === answerKey[key].cargo;
        const isAbonoCorrect = userAbono === answerKey[key].abono;

        // Aplicamos clases CSS para dar feedback visual
        cargoInputEl.classList.add(isCargoCorrect ? 'input-correct' : 'input-incorrect');
        abonoInputEl.classList.add(isAbonoCorrect ? 'input-correct' : 'input-incorrect');

        // Incrementamos el puntaje si ambas celdas de la fila son correctas
        if (isCargoCorrect && isAbonoCorrect) {
            score++;
        }
    }

    // Calcular totales y saldo final
    let totalCargo = 0;
    let totalAbono = 0;
    for (const key in answerKey) {
        totalCargo += getNumericValue(`cargo_${key}`);
        totalAbono += getNumericValue(`abono_${key}`);
    }
    const saldoFinal = totalCargo - totalAbono;

    // Mostrar resultados formateados
    totalCargoCell.innerText = formatCurrency(totalCargo);
    totalAbonoCell.innerText = formatCurrency(totalAbono);
    saldoFinalCell.innerText = formatCurrency(saldoFinal);

    // Activar estilos para las celdas de resultado
    totalCargoCell.classList.add('active');
    totalAbonoCell.classList.add('active');
    saldoFinalCell.classList.add('active');

    // Mostrar mensaje de feedback final
    feedbackArea.className = ''; // Limpiar clases previas
    if (score === totalPossibleScore) {
        feedbackArea.textContent = `¡Excelente! Obtuviste ${score} de ${totalPossibleScore} aciertos. ✨`;
        feedbackArea.classList.add('feedback-correct');
    } else {
        feedbackArea.textContent = `Sigue intentando. Obtuviste ${score} de ${totalPossibleScore} aciertos. Revisa las celdas en rojo.`;
        feedbackArea.classList.add('feedback-incorrect');
    }
}

function resetExercise() {
    inputs.forEach(input => {
        input.value = '';
        input.classList.remove('input-correct', 'input-incorrect');
    });
    totalCargoCell.innerText = '';
    totalAbonoCell.innerText = '';
    saldoFinalCell.innerText = '';
    totalCargoCell.classList.remove('active');
    totalAbonoCell.classList.remove('active');
    saldoFinalCell.classList.remove('active');
    feedbackArea.textContent = '';
    feedbackArea.className = '';
}

// --- ASIGNACIÓN DE EVENTOS ---

// Eventos para los botones principales
revisarBtn.addEventListener('click', checkAnswers);
reiniciarBtn.addEventListener('click', resetExercise);

// Lógica mejorada para los campos de entrada de números
inputs.forEach(input => {
    // 1. Cuando el usuario vuelve a hacer clic en un campo, quita el formato para facilitar la edición.
    input.addEventListener('focus', () => {
        if (input.value) {
            input.value = input.value.replace(/\D/g, '');
        }
    });

    // 2. Cuando el usuario sale del campo (pierde el foco), aplica el formato de miles.
    input.addEventListener('blur', () => {
        if (input.value) {
            const num = parseInt(input.value.replace(/\D/g, ''), 10);
            input.value = new Intl.NumberFormat('es-MX').format(num);
        }
    });
});


// Evento para el botón de instrucciones
toggleBtn.addEventListener('click', () => {
    const isHidden = instructionsContent.classList.toggle('hidden');
    if (isHidden) {
        toggleBtn.innerHTML = '<i class="fa-solid fa-chevron-down"></i> Mostrar Instrucciones';
    } else {
        toggleBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i> Ocultar Instrucciones';
    }
});

// Carga inicial
document.addEventListener('DOMContentLoaded', resetExercise);
