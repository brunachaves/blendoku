function allowDrop(ev) {
    if (ev.toElement.className != 'color-box') {
        ev.preventDefault();
    }
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
    return [255, 255, 255].map((number) => Math.floor(Math.random() * number));
}

function createInterval(startColor, endColor, level) {
    let interval = [];
    for (let i = 0; i < level - 1; i++) {
        interval[i] = (parseInt(endColor[i]) - parseInt(startColor[i])) / level;
    }
    return interval;
}

function createColorArray(startColor, interval, level) {
    var colorArray = [startColor.join(',')];

    for (var i = 0; i < level; i++) {
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
    return array.sort(() => Math.random() - Math.random());
}

function setBackgroundAndRemoveDropEvent(box, index, colorArray) {
    box.style.backgroundColor = `rgb(${colorArray[index]})`;
}

function addColorBoxes(level) {
    let draggableItems = document.getElementsByClassName('draggable-items')[0];

    for (let i = 0; i < level; i++) {
        let div = document.createElement('div');
        div.id = `color-${i}`;
        div.className = 'color-box';
        div.draggable = true;
        div.ondragstart = drag;
        div.ondragend = handleDragEnd;
        draggableItems.appendChild(div);
    }
}

function addGridBoxes(level) {
    let dropTargets = document.getElementsByClassName('drop-targets')[0];
    for (let i = 0; i < level; i++) {
        let div = document.createElement('div');
        div.className = 'box';
        div.ondrop = drop;
        div.ondragover = allowDrop;
        dropTargets.appendChild(div);
    }
}
function setLevelIndicator(level) {
    let levelIndicator = document.getElementById('level');
    levelIndicator.textContent = `Level ${level}`;
}

function initializeBoxes(level) {
    addColorBoxes(level);
    addGridBoxes(level);
    setLevelIndicator(level);
}

function initializeGame() {
    let level = 5;
    initializeBoxes(level);

    var firstColor = createRandomColor();
    var lastColor = createRandomColor();

    var interval = createInterval(firstColor, lastColor, level);

    let colorArray = createColorArray(firstColor, interval, level);

    let colorBoxes = Array.from(document.querySelectorAll('.color-box'));

    colorBoxes = shuffle(colorBoxes);

    colorBoxes.forEach((box, index) =>
        setBackgroundAndRemoveDropEvent(box, index, colorArray)
    );
}

initializeGame();
