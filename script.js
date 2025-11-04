// Esperar a que el DOM esté cargado
        document.addEventListener('DOMContentLoaded', function() {
            
            // --- Funcionalidad 1: Calculadora de Puntos ---
            const inputGasto = document.getElementById('input-gasto');
            const spanResultado = document.getElementById('puntos-resultado');
            
            if (inputGasto && spanResultado) {
                inputGasto.addEventListener('input', function() {
                    // Obtener el valor y asegurar que sea un número
                    const gasto = parseFloat(inputGasto.value) || 0;
                    
                    // Calcular puntos (1 punto por cada $10)
                    const puntos = Math.floor(gasto / 10);
                    
                    // Mostrar el resultado
                    spanResultado.textContent = puntos;
                });
            }

            // --- Funcionalidad 2: Botón "Descargar PDF" (Simulación con window.print) ---
            const btnPdf = document.getElementById('btn-pdf');
            
            if (btnPdf) {
                btnPdf.addEventListener('click', function(e) {
                    e.preventDefault(); // Prevenir cualquier acción por defecto
                    
                    // Usar la función de impresión del navegador
                    // Los estilos @media print se encargarán del formato
                    window.print();
                });
            }
            
        });