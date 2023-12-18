export const utils = {
    take(n, array) {
        return array.splice(0,n);
    },
    createElement(tagName, parentElement , array = [], text = "", classList ="") {
        let el;
        array.forEach(item => {
            el = document.createElement(tagName);
            el.innerHTML = `&#${item.code}`;
            el.id = item.code;
            el.title = item.name;
            el.draggable = true;
            el.dataset.category = item.category;
            el.className = "img-item";
            parentElement.appendChild(el);
        });
        if(array.length <= 0 ){
           el = document.createElement(tagName);
           el.classList.add(classList);
           el.innerHTML = text;
           parentElement.appendChild(el);
        }
        
    },
    createCategoryElement(tagName,  parentElement, array= []) {
        array.forEach(item => {
            let el = document.createElement(tagName);
            el.className = "category-item";
            let header = document.createElement("header");
            header.innerHTML = item.category;

            let body = document.createElement("div");
            body.className = "category-body";
            body.id = item.category;
            el.appendChild(header);
            el.appendChild(body);
            parentElement.appendChild(el);
        });
    }
}