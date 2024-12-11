var visualizzazione = document.getElementById("visualizzazione");
const infoDiv2 = document.getElementById('infoDiv-2');

let space = "Mondo:";
let action = "movimento";

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
            space === 'Mondo:' ? space = 'Locale:' : space = 'Mondo:';
            infoDiv2.textContent = `${space + " " + action}`;
            break;
        case 'r':
            action = "rotazione";
            infoDiv2.textContent = `${space + " " + action}`;
            break;
        case 's':
            action = "scalatura";
            infoDiv2.textContent = `${space + " " + action}`;
            break;

        case 'g':
            action = "movimento";
            infoDiv2.textContent = `${space + " " + action}`;
            break;
    }
});