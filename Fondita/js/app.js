var menuCompleto = JSON.parse(localStorage.getItem("menu")) || [];
var ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];
var propina = 0, subtotal = 0, total = 0, porcentaje = 0;

const guardarMenu = () => {
    menuCompleto = JSON.parse(localStorage.getItem("menu")) || [];
    var des = document.getElementById("des").value;
    var costo = parseFloat(document.getElementById("cos").value);
    if (des.trim() === "" || isNaN(costo) || document.getElementById("cos").value === "" || costo <= 0) {
        Swal.fire({ icon: "error", title: "ERROR", text: "Datos Erroneos" });
        return;
    }
    let menu = { des, costo };
    menuCompleto.push(menu);
    localStorage.setItem("menu", JSON.stringify(menuCompleto));
    cargarMenu();
}

const cargarMenu = () => {
    let index = 0;
    menuCompleto = JSON.parse(localStorage.getItem("menu")) || [];
    let menuHTML = ``;
    menuCompleto.map(m => {
        menuHTML += `
        <button type="button" onclick="add(${index})" class="list-group-item  d-flex justify-content-between align-items-center">${m.des}
        <span class="badge text-bg-primary rounded-pill">$ ${parseFloat(m.costo).toFixed(2)}</span>
        </button>`;
        index++;
    });
    document.getElementById("listaMenu").innerHTML = menuHTML;
    cargarOrdenes();
}

const add = (indexMenu) => {
    ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];
    menuCompleto = JSON.parse(localStorage.getItem("menu")) || [];
    let indexActual = -1
    indexActual = ordenes.findIndex((orden) => orden.index === indexMenu);
    if (indexActual == -1) {
        let orden = { index: indexMenu, cantidad: 1 }
        ordenes.push(orden);
    } else {
        ordenes[indexActual].cantidad++;
    }
    localStorage.setItem("ordenes", JSON.stringify(ordenes));
    cargarOrdenes();
}

const cargarOrdenes = () => {
    subtotal = 0
    let indexOrden = 0;
    ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];
    menuCompleto = JSON.parse(localStorage.getItem("menu")) || [];
    let divOrden = document.getElementById("orden");
    let ordenHTML = ``
    if (ordenes.lenght == 0) {
        divOrden.innerHTML = '<h2 class="text-center"><b>NO HAY ORDENES </b<>/h2>'
        document.getElementById("subtotal").innerHTML = '$ 0.00'
        document.getElementById("propina").innerHTML = '$ 0.00'
        document.getElementById("total").innerHTML = '$ 0.00'
    } else {
        ordenes.map(o => {
            ordenHTML += `
            <div class="list-group-item list-group-item-action border my-2">
            <div class="d-flex w-100 justify-content-between">
            <h4 class="align-middle">${menuCompleto[o.index].des}</h4>
            </div>
            <div class="d-flex w-100 justify-content-between">
            <h4 class="align-bottom">cantidad:<b>${o.cantidad}</b></h4>
            <h4 class="align-middle"><b>$ ${(parseFloat(menuCompleto[o.index].costo) * parseFloat(o.cantidad)).toFixed(2)}</b></h4>
            
            <button class="btn btn-outline-danger my-1" onclick="del(${indexOrden})"><i class="bi bi-trash"></i></button>
            </div>
            </div>
            `
indexOrden++;
subtotal+=(parseFloat(menuCompleto[o.index].costo)*parseFloat(o.cantidad));
        })
        divOrden.innerHTML=ordenHTML;
        propina=((porcentaje/100)*subtotal);
        document.getElementById("subtotal").innerHTML=`$ ${subtotal.toFixed(2)}`
        document.getElementById("propina").innerHTML=`$ ${propina.toFixed(2)}`
        document.getElementById("total").innerHTML=`$ ${(subtotal+propina).toFixed(2)}`
    }

}

const calcularPropina=()=>{
    let radioPropina=document.querySelector('input[name="propina"]:checked');
if(radioPropina){
    porcentaje=parseFloat(radioPropina.value)
}
cargarOrdenes();

}
const del=(index)=>{
    ordenes=JSON.parse(localStorage.getItem("ordenes"))||[];
    Swal.fire({
        title: " Esta seguro de eliminar??",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "SI",
        denyButtonText: `NO`,
        cancelButtonColor: "#dc3545",
        confirmButtonColor: "#198754",
        denyButtonColor: "#dc3545",
    }).then((result) => {
        if(result.isConfirmed){
            Swal.fire("eliminado","","success");
            ordenes.splice(index,1);
            localStorage.setItem("ordenes", JSON.stringify(ordenes));
            cargarOrdenes();
        }   
    });
   
}
const terminar=()=>{
 Swal.fire({
    title: " Esta seguro de salir??",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "SI",
    denyButtonText: `NO`,
    cancelButtonColor: "#dc3545",
    confirmButtonColor: "#198754",
    denyButtonColor: "#dc3545",
}).then((result) => {
    if(result.isConfirmed){
        localStorage.removeItem("ordenes");
        subtotal=0;
        propina=0;
        total=0;
        cargarOrdenes();
        Swal.fire("RESET EXITOSO","","success");
    }
   
});
}
const terminar2=()=>{
    Swal.fire({
       title: " Esta seguro de cancelar??",
       showDenyButton: true,
       showCancelButton: false,
       confirmButtonText: "SI",
       denyButtonText: `NO`,
       cancelButtonColor: "#dc3545",
       confirmButtonColor: "#198754",
       denyButtonColor: "#dc3545",
   }).then((result) => {
       if(result.isConfirmed){
           localStorage.removeItem("ordenes");
           subtotal=0;
           propina=0;
           total=0;
           cargarOrdenes();
           Swal.fire("Cancelado","","success");
       }
      
   });
   }
cargarMenu();