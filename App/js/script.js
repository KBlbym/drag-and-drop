import  {data} from "./animals.js";
import  {utils} from "./utils.js";

//Declaracion de los variales globales.
let dragZone = document.getElementById("dragContainer");
let dropZone = document.getElementById("dropContainer");
let categoryList = new Map();

//Ordenar el array aleatoriamente
data.sort((a,b) => {return .5 - Math.random() });
let dataCopy = utils.take(3,data);
dataCopy.forEach(item => {
    categoryList.set(item.category, item);
});
//Crear los elementos html
utils.createElement("div", dragZone, dataCopy);

utils.createCategoryElement("div", dropZone, categoryList);
let categoriestags = document.querySelectorAll(".category-body");
categoriestags.forEach(item => {
    //El evento si despara cuando el raton entra en el contenidor
    item.addEventListener("dragenter", dragEnter);
    
    //El evento se dispara cuando se sale de contenidor
    item.addEventListener("dragleave", dragLeave);

    //Se dispara cuando mientras este en el contenidor
    item.addEventListener("dragover", dragOver);

    item.addEventListener("drop", droped);
});
//#region (Eventos de drag zone) 
//El evento que se dispara cuando se empieza el dragable
dragZone.addEventListener("dragstart", e =>{
    e.dataTransfer.setData("id", e.target.id);
});

//El evento dragend si dispara cuando soltamos el elemento
dragZone.addEventListener("dragend", e =>{
    e.preventDefault();
});

//#endregion

//#region (eventos de drop zone)
function dragEnter(e) {
    e.preventDefault();
}

function dragLeave(e) {
    e.target.classList.remove("dragover");
    
}
function dragOver(e) {
    e.preventDefault();
    e.target.classList.add("dragover");
    
}
function droped(e) {
    let dropBox = e.currentTarget;
    let id = e.dataTransfer.getData("id");
    let dragetElement = document.getElementById(id);
    

    /*verficar son el elemento arrastrado coincide con la categoria
    tenemos un atributo del elemento llamado data-category,
    y la caja de categoría tiene un id con el nombre de la categoria*/

    // Obtener el valor del atributo data-category
    var categoria = dragetElement.getAttribute("data-category");

    if(categoria === dropBox.id){
        dropBox.appendChild(dragetElement);
    }
    let dragItemRest =dragZone.querySelectorAll(`.${dragetElement.className}`);
    if(dragItemRest.length <= 0){
        utils.createElement("div", dragZone, [], "¡Has Ganado!", "success");
    }
    dropBox.classList.remove("dragover");
    e.target.classList.remove("dragover");
}
//endregion




















