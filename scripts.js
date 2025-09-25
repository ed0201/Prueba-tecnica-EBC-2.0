const revisarBtn = document.getElementById('revisarBtn');
        const reiniciarBtn = document.getElementById('reiniciarBtn');
        const feedbackArea = document.getElementById('feedback-area');
        const inputs = document.querySelectorAll('.transaction-input');
        const initialBalanceEl = document.getElementById('initial-balance');

        const totalCargoCell = document.getElementById('total_cargo');
        const totalAbonoCell = document.getElementById('total_abono');
        const saldoFinalCell = document.getElementById('saldo_final');


        // DEF RESPUESTAS CORRECTAS
        const answerKey = {
            bancos: { cargo: 850000, abono: 0 },
            prov: { cargo: 0, abono: 17700 },
            maq:  { cargo: 120000, abono: 0 },
            zaza: { cargo: 25000, abono: 0 },
            via:  { cargo: 0, abono: 70000 }
        };
        const totalPossibleScore = Object.keys(answerKey).length;

        // FUNCIONES AUXILIARES
        const getValue = id => parseFloat(document.getElementById(id).value) || 0;
        const formatCurrency = num => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(num);

        
        function checkAnswers() {
            let score = 0;

            // LIMPIAR VALIDACIONES ANTERIORES
            inputs.forEach(input => input.classList.remove('input-correct', 'input-incorrect'));
            totalCargoCell.classList.remove('active');
            totalAbonoCell.classList.remove('active');
            saldoFinalCell.classList.remove('active');
            
            for (const key in answerKey) {
                const cargoInputEl = document.getElementById(`cargo_${key}`);
                const abonoInputEl = document.getElementById(`abono_${key}`);
                const userCargo = getValue(`cargo_${key}`);
                const userAbono = getValue(`abono_${key}`);

                const isCargoCorrect = userCargo === answerKey[key].cargo;
                const isAbonoCorrect = userAbono === answerKey[key].abono;

                cargoInputEl.classList.add(isCargoCorrect ? 'input-correct' : 'input-incorrect');
                abonoInputEl.classList.add(isAbonoCorrect ? 'input-correct' : 'input-incorrect');

                if (isCargoCorrect && isAbonoCorrect) {
                    score++;
                }
            }

            const totalCargo = getValue('cargo_bancos') + getValue('cargo_prov') + getValue('cargo_maq') + getValue('cargo_zaza') + getValue('cargo_via');
            const totalAbono = getValue('abono_prov') + getValue('abono_maq') + getValue('abono_zaza') + getValue('abono_via');
            const saldoFinal = totalCargo - totalAbono;

            totalCargoCell.innerText = formatCurrency(totalCargo);
            totalAbonoCell.innerText = formatCurrency(totalAbono);
            saldoFinalCell.innerText = formatCurrency(saldoFinal);

            totalCargoCell.classList.add('active');
            totalAbonoCell.classList.add('active');
            saldoFinalCell.classList.add('active');
            
            feedbackArea.className = '';
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

        // EVENTS
        revisarBtn.addEventListener('click', checkAnswers);
        reiniciarBtn.addEventListener('click', resetExercise);

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('input-correct', 'input-incorrect');
            });
        });

        // CLEAN POR REFRESH 
        document.addEventListener('DOMContentLoaded', resetExercise);

        const toggleBtn = document.getElementById('toggleInstructionsBtn');
        const instructionsContent = document.getElementById('instructionsContent');
                toggleBtn.addEventListener('click', () => {
                    instructionsContent.classList.toggle('hidden');
                    if (instructionsContent.classList.contains('hidden')) {
                        toggleBtn.innerHTML = '<i class="fa-solid fa-chevron-down"></i> Mostrar Instrucciones';
                    } else {
                        toggleBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i> Ocultar Instrucciones';
                    }
                });

