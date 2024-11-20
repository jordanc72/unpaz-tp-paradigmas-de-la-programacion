class Locomotora{
    constructor(){

    }
}

// hay varios tipos de vagones, asi que podriamos aplicar alguna herencia de esta clase
class Vagon{
    constructor(){

    }
}

// Vagones de pasajeros
// Para definir un vagón de pasajeros, debemos indicar el largo y el ancho medidos en metros, si tiene o no baños, y si está o no ordenado.

class VagonPasajeros{
    constructor({ancho,largo,tieneBaño,estaOrdenado}){
        this.ancho = ancho
        this.largo = largo
        this.tieneBaño = tieneBaño
        this.estaOrdenado = estaOrdenado
    }

    maxPasajeros(){
        // si el ancho es hasta 3 metros, entran 8 pasajeros por cada metro de largo.
        // si el ancho es de más de 3 metros, entran 10 pasajeros por cada metro de largo.
        // Si el vagón no está ordenado, restar 15 pasajeros.

        let pasajerosPorMetros = this.ancho <= 3 ? 8 * this.largo : 10 * this.largo;
        return !this.estaOrdenado ? pasajerosPorMetros - 15 : pasajerosPorMetros;
    }

    maxPeso(){
        // si tiene baños, entonces puede llevar hasta 300 kilos.
        // si no, hasta 800 kilos.
        // El peso máximo de un vagón de pasajeros se calcula así: 2000 kilos, más 80 kilos por cada pasajero, más el máximo de carga que puede llevar.
        
        let kBaños = this.tieneBaño ? 300 : 800;
        let kPasajeros = this.maxPasajeros() * 80
        return 2000 + kPasajeros + kBaños;
    }
}
// una formacion es un tren
class Formacion{
    constructor({locomotora, vagones}){
        this.locomotora = locomotora
        this.vagones = vagones
    }
}

class Deposito{
    // el deposito puede tener varias formaciones
    constructor({formaciones,locomotoras}){
        this.formaciones = formaciones
        this.locomotoras = locomotoras
    }

    addLocomotoraFormacion(formacion,...locomotoras){
        if (formacion in this.formaciones){
            formacion.locomotora.push(...locomotoras) // deberiamos verificar si las locomotora no estan en otra formacion.
        }
    }
}



export {Formacion, Locomotora, Vagon, Deposito, VagonPasajeros};