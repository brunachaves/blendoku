function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    event.target.parentElement.ondrop = drop;
    ev.dataTransfer.setData('Text', ev.target.id);
}

function drop(ev) {
    let data = ev.dataTransfer.getData('Text');
    ev.target.appendChild(document.getElementById(data));
    ev.preventDefault();
}

function handleDragEnd(event) {
    event.target.parentElement.ondrop = null;
}

function createSeedColor() {
    let number = Math.floor(Math.random() * 255);
    return [number, number, number];
}

function createRandomInterval() {
    return Math.floor(Math.random() * 50);
};

function setColorAndIncrease(box, seedColor, interval) {
    box.style.backgroundColor = `rgb(${seedColor.join(', ')})`;
    seedColor[0] = seedColor[0] + interval[0];
    seedColor[1] = seedColor[1] + interval[1];
    seedColor[2] = seedColor[2] + interval[2];
};

const interval = [
    createRandomInterval(),
    createRandomInterval(),
    createRandomInterval(),
];

let colorArray = createSeedColor();
let colorBoxes = Array.from(document.querySelectorAll('.color-box'));

function shuffle(array)  { 
    return array.sort(() => Math.random() - 0.5);
};

colorBoxes = shuffle(colorBoxes);


colorBoxes.forEach((box) => setColorAndIncrease(box, colorArray, interval));
