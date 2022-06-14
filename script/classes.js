export class Automobile {
    constructor(marca, modello, targa, tipo) {
        this.marca = marca;
        this.modello = modello;
        this.targa = targa.toUpperCase();
        this.tipo = tipo;
    }
}

export class Garage {
    constructor(posti) {
        this.posti = +posti;
        this.listaAuto = [];
    }

    quanteAuto() {
        return this.listaAuto.length;
    }

    quantiPosti() {
        return this.posti;
    }

    riempimi(listaAutoPredefinita) {
        this.listaAuto = listaAutoPredefinita;
    }

    svuotami() {
        this.listaAuto = [];
    }

    aggiungiAuto(nuovaAutomobile) {
        this.listaAuto.push(nuovaAutomobile)
    }

    esisteTarga(targaValue) {
        return this.listaAuto.some(auto => auto.targa == targaValue.toUpperCase())
    }

    esisteMarca(upperCaseTrimmedMarcaValue) {
        return this.listaAuto.some(auto => auto.marca.toUpperCase() === upperCaseTrimmedMarcaValue)
    }

    filtraPerMarca(upperCaseTrimmedMarcaValue) {
        return this.listaAuto.filter(x =>
            x.marca.toUpperCase() === upperCaseTrimmedMarcaValue);
    }
}