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

            // --- Funcionalidad 3: Toggle Buyer Personas Section ---
            const btnTogglePersonas = document.getElementById('btn-toggle-personas');
            const personasSection = document.getElementById('buyer-personas-section');

            if (btnTogglePersonas && personasSection) {
                btnTogglePersonas.addEventListener('click', function() {
                    const isHidden = personasSection.classList.contains('hidden');
                    
                    if (isHidden) {
                        personasSection.classList.remove('hidden');
                        btnTogglePersonas.textContent = '🔼 Ocultar Buyer Personas';
                        // Scroll suave a la sección
                        setTimeout(function() {
                            personasSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 100);
                    } else {
                        personasSection.classList.add('hidden');
                        btnTogglePersonas.textContent = '👥 Ver Buyer Personas';
                    }
                });
            }

            // --- Funcionalidad 4: Lógica de Modales ---
            const modalOverlays = document.querySelectorAll('.modal-overlay');
            const closeButtons = document.querySelectorAll('.modal-close');
            
            // Función para cerrar todos los modales
            function closeModal() {
                modalOverlays.forEach(modal => {
                    modal.classList.remove('active');
                    modal.setAttribute('aria-hidden', 'true');
                });
            }
            
            // Función para abrir un modal específico
            function openModal(modalId) {
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.classList.add('active');
                    modal.setAttribute('aria-hidden', 'false');
                    // Enfocar el botón de cerrar para accesibilidad
                    const closeBtn = modal.querySelector('.modal-close');
                    if (closeBtn) {
                        closeBtn.focus();
                    }
                }
            }
            
            // Listeners botones de cerrar
            closeButtons.forEach(button => {
                button.addEventListener('click', closeModal);
            });
            
            // Listener para cerrar al hacer clic en el overlay
            modalOverlays.forEach(modal => {
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        closeModal();
                    }
                });
            });
            
            // Listener para cerrar con tecla Escape
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeModal();
                }
            });

            // --- Funcionalidad 5: Lógica Modal de Estrategia (Dinámico) ---
            const strategyButtons = document.querySelectorAll('.btn-strategy');
            const modalStrategyTitle = document.getElementById('modal-strategy-title');
            const modalStrategyContent = document.getElementById('modal-strategy-content');

            if (modalStrategyTitle && modalStrategyContent) {
                const modalStrategyTitleSpan = modalStrategyTitle.querySelector('span');
                
                strategyButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        const persona = this.getAttribute('data-persona');
                        const strategyAttr = this.getAttribute('data-strategy');
                        
                        if (!strategyAttr) {
                            console.warn('No strategy data found for persona:', persona);
                            return;
                        }
                        
                        const strategyData = strategyAttr.split(';');
                        
                        // Poblar el modal
                        if (modalStrategyTitleSpan) {
                            modalStrategyTitleSpan.textContent = persona;
                        }
                        modalStrategyContent.innerHTML = '';
                        
                        strategyData.forEach(item => {
                            if (item.trim()) {
                                const li = document.createElement('li');
                                li.innerHTML = `<span class="icon">🎯</span> ${item.trim()}`;
                                modalStrategyContent.appendChild(li);
                            }
                        });
                        
                        // Abrir el modal
                        openModal('modal-strategy');
                    });
                });
            }
            
        });