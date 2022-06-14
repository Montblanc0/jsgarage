import { Automobile } from "../classes.js";

export const listaAutoEsempio = [
    new Automobile('Fiat', 'Punto Evo', 'EG558LO', 'Diesel'),
    new Automobile('BMW', 'X3', 'FX190PQ', 'Ibrida'),
    new Automobile('Citroen', 'Saxo', 'AW480YT', 'Benzina'),
    new Automobile('Fiat', 'Panda', 'AR765PO', 'Benzina'),
    new Automobile('Fiat', '500L', 'GH991UH', 'Diesel'),
    new Automobile('Audi', 'A3', 'DZ795NN', 'GPL'),
    new Automobile('Toyota', 'Aygo', 'BG232AL', 'Diesel'),
    new Automobile('BMW', 'Serie 5', 'FF009CA', 'Diesel'),
    new Automobile('Tesla', 'Model 3', 'GP720BD', 'Elettrica')
]

//Espressione regolare che controlla formato targa italiano
export function validaTarga(targaValue) {
    const regExTarga = /^[A-Za-z]{2}[0-9]{3}[A-Za-z]{2}$/g;
    return regExTarga.test(targaValue);
}

//Espressione regolare che esclude stringhe di soli spazi
export function validaStringa(stringaValue) {
    const regExSpazi = /[\S+]/g;
    return regExSpazi.test(stringaValue);
}


export function creaRiga(tbody) {
    const tr = document.createElement('tr');
    tbody.appendChild(tr);
}

export function mostraMessaggio(idParagrafo, messaggio, log) {
    idParagrafo.style.backgroundColor = 'rgb(46, 219, 30)';
    idParagrafo.innerHTML = messaggio;
    console.log(log);
}

export function mostraErrore(idParagrafo, messaggio, err) {
    idParagrafo.style.backgroundColor = 'rgb(240, 42, 42)';
    idParagrafo.innerHTML = messaggio;
    console.error(err);
}

export function mostraAutoInTabella(proprietaValue, tbody) {
    const testo = document.createTextNode(proprietaValue);
    const td = document.createElement('td');
    td.appendChild(testo);
    tbody.lastElementChild.appendChild(td);
}

export function stampaModelli(array) {
    let stringaModelli = ``;
    for (let n of array) {
        if (array.findIndex(auto => auto.modello === n.modello) == array.length - 1) {
            stringaModelli += `${n.modello}`;
        } else if (array.findIndex(auto => auto.modello === n.modello) == array.length - 2) {
            stringaModelli += `${n.modello} e `;
        } else {
            stringaModelli += `${n.modello}, `;
        }
    }
    return stringaModelli;
}

export function svuotaGarage(garage, tbody) {
    garage.svuotami();
    tbody.innerHTML = '';
    aggiornaPosti(garage);
    mostraMessaggio(bacheca, 'Il garage è stato svuotato', 'garage.listaAuto è stato svuotato');
}

export function riempiGarage(garage, listaAutoPredefinita, tbody) {
    garage.riempimi(listaAutoPredefinita);

    //Crea una riga per ogni auto nell'array
    listaAutoPredefinita.forEach(n => {
        creaRiga(tbody);

        //E aggiungine le proprietà alle rispettive colonne
        for (let proprieta of Object.keys(n)) {
            mostraAutoInTabella(n[proprieta], tbody);
        }
    });
    aggiornaPosti(garage);
    mostraMessaggio(bacheca, 'Garage riempito con lista auto di esempio', 'Array predefinito caricato');
}

export function aggiornaPosti(garage) {
    liberi.innerHTML = garage.quantiPosti() - garage.quanteAuto();
    quante.innerHTML = garage.quanteAuto();
}