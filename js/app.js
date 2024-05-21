const ingresos = [
    new Ingreso("Salario", 3336.00),
    new Ingreso("Ventas", 2000.00)
];

const egresos = [
    new Egreso("Alquiler", 1500.00),
    new Egreso("Compras Oficina", 200.00)
];

let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
};

let totalIngresos = () => {
    let totalIngreso = 0;
    for (let ingreso of ingresos) {
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
};

let totalEgresos = () => {
    let totalEgreso = 0;
    for (let egreso of egresos) {
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
};

let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
};

const formatoMoneda = (valor) => {
    return valor.toLocaleString("es-GT", { style: "currency", currency: "GTQ" });
};

const formatoPorcentaje = (valor) => {
    return (valor * 100).toFixed(2) + '%';
};

const cargarIngresos = () => {
    let ingresosHTML = "";
    for (let ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
};

const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${ingreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn" onclick="eliminarIngreso(${ingreso.id})">
                        <ion-icon name="trash-sharp"></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    `;
    return ingresoHTML;
};

const cargarEgresos = () => {
    let egresosHTML = "";
    for (let egreso of egresos) {
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById("lista-egresos").innerHTML = egresosHTML;
};

const crearEgresoHTML = (egreso) => {
    let egresoHTML = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${egreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
                <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor / totalIngresos())}</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn" onclick="eliminarEgreso(${egreso.id})">
                        <ion-icon name="trash-sharp"></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    `;
    return egresoHTML;
};

const eliminarIngreso = (id) => {
    let indexEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(indexEliminar, 1);
    cargarApp();
};

const eliminarEgreso = (id) => {
    let indexEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indexEliminar, 1);
    cargarApp();
};

const agregarDato = () => {
    let forma = document.forms["forma"];
    let tipo = document.getElementById("tipo").value;
    let descripcion = document.getElementById("descripcion").value;
    let valor = parseFloat(document.getElementById("valor").value);
    
    if (descripcion !== "" && !isNaN(valor) && valor > 0) {
        if (tipo === "ingreso") {
            ingresos.push(new Ingreso(descripcion, valor));
            cargarCabecero();
            cargarIngresos();
        } else if (tipo === "egreso") {
            egresos.push(new Egreso(descripcion, valor));
            cargarCabecero();
            cargarEgresos();
        }
    }
};

document.addEventListener('DOMContentLoaded', (event) => {
    cargarApp();
});
