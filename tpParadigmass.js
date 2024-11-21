class Locomotora{
    constructor(){

    }
}

// hay varios tipos de vagones, asi que podriamos aplicar alguna herencia de esta clase
class Vagon{
    constructor(){

    }
}

class VagonPasajeros{
    constructor({ancho,largo,tieneBaño,estaOrdenado}){
        this.ancho = ancho
        this.largo = largo
        this.baño = tieneBaño
        this.estaOrdenado = estaOrdenado
    }
    tieneBaño(){return this.baño}

    capacidadPasajeros(){return this.ancho <= 3 ? 8 * this.largo : 10 * this.largo}

    maxPasajeros(){
        return this.estaOrdenado ? this.capacidadPasajeros() : this.capacidadPasajeros() - 15;
    }
    cargaMax(){
        return this.tieneBaño() ? 300 : 800
    }

    maxPeso(){        
        return 2000 + this.maxPasajeros() * 80 + this.cargaMax();
    }
}

class vagonCarga{
    constructor({CargaIdeal,CantMadera}){
        this.CargaIdeal = CargaIdeal
        this.CantMadera = CantMadera
    }
    tieneBaño(){return false}
    maxPasajeros(){return 0}
    cargaMax(){return this.CargaIdeal - this.CantMadera * 400}
    maxPeso(){      

        return 1500 + this.cargaMax()
    }
}

class vagonDormitorio{
    constructor({cantCompartimientos,cantCamas}){
        this.cantCompartimientos = cantCompartimientos
        this.cantCamas= cantCamas
    }

    tieneBaño(){return true}
    maxPasajeros(){ return this.cantCompartimientos * this.cantCamas}
    cargaMax(){return 1200 }
    maxPeso(){ return 4000 + this.maxPasajeros() * 80 + this.cargaMax()}
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
        }//cambié un append por push
    }
    cantidadPasajeros(tren){return tren.vagones.reduce((acum, pasajeros) => acum + pasajeros.maxPasajeros(),0) }

    vagonesPopulares(tren){return tren.vagones.reduce((acum,vagon)=>acum + (vagon.maxPasajeros() > 50 ? 1 : 0),0)}

    esCarguera(tren){return tren.vagones.every(vagon => vagon.cargaMax() >= 1000 )}

    dispersionPeso(tren){
        let pesos = tren.vagones.map(vagon => vagon.maxPeso());
        return Math.max(...pesos) - Math.min(...pesos)}

    cantidadBaños(tren){return tren.vagones.reduce((acum, baños) => acum + (baños.tieneBaño()?1: 0), 0)}

    mantenimiento(tren){

        tren.vagones.forEach(vagon => {
            if(vagon instanceof vagonCarga){
                vagon.CantMadera= Math.max(vagon.CantMadera - 2, 0)
            } else if(vagon instanceof VagonPasajeros) {
                vagon.estaOrdenado = true
            }

        });
    }
}




//Testing
let locomotora1 = new Locomotora()
let locomotora2 = new Locomotora()

let vagon1 = new Vagon()
let vagon2 = new Vagon()
let vagon3 = new Vagon()
let vagon4 = new Vagon()

//let formacion1 = new Formacion({locomotora: [locomotora1,locomotora2], vagones: [vagon1,vagon2]})
//let deposito = new Deposito({formaciones: formacion1})



// un vagón de pasajeros de 10 metros de largo y 2 de ancho puede llevar hasta 80 pasajeros si está ordenado, 65 pasajeros si no.

// otro vagón, también de 10 metros de largo, pero de 4 metros de ancho, puede llevar hasta 100 pasajeros si está ordenado, 85 pasajeros si no.
//let otroVagonPasajero = new VagonPasajeros({ancho: 4, largo:10,estaOrdenado: true})
//console.log("capacidad vagonPasajero2",otroVagonPasajero.maxPasajeros()) // => 100


//Un vagón dormitorio con 12 compartimientos de 4 camas cada uno, puede llevar hasta 48 pasajeros.
//let dormitorio = new vagonDormitorio({cantCompartimientos:12, cantCamas:4})
//console.log('La cantidad máxima de pasajeros es de: ', dormitorio.maxPasajeros())// => 48

//Su peso máximo se calcula así: 4000 kilos, más 80 kilos por cada pasajero, más el máximo de carga que puede llevar.
//console.log('La capacidad máxima de peso es de: ', dormitorio.maxPeso())


/*
//Un vagón de carga con carga máxima ideal 8000 kilos con 5 maderas sueltas puede llevar hasta 6000 kilos
let carga = new vagonCarga({CargaIdeal:8000, CantMadera: 5})
console.log("")
//console.log("vagon de carga - capacidad maxima:",carga.maxPeso())
console.log("vagon de carga - capacidad ideal:",carga.cargaMax())

carga.CantMadera = 2
console.log("vagon de carga - capacidad ideal:",carga.cargaMax())*/


//                                                  PRUEBAS PRIMER TREN

//          Vagón	cant. pasajeros	peso máximo	carga máxima    tiene baño
//            1	          100	       10300     	300	             sí

let tren1 = new Formacion({
    locomotora: new Locomotora(),
    vagones: [
        new VagonPasajeros({ancho: 4, largo:10,tieneBaño: true, estaOrdenado: true}),
        new VagonPasajeros({ancho: 2, largo:7,tieneBaño: false, estaOrdenado: false}),
        new vagonCarga({CargaIdeal: 6800, CantMadera: 5}),
        new vagonDormitorio({cantCompartimientos:8, cantCamas:3})
    ]

})
let deposito = new Deposito({formaciones: [tren1], locomotoras: []})

/*
console.log("cantidad de pasajeros (vagonPasajero1): ",vagonPasajeros.maxPasajeros())
console.log("peso maximo (vagonPasajero1): ",vagonPasajeros.maxPeso())
console.log("carga maxima (vagonPasajero1): ",vagonPasajeros.cargaMax())
console.log("capacidad (vagonPasajero1): ",vagonPasajeros.tieneBaño())
console.log("")
//Bien

/*
let keys = Object.keys(vagonPasajeros2)

for (let i = 0; i< keys.length; i++) {  
      console.log(vagonPasajeros2[keys[i]])}

console.log("cantidad de pasajeros (vagonPasajero2): ",vagonPasajeros2.maxPasajeros())
console.log("peso maximo (vagonPasajero2): ",vagonPasajeros2.maxPeso())
console.log("carga maxima (vagonPasajero2): ",vagonPasajeros2.cargaMax())
console.log("capacidad (vagonPasajero2): ",vagonPasajeros2.tieneBaño())
console.log("")
//Bien

console.log("cantidad de pasajeros (vagonCarga1): ",vagonCarga1.maxPasajeros())
console.log("peso maximo (vagonCarga1): ",vagonCarga1.maxPeso())
console.log("carga maxima (vagonCarga1): ",vagonCarga1.cargaMax())
console.log("capacidad (vagonCarga1): ",vagonCarga1.tieneBaño())
console.log("")
//Bien

console.log("cantidad de pasajeros (vagonDormitorio1): ",vagonDormitorio1.maxPasajeros())
console.log("peso maximo (vagonDormitorio1): ",vagonDormitorio1.maxPeso())
console.log("carga maxima (vagonDormitorio1): ",vagonDormitorio1.cargaMax())
console.log("capacidad (vagonDormitorio1): ",vagonDormitorio1.tieneBaño())
console.log("")
//Bien
*/

console.log("ANTES DEL MANTENIMIENTO")
console.log("cantidad de pasajeros: ",deposito.cantidadPasajeros(tren1))
console.log("Tiene vagones populares? ",deposito.vagonesPopulares(tren1))
console.log("Es un tren de carga? ",deposito.esCarguera(tren1))
console.log("Dispersión de pesos:", deposito.dispersionPeso(tren1))
console.log("Cantidad de baños: ",deposito.cantidadBaños(tren1))
console.log("")

deposito.mantenimiento(tren1)
console.log("DESPUÉS DEL MANTENIMIENTO")
console.log("cantidad de pasajeros: ",deposito.cantidadPasajeros(tren1))
console.log("Tiene vagones populares? ",deposito.vagonesPopulares(tren1))
console.log("Es un tren de carga? ",deposito.esCarguera(tren1))
console.log("Dispersión de pesos:", deposito.dispersionPeso(tren1))
console.log("Cantidad de baños: ",deposito.cantidadBaños(tren1))
//Bien

let tren2 = new Formacion({
    locomotora: new Locomotora(),
    vagones: [
        new vagonCarga({CargaIdeal: 8000, CantMadera: 1}),
        new vagonDormitorio({cantCompartimientos:15, cantCamas:4})
    ]

})
let deposito2 = new Deposito({formaciones: [tren2], locomotoras: []})

console.log("ANTES DEL MANTENIMIENTO")
console.log("cantidad de pasajeros: ",deposito2.cantidadPasajeros(tren2))
console.log("Tiene vagones populares? ",deposito2.vagonesPopulares(tren2))
console.log("Es un tren de carga? ",deposito2.esCarguera(tren2))
console.log("Dispersión de pesos:", deposito2.dispersionPeso(tren2))
console.log("Cantidad de baños: ",deposito2.cantidadBaños(tren2))
console.log("")

deposito.mantenimiento(tren2)
console.log("DESPUÉS DEL MANTENIMIENTO")
console.log("cantidad de pasajeros: ",deposito2.cantidadPasajeros(tren2))
console.log("Tiene vagones populares? ",deposito2.vagonesPopulares(tren2))
console.log("Es un tren de carga? ",deposito2.esCarguera(tren2))
console.log("Dispersión de pesos:", deposito2.dispersionPeso(tren2))
console.log("Cantidad de baños: ",deposito2.cantidadBaños(tren2))