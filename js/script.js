import  {data} from "./animals.js";
import  {utils} from "./utils.js";

//Declaracion de los variales globales.
let dragZone = document.getElementById("dragContainer");
let dropZone = document.getElementById("dropContainer");
let categoryList = new Map();

//Ordenar el array aleatoriamente
data.sort((a,b) => {return .5 - Math.random() });
let dataCopy = utils.take(10,data);
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

    item.addEventListener("drop", handleDrop);
});
//#region (Eventos de drag zone) 
//El evento que se dispara cuando se empieza el dragable
dragZone.addEventListener("dragstart", e =>{
    e.dataTransfer.setData("id", e.target.id);
});

 // Obtener todos los elementos con la clase img-item
const dragItems = document.querySelectorAll('.img-item');

// Asignar eventos táctiles a cada elemento
dragItems.forEach(item => {
    item.addEventListener('touchstart', handleTouchStart);
    item.addEventListener('touchmove', handleTouchMove);
    item.addEventListener('touchend', handleTouchEnd);
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
function handleDrop(e) {
    let dropBox = e.currentTarget;
    let id = e.dataTransfer.getData("id");
    let dragetElement = document.getElementById(id);
    endDrop(dragetElement, dropBox);
}
//#endregion

//#region (Touch Events)
 // Función para manejar el inicio del arrastre táctil
 function handleTouchStart(e) {
    const touch = e.touches[0];
    const target = touch.target;

    if (target.draggable) {
        e.preventDefault(); // Evitar el desplazamiento predeterminado en dispositivos móviles
        // Guardar la posición inicial del elemento
        target.startX = touch.clientX;
        target.startY = touch.clientY;
    }
}

// Función para manejar el movimiento durante el arrastre táctil
function handleTouchMove(e) {
    const touch = e.touches[0];
    const target = touch.target;

    if (target.draggable) {
        e.preventDefault(); // Evitar el desplazamiento predeterminado en dispositivos móviles

        // Calcular la distancia recorrida desde la posición inicial
        const deltaX = touch.clientX - target.startX;
        const deltaY = touch.clientY - target.startY;

        // Aplicar la transformación para mover el elemento
        target.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    }
}

// Función para manejar el final del arrastre táctil
function handleTouchEnd(e) {
    const touch = e.changedTouches[0];
    const dragElement = touch.target;
    
    if (dragElement.draggable) {
        const dropZone = findDropZone(touch.clientX, touch.clientY);
       endDrop(dragElement, dropZone);
    }
}
//#endregion
//function para terminar el drop
function endDrop(dragElement, dropZone) {
     // Obtener el valor del atributo data-category
     const categoria = dragElement.getAttribute("data-category");
     if (categoria === dropZone?.id) {
         dropZone.appendChild(dragElement);
     }
    let dragItemRest = dragZone.querySelectorAll(`.${dragElement.className}`);
    if(dragItemRest.length <= 0){
        utils.createElement("div", dragZone, [], "¡Has Ganado!", "success");
    }
    dropZone.classList.remove("dragover");
    dragElement.style.transform = '';
}
// Función para encontrar la zona de destino del elemento
function findDropZone(x, y) {
    const dropZones = document.querySelectorAll('.category-body');
    for (const dropZone of dropZones) {
        const rect = dropZone.getBoundingClientRect();
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
            return dropZone;
        }
    }
    return null;
}















