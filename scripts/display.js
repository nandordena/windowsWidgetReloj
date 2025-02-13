class SegmentDisplay {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
        this.digits = [];
        this.separator = null;
        this.initializeDisplay();
    }

    initializeDisplay() {
        // Limpiar el contenedor
        this.element.innerHTML = '';
        
        // Crear los 4 bloques de dígitos
        for (let i = 0; i < 4; i++) {
            const digitElement = document.createElement('div');
            digitElement.className = 'digit';
            digitElement.textContent = '0';
            this.digits.push(digitElement);
            this.element.appendChild(digitElement);

            // Añadir dos puntos después del segundo dígito
            if (i === 1) {
                const separator = document.createElement('div');
                separator.className = 'separator';
                separator.textContent = ':';
                this.separator = separator;
                this.element.appendChild(separator);
            }
        }
    }

    updateDisplay(time, showSeparator = true) {
        // Convertir el tiempo a string y asegurar 4 dígitos
        const timeString = time.toString().padStart(4, '0');
        
        // Actualizar cada dígito
        for (let i = 0; i < 4; i++) {
            this.digits[i].textContent = timeString[i];
        }
        if (this.separator) {
            this.separator.style.visibility = showSeparator ? 'visible' : 'hidden';
        }
    }
} 