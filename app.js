function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.target.parentElement.ondrop = drop;
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

function createRandomColor() {
    let randomColor = [];
    for (var i = 0; i < 3; i++) {
        randomColor[i] = Math.floor(Math.random() * 255);
    }
    return randomColor;
}

function createInterval(startColor, endColor) {
    let interval = [];
    for (let i = 0; i < 3; i++) {
        interval[i] = (parseInt(endColor[i]) - parseInt(startColor[i])) / 4;
    }
    return interval;
}

function createColorArray(startColor, interval) {
    var colorArray = [startColor.join(',')];
    console.log(startColor);

    for (var i = 0; i < 4; i++) {
        var newColor = [];
        newColor[0] = Math.floor(startColor[0] + interval[0]);
        newColor[1] = Math.floor(startColor[1] + interval[1]);
        newColor[2] = Math.floor(startColor[2] + interval[2]);
        startColor = newColor;
        colorArray.push(newColor.join(','));
    }
    return colorArray;
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

var firstColor = createRandomColor();

var lastColor = createRandomColor();

var interval = createInterval(firstColor, lastColor);

var colorArray = createColorArray(firstColor, interval);

let colorBoxes = Array.from(document.querySelectorAll('.color-box'));

colorBoxes = shuffle(colorBoxes);

colorBoxes.forEach(
    (box, index) => (box.style.backgroundColor = `rgb(${colorArray[index]})`)
)
