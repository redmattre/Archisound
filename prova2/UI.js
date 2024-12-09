var visualizzazione = document.getElementById("visualizzazione");

window.addEventListener('keydown', function(event) {
    switch (event.key) {
        case '1':
            // Attiva la camera prospettica
            visualizzazione.textContent = "Prospettiva";
            break;

        case '2':
            // Attiva la camera ortogonale dall'alto
            visualizzazione.textContent = "Pianta";
            break;

        case '3':
            // Attiva la camera ortogonale da di fronte
            visualizzazione.textContent = "Fronte";
            break;

        case '4':
            // Attiva la camera ortogonale da destra
            visualizzazione.textContent = "Lato";
            break;
        // Aggiungi il resto delle tue azioni per altri tasti
        case 'q':
            
            break;

        case 'Shift':
            
            break;

        case 'w':
            
            break;

        case 'e':
            
            break;

        case 'r':
            
            break;

        case 'c':
            
            break;

        case 'v':
            
            break;

        case '+':
        case '=':
            
            break;

        case '-':
        case '_':
            
            break;

        // case 'x':
        //     control.showX = !control.showX;
        //     break;

        // case 'y':
        //     control.showY = !control.showY;
        //     break;

        // case 'z':
        //     control.showZ = !control.showZ;
        //     break;

        // case ' ':
        //     control.enabled = !control.enabled;
        //     break;

        case 'Escape':
            
            break;
    }
});