document.addEventListener('DOMContentLoaded', () => {
    // Inicializar el reloj principal
    const mainClock = new SegmentDisplay('mainClock');
    
    // Temporizadores
    const blueTimerControls = document.querySelectorAll('.blue-controls button');
    const redTimerControls = document.querySelectorAll('.red-controls button');

    const blueTimer = new Timer('blueTimer', blueTimerControls, true);
    const redTimer = new Timer('redTimer', redTimerControls, false);

    // Control global de tiempo
    let separatorVisible = true;
    
    function syncWithSystemClock() {
        const now = new Date();
        // Calcular el tiempo hasta el próximo medio segundo
        const timeToNextHalfSecond = 500 - (now.getMilliseconds() % 500);
        
        setTimeout(() => {
            updateAllDisplays();
            // Una vez sincronizado, actualizamos cada medio segundo
            setInterval(updateAllDisplays, 500);
        }, timeToNextHalfSecond);
    }

    function updateAllDisplays() {
        const now = new Date();
        separatorVisible = (now.getMilliseconds() < 500);
        
        // Actualizar reloj principal
        const time = now.getHours() * 100 + now.getMinutes();
        mainClock.updateDisplay(time, separatorVisible);

        // Actualizar temporizadores
        if (blueTimer.isVisible()) {
            blueTimer.syncSeconds(now.getSeconds());
            blueTimer.display.updateDisplay(
                blueTimer.minutes * 100 + blueTimer.seconds,
                blueTimer.isRunning ? separatorVisible : true
            );
        }
        
        if (redTimer.isVisible()) {
            redTimer.syncSeconds(now.getSeconds());
            redTimer.display.updateDisplay(
                redTimer.minutes * 100 + redTimer.seconds,
                redTimer.isBlinking ? true : (redTimer.isRunning ? separatorVisible : true)
            );
        }
    }

    // Iniciar sincronización
    syncWithSystemClock();

    // Hacer el widget movible
    const widget = document.getElementById('widget');
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;

    function dragStart(e) {
        initialX = e.clientX - currentX;
        initialY = e.clientY - currentY;

        if (e.target === widget) {
            isDragging = true;
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            widget.style.transform = `translate(${currentX}px, ${currentY}px)`;
        }
    }

    function dragEnd() {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }

    // Inicializar posición
    currentX = 0;
    currentY = 0;

    // Agregar event listeners para el arrastre
    widget.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
}); 