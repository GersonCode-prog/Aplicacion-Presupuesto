const ingresos = [
    new Ingreso("Salario", 3333.00),
    new Ingreso("Ventas del Mes", 2000.00)
];

const egresos = [
    new Egreso("Alquiler", 1500.00),
    new Egreso("Compras Oficina", 200.00)
];

let cargarApp = ()=>{
    cargarCabecero();
}

let totalIngresos = ()=>{
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = ()=>{
    let totalEgreso = 0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

let cargarCabecero = ()=>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

const formatoMoneda = (valor) => {
    return valor.toLocaleString("es-GT", { style: "currency", currency: "GTQ" });
};

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString("es-GT", { style: "percent", minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
