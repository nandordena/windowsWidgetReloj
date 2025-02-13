class Timer {
    constructor(displayId, controls, countUp = false) {
        this.display = new SegmentDisplay(displayId);
        this.timerElement = document.getElementById(displayId).closest('.timer');
        this.isRunning = false;
        this.countUp = countUp;
        
        // Referencias de tiempo
        this.referenceTime = null;
        this.targetSeconds = 0;
        this.initialSeconds = 0;
        
        this.minutes = 0;
        this.seconds = 0;
        this.blinkCount = 0;
        this.isBlinking = false;  // Nuevo flag para controlar el estado de parpadeo
        
        this.initializeControls(controls);
        this.updateDisplay();
    }

    initializeControls(controls) {
        const [plusBtn, playPauseBtn, minusBtn] = Array.from(controls);
        
        plusBtn.addEventListener('click', () => this.addMinute());
        minusBtn.addEventListener('click', () => this.subtractMinute());
        playPauseBtn.addEventListener('click', () => this.toggleTimer());
    }

    startBlinking() {
        this.isBlinking = true;
        this.blinkCount = 0;
        this.isRunning = false;  // Detenemos el temporizador
        this.timerElement.classList.add('blinking');
        
        const blinkInterval = setInterval(() => {
            this.blinkCount++;
            if (this.blinkCount >= 10) {
                clearInterval(blinkInterval);
                this.timerElement.classList.remove('blinking');
                this.timerElement.classList.add('hidden');
                this.isBlinking = false;
            }
        }, 1000);
    }

    syncSeconds(systemSeconds) {
        if (!this.isRunning) return;

        const now = new Date();
        const elapsedSeconds = Math.floor((now - this.referenceTime) / 1000);

        if (this.countUp) {
            const totalSeconds = this.initialSeconds + elapsedSeconds;
            this.minutes = Math.floor(totalSeconds / 60);
            this.seconds = totalSeconds % 60;
        } else {
            const remainingSeconds = Math.max(0, this.targetSeconds - elapsedSeconds);
            this.minutes = Math.floor(remainingSeconds / 60);
            this.seconds = remainingSeconds % 60;

            if (remainingSeconds === 0 && !this.isBlinking) {
                this.startBlinking();
            }
        }
    }

    start() {
        this.referenceTime = new Date();
        if (!this.countUp) {
            this.targetSeconds = this.minutes * 60 + this.seconds;
        }
        this.isRunning = true;
        this.timerElement.classList.remove('hidden');
    }

    stop() {
        if (this.isRunning) {
            const now = new Date();
            const elapsedSeconds = Math.floor((now - this.referenceTime) / 1000);

            if (this.countUp) {
                this.initialSeconds += elapsedSeconds;
            } else {
                this.targetSeconds = Math.max(0, this.targetSeconds - elapsedSeconds);
                this.minutes = Math.floor(this.targetSeconds / 60);
                this.seconds = this.targetSeconds % 60;
                
                // Si llega a cero, iniciar el parpadeo
                if (this.targetSeconds === 0 && !this.isBlinking) {
                    this.startBlinking();
                    return; // No ocultamos inmediatamente
                }
            }
        }

        this.isRunning = false;
        if (this.minutes === 0 && this.seconds === 0 && this.countUp) {
            this.timerElement.classList.add('hidden');
        }
    }

    toggleTimer() {
        if (!this.isRunning) {
            this.start();
        } else {
            this.stop();
        }
    }

    addMinute() {
        if (this.countUp) {
            this.initialSeconds += 60;
            if (this.isRunning) {
                const now = new Date();
                const elapsedSeconds = Math.floor((now - this.referenceTime) / 1000);
                this.referenceTime = new Date(now - elapsedSeconds * 1000);
            }
        } else {
            if (this.isRunning) {
                const now = new Date();
                const elapsedSeconds = Math.floor((now - this.referenceTime) / 1000);
                const remainingSeconds = Math.max(0, this.targetSeconds - elapsedSeconds);
                this.targetSeconds = Math.min(remainingSeconds + 60, 99 * 60);
                this.referenceTime = now;
            } else {
                const currentSeconds = this.seconds;
                this.minutes = Math.min(this.minutes + 1, 99);
                this.seconds = currentSeconds;
                this.targetSeconds = (this.minutes * 60) + this.seconds;
            }
        }
        
        this.updateDisplay();
        this.timerElement.classList.remove('hidden');
    }

    subtractMinute() {
        if (this.countUp) {
            const currentTotal = this.isRunning 
                ? this.initialSeconds + Math.floor((new Date() - this.referenceTime) / 1000)
                : this.initialSeconds;

            // Si hay menos de un minuto total, reiniciar a cero
            if (currentTotal < 60) {
                this.initialSeconds = 0;
                this.minutes = 0;
                this.seconds = 0;
                if (this.isRunning) {
                    this.referenceTime = new Date(); // Reiniciar la referencia al momento actual
                    // No detenemos el temporizador si está en marcha
                } else {
                    // Solo ocultamos si está detenido
                    this.timerElement.classList.add('hidden');
                }
            } else {
                this.initialSeconds = Math.max(0, this.initialSeconds - 60);
                if (this.isRunning) {
                    const now = new Date();
                    const elapsedSeconds = Math.floor((now - this.referenceTime) / 1000);
                    this.referenceTime = new Date(now - elapsedSeconds * 1000);
                }
            }
        } else {
            if (this.isRunning) {
                const now = new Date();
                const elapsedSeconds = Math.floor((now - this.referenceTime) / 1000);
                const remainingSeconds = Math.max(0, this.targetSeconds - elapsedSeconds);
                
                if (remainingSeconds < 60) {
                    this.targetSeconds = 0;
                    this.minutes = 0;
                    this.seconds = 0;
                    this.stop();
                } else {
                    this.targetSeconds = remainingSeconds - 60;
                    this.referenceTime = now;
                }
            } else {
                if (this.minutes === 0 || (this.minutes === 0 && this.seconds > 0)) {
                    this.minutes = 0;
                    this.seconds = 0;
                    this.targetSeconds = 0;
                } else {
                    const currentSeconds = this.seconds;
                    this.minutes = Math.max(0, this.minutes - 1);
                    this.seconds = currentSeconds;
                    this.targetSeconds = (this.minutes * 60) + this.seconds;
                }
            }
        }
        
        this.updateDisplay();
        // Solo ocultamos si está a cero Y detenido
        if (this.minutes === 0 && this.seconds === 0 && !this.isRunning) {
            this.timerElement.classList.add('hidden');
        }
    }

    updateDisplay() {
        const time = this.minutes * 100 + this.seconds;
        // Durante el parpadeo, mantenemos los separadores visibles
        this.display.updateDisplay(time, this.isBlinking ? true : true);
    }

    isVisible() {
        return !this.timerElement.classList.contains('hidden');
    }
} 