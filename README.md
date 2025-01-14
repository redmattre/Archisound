# Cielo

versione prototipo_alpha

## Table of Contents
1. [Introduzione](#introduzione)
2. [Struttura dell'Interfaccia](#struttura-dellinterfaccia)

## Introduzione

**Cielo** è un'editor web per la progettazione di spazi sonori, in particolare integrato con il sistema di spazializzazione immersiva Nuvola. Offre funzinalità di:

- Inserimento di progetti e modelli architettonici (formati generici come `.obj` o di progettazione [BIM](https://it.wikipedia.org/wiki/Building_Information_Modeling) come `.ifc` o `.3dm`)
- Trasformazione ed inserimento di elementi di sound design 3D nello spazio
- Calcolo di volumi e posizioni relative di fonti ed aree sonore
- Tracking dei dispositivi `Nuvola:client` di riproduzione immersiva WiFi (aureole, soundbat, cellulari)

*nota: Il sistema Nuvola permette di integrare alla spazializzazione tradizionale cablata un sistema di dispositivi browser (cellulari, mini computer, dispositivi indossabili custom) organizzati in Nuvola:client e Nuvola:server.*

## Struttura dell'interfaccia

1. Bottoniera laterale destra:
   - **Tasto Menu Impostazioni**: visualizza il menu "Impostazioni" nella parte destra dell'interfaccia.
   - [❍] **Tasto Aureola**: il tasto "Aureola" permette di aggiungere alla scena i dispositivi indossabili di spazializzazione sonora e aptica chiamati `Aureola`.

     *nota: Le caratteristiche posizionali di questi sono determinate dal tracking delle aureole stesse, in questo caso la posizione è gestita esternamente, Cielo serve solo da visualizzatore della posizione in tempo reale.*
     
   - [☁] **Tasto Nuvola**: il tasto "Nuvola" permette di aggiungere alla scena i dispositivi `Nuvola:client` generici.
  
     *nota: questi oggetti possono essere statici (altoparlanti con `Nuvola:dsp`), mobili senza tracking (altoparlanti smart con `Nuvola:dsp`) o mobili con tracking (custom hardware minipc con `Nuvola:dsp`).*
     
   - [⊚] **Tasto Altoparlante**: il tasto "Altoparlante" permette di aggiungere alla scena altoparlanti statici cablati.
     
   - [⛶] **Tasto Zona**: Il tasto "Zona" permette di creare volumi 3D (cuboidi o sferici) per tracking o definizione di aree sonore. Questi possono servire per visualizzare aree di tracking o definire zone sonore, a discrezione del progettista.

     *nota: Una volta premuto questo tasto al centro della schermata comparirà un menu rapido dove sarà possibile selezionare la geometria della zona tra: "C" (Cuboide) e "S" (Sferica) o annullare l'azione (x).*
     
   - [➞] **Tasto Fonte Direzionale**: Il tasto "Fonte Direzionale" permette di creare una fonte sonora con caratteristiche direzionali ma *non posizionali*. Il concetto ricalca quello della "luce direzionale" utilizzata nei software 3D: la posizione della fonte è irrilevante ed ha scopi solamente illustrativi, la direzione invece del vettore indicato dalla freccia rappresenta un suono direzionale che viene comunicato in maniera identica a tutti i dispositivi di riproduzione.
     
     *[Es. se ci sono tre persone che indossano l'aureola e viene predisposta una fonte direzionale da dietro - quindi con la freccia che punta verso davanti - tutti i presenti, indipendentemente dalla loro posizione nella stanza, sentiranno il suono provenire da dietro]*
     
   - [⬤] Tasto Fonte Omni Direzionale: Il tasto "Font Omni Direzionale" permette di creare una fonte sonora che si propaga in tutte le direzioni con eguale energia, dispone di caratteristiche posizionali e direzionali.
     
   - [▤] Tasto Lista Oggetti: Il tasto "Lista Oggetti" visualizza il menu "Lista Oggetti" nella parte sinistra dell'interfaccia. Si veda la descrizione "Menu Lista Oggetti" per comprenderne il funzionamento.

1. Puntatore/selettore:
   
   il `puntatore` determina la selezione degli oggetti nella scena tridimensionale. Quando il puntatore passa sopra ad un oggetto 3D nella scena viene disegnata una outline intorno all'oggetto evidenziato e il suo nome compare in alto a sinistra. Il nome dell'oggetto in alto a sinistra indica quale oggetto è "selezionato" in quel momento, nel caso non ci sia nessun oggetto sotto al puntatore l'oggetto selezionato è l'ultimo ad essere stato selezionato.
  
   In base all'oggetto selezionato i seguenti tasti rapidi permettono la modifica della scena:
   
   - **"g"**: attiva il gizmo di trasformazione relativo allo `"spostamento"` dell'oggetto
     
   - **"r"**: attiva il gizmo di trasformazione relativo alla `"rotazione"` dell'oggetto
     
   - **"s"**: attiva il gizmo di trasformazione relativo alla `"scala"` dell'oggetto
     
   - **"q"**: cambia la funzionalità delle trasformazione da `"globali"` a `"locali"`
     
   - **"Backspace" o "x"**: `"elimina"` l'oggetto dalla scena

   *nota: queste funzionalità quando attivate vengono riassunte in un testo in basso a sinistra.*

4. Menu Impostazioni:

   - **Generali**
      - **"Tema Eco"**: cambio del tema da bianco a nero. Lo schermo nero è total black quindi è un opzione di risparmio energetico sugli schermi che lo supportano.
      - **"Aggancio Griglia"**: attiva o disattiva l'aggancio alla griglia. Il selettore permette tre grandezze.
      - **"Diorama"**: attiva o disattiva la possibilità di modifica degli oggetti nella scena, risparmia potenza di calcolo qando attivata.
      - **"Super Superficie"** si riferisce alla griglia di aiuto, lo slider ne imposta l'estensione.

   - **Architettura**
     - **"⏿"**: permette di vedere o nascondere l'architettura.
      - **"Tema Muto"**: cambio della palette di colori del materale dell'architettura.
      - **"Trasparenza"**: attiva o disattiva la trasparenza del materiale dell'architettura, lo slider definisce il valore di trasparenza.

   - **Zone**
      - **"⏿"**: permette di vedere o nascondere le Zone.
        
   - **Altoparlanti**
      - **"⏿"**: permette di vedere o nascondere gli Altoparlanti.
        
   - **Aureole**
     - **"⏿"**: permette di vedere o nascondere le Aureole.

5. Menu Lista Oggetti:
   
   In questo menu vengono dinamicamente mostrate gli oggetti presenti nella scena, da qui è possibile inserire valori precisi per le trasformazioni e attivare o disattivare la vista di ogni singolo oggetto (con "⏿").
