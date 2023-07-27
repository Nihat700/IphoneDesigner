'use strict';

const phone = document.querySelector('.phone')
const items = document.querySelectorAll('.item.original');
let draggedElement = null;

items.forEach(item => {
    item.onmousedown = function (e) {
        draggedElement = item.cloneNode(true);
        draggedElement.style.position = 'absolute'
        const rect = item.getBoundingClientRect();
        draggedElement.style.top = rect.top + 'px';
        draggedElement.style.left = rect.left + 'px';
        draggedElement.classList.remove('original')
        document.body.append(draggedElement);
        draggedElement.onmousedown = itemMouseDownHandler;
        draggedElement.oncontextmenu = rightClickHandler; 

    }
})


function itemMouseDownHandler(e) {
    draggedElement = this;
    const rect = draggedElement.getBoundingClientRect();
    draggedElement.style.top = rect.top + 'px';
    draggedElement.style.left = rect.left + 'px';
}

function rightClickHandler(e){
    e.preventDefault();
    this.remove();
    draggedElement = null;
} 

document.onmousemove = function (e) {
    if (draggedElement) {
        const rect = draggedElement.getBoundingClientRect();
        draggedElement.style.top = e.clientY - rect.height / 2 + 'px';
        draggedElement.style.left = e.clientX - rect.width / 2 + 'px';
    }
}

document.onmouseup = function (e) {
    draggedElement = null
}

const modelInput = document.querySelector('#model');
const modelName = document.querySelector('.phone-model');

modelInput.addEventListener('input', function(e){
    modelName.textContent = e.target.value;
})

const colorClass = {
    '1': 'black',
    '2': 'green',
    '3': 'red',
    '4': 'pink',
    '5': 'gold'
};

const colorSelect = document.querySelector('#color');
let currentClass = 'black';
colorSelect.addEventListener('change', function(e){
    const value = e.target.value;
    const newColorClass = colorClass[value];
    phone.classList.remove(currentClass);
    phone.classList.add(newColorClass);
    currentClass = newColorClass;
})