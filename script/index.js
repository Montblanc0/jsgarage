import { Automobile, Garage } from './classes.js'
import { creaRiga, listaAutoEsempio, mostraAutoInTabella, stampaModelli, mostraErrore, mostraMessaggio, validaStringa, validaTarga, svuotaGarage, riempiGarage, aggiornaPosti } from './utilities/utilities.js';


document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Loaded');
    const tbody = document.querySelector('tbody');
    const garage = new Garage(9);
    aggiornaPosti(garage);
    bacheca.innerHTML = 'Aggiungi manualmente le auto o riempi automaticamente';


    //INIZIO SUBMIT NUOVA AUTO
    carForm.onsubmit = function(e) {
        e.preventDefault();

        //Controlla se c'è posto nel garage
        if (garage.quanteAuto() < garage.quantiPosti()) {

            //Controlla se la targa è valida
            const questaTarga = this.elements["targa"].value;
            if (validaTarga(questaTarga)) {

                // Poi controlla se esiste già
                if (garage.esisteTarga(questaTarga)) {

                    mostraErrore(bacheca, `L'auto targata ${questaTarga.toUpperCase()} è già stata parcheggiata`, `L'input di targa corrisponde a un valore già esistente`);

                    // E infine se marca e modello non contengono solo spazi
                } else if (validaStringa(this.elements["marca"].value) && validaStringa(this.elements["modello"].value)) {

                    const marca = this.elements["marca"].value;
                    const modello = this.elements["modello"].value;
                    const targa = questaTarga;
                    const tipo = this.elements["tipo"].value;

                    //Crea una nuova macchina
                    const auto = new Automobile(marca, modello, targa, tipo);

                    //Aggiungi la macchina al garage
                    garage.aggiungiAuto(auto);

                    creaRiga(tbody);

                    //Aggiungi l'auto alla riga
                    for (let proprieta of Object.keys(auto)) {
                        mostraAutoInTabella(auto[proprieta], tbody);
                    }

                    //Aggiorna posti disponibili
                    aggiornaPosti(garage);

                    //Comunica il successo
                    mostraMessaggio(bacheca, `L'auto targata ${auto.targa} è stata appena parcheggiata`, `Nuova auto aggiunta: ${auto.marca} ${auto.modello}`);

                } else {
                    mostraErrore(bacheca, 'La marca e/o il modello non possono essere solo spazi', 'Il test di una RegEx è fallito');
                }

            } else {
                mostraErrore(bacheca, 'La targa deve avere un formato italiano valido', 'Il test di una RegEx è fallito');
            }

        } else {
            mostraErrore(bacheca, `Non c'è posto per la tua auto: il garage è pieno`, 'garage.listaAuto.length è uguale a garage.posti');
        }

    }; //FINE SUBMIT NUOVA AUTO

    //INIZIO SUBMIT CONTROLLA MARCA
    marcaForm.onsubmit = function(e) {
            e.preventDefault();

            const questaMarca = this.elements["testoMarca"].value.toUpperCase().trim();
            // Controlla se l'input contiene solo spazi
            if (!validaStringa(questaMarca)) {
                mostraErrore(risultato, 'La marca non può contenere solo spazi', 'Il test di una RegEx è fallito');
            } else {

                // Se esiste una marca uguale a quella inserita
                if (garage.esisteMarca(questaMarca)) {

                    // Filtra la lista auto in base alla marca
                    const autoFiltrate = garage.filtraPerMarca(questaMarca)

                    // Se il match è 1, restituisci solo 1 modello
                    if (autoFiltrate.length == 1) {
                        mostraMessaggio(risultato, `C'è solo 1 auto con questa marca: ${autoFiltrate[0].modello}`, `Trovato un solo match`);

                        //Altrimenti esegui la funzione stampaModelli()
                    } else {
                        mostraMessaggio(risultato, `Ci sono ${autoFiltrate.length} auto con questa marca: ${stampaModelli(autoFiltrate)}`, `Trovate ${autoFiltrate.length} corrispondenze`);
                    }
                } else {
                    mostraErrore(risultato, 'Non ci sono auto con questa marca', 'Nessun match');
                }
            } // fine else del controllo spazi

        } // FINE SUBMIT CONTROLLA MARCA


    //Al clic sul pulsante, svuota l'array e la tabella
    svuota.onclick = function() {
        svuotaGarage(garage, tbody);
    }

    //Al clic sul pulsante, riempi il garage con un array predefinito
    riempi.onclick = function() {
        svuotaGarage(garage, tbody);
        riempiGarage(garage, listaAutoEsempio, tbody);
    }

}); //FINE DOM CONTENT LOADED