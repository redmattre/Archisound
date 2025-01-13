# Cielo

versione prototipo_alpha

## Table of Contents
1. [Introduzione](#introduzione)
2. [Struttura dell'Interfaccia](#struttura-dellinterfaccia)
3. [Funzionalità](#funzionalità)
   - [Impostazioni Generali](#impostazioni-generali)
   - [Gestione Architettura](#gestione-architettura)
   - [Zone](#zone)
   - [Altoparlanti](#altoparlanti)
   - [Corone](#corone)
4. [Scorciatoie e Controlli](#scorciatoie-e-controlli)
5. [Dipendenze](#dipendenze)
6. [Contributi](#contributi)
7. [Licenza](#licenza)

## Introduzione

**Cielo** è un'editor web per la progettazione di spazi sonori, in particolare integrato con il sistema di spazializzazione immersiva Nuvola. Offre funzinalità di:

- Inserimento di progetti e modelli architettonici (formati generici come .obj o specifici di disegno tecnico come .ifc o .3dm)
- Trasformazione ed inserimento di elementi di sound design 3D nello spazio
- Calcolo di volumi e posizioni relative di fonti ed aree sonore
- Tracking dei dispositivi Nuvola di riproduzione immersiva WiFi (aureole, soundbat, cellulari)

nota: Il sistema Nuvola permette di integrare alla spazializzazione tradizionale cablata un sistema di dispositivi browser generici (cellulari, mini computer, dispositivi indossabili custom) dotati di una web app DSP controllabile da remoto. Offre funzionalità come l'aggancio a griglia, temi personalizzati, trasparenza regolabile e molto altro.

## Struttura dell'interfaccia

Gli elementi di UI comprendono:

1. Bottoniera laterale destra:
   - Tasto Menu Impostazioni: visualizza il menu "Impostazioni" nella parte destra dell'interfaccia.
   - [❍] Tasto Aureola: il tasto "Aureola" permette di aggiungere alla scena i dispositivi indossabili di spazializzazione sonora privata, specificatamente quelli per la testa, chiamati nel software "aureole". Le caratteristiche posizionali di questi sono determinate dal tracking delle aureole stesse, in questo caso la posizione è gestita esternamente il software che serve solo da visualizzatore della posizione in tempo reale.
   - [⊚] Tasto Altoparlante: il tasto "Altoparlante" permette di aggiungere alla scena altoparlanti cablati. Si distinguono dai dispositivi di spazializzazione indossabili in quanto non dispongono di un tracking ma sono statici. Le caratteristiche di questi possono essere decise attraverso l'interfaccia "Lista Oggetti" o attraverso il gizmo di spostamento e rotazione dell'interfaccia.
   - [⛶] Tasto Zona: Il tasto "Zona" permette di creare volumi tridimensionali nello spazio progettato. Queste possono servire per visualizzare aree di tracking o definire zone sonore, a discrezione del progettista. Una volta premuto questo tasto al centro della schermata comparirà un menu rapido dove sarà possibile selezionare la geometria di partenza della zona tra "C" (Cuboide) e "S" (Sferica) o annullare l'azione (x).
   - [➞] Tasto Fonte Direzionale: Il tasto "Fonte Direzionale" è predisposto per inserire nella scena una fonte sonora che ha caratteristiche direzionali ma non posizionali. Il concetto ricalca quello della "luce direzionale" utilizzata nei software 3D: la posizione della fonte è irrilevante ed ha scopi solamente illustrativi, la direzione invece del vettore indicato dalla freccia rappresenta un suono direzionale che viene comunicato in maniera identica a tutti i dispositivi di riproduzione. [Es. se ci sono tre persone che indossano l'aureola e viene predisposta una fonte direzionale da dietro - quindi con la freccia che punta verso davanti - tutti i presenti, indipendentemente dalla loro posizione nella stanza, sentiranno il suono provenire da dietro]
   - [⬤] Tasto Fonte Omni Direzionale: Una fonte sonora che si propaga in tutte le direzioni con eguale energia, dispone di caratteristiche posizionali e direzionali, queste ultime calcolate in base alla posizione relativa dei dispositivi di riproduzione.
   - [▤] Tasto Lista Oggetti: Il tasto "Lista Oggetti" visualizza il menu "Lista Oggetti" nella parte sinistra dell'interfaccia. Si veda la descrizione "Menu Lista Oggetti" per comprenderne il funzionamento.

2. Puntatore/selettore:
   - il puntatore in questo software determina la selezione degli oggetti nella scena tridimensionale. Quando il puntatore è instato di hovering sopra ad un oggetto verrà disegnata una outline intorno all'oggetto evidenziato e il suo nome comparirà in alto a sinistra. Il nome dell'oggetto in alto a sinistra indica quale oggetto è "selezionato" in quel momento. A questo punto i tasti:

      - "G": attiva il gizmo di trasformazione relativo allo spostamento dell'oggetto
      - "R": attiva il gizmo di trasformazione relativo alla rotazione dell'oggetto
      - "S": attiva il gizmo di trasformazione relativo alla scala dell'oggetto
      - "Q": cambia la funzionalità delle trasformazione da "globali" a "locali"

   nota: queste funzionalità quando attivate vengono riassunte in un testo in basso a sinistra.

4. Menu Impostazioni:

5. Menu Lista Oggetti:
