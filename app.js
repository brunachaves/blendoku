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

    if (checkGameIsFinished()) {
        alert('Good job you finished the game!');
        // This will generate a warning complaing about the event handler taking too long
        // TODO: change this alert to another way of showing success
        initializeGame();
    }
}

function handleDragEnd(event) {
    event.target.parentElement.ondrop = null;
}

function createRandomColor() {
    return [255, 255, 255].map((number) => Math.floor(Math.random() * number));
}

function createInterval(startColor, endColor, level) {
    let interval = [];
    for (let i = 0; i < level - 2; i++) {
        interval[i] = (parseInt(endColor[i]) - parseInt(startColor[i])) / level;
    }
    return interval;
}

function createColorArray(startColor, interval, level) {
    var colorArray = [startColor.join(',')];

    for (var i = 0; i < level - 1; i++) {
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
    draggableItems.innerHTML = '';
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
    dropTargets.innerHTML = '';
    for (let i = 0; i < level; i++) {
        let div = document.createElement('div');
        div.className = 'box';
        div.ondrop = drop;
        div.ondragover = allowDrop;
        dropTargets.appendChild(div);
    }
}

function initializeBoxes(level) {
    addColorBoxes(level);
    addGridBoxes(level);
}

function generateColorArrayFromGame() {
    let colorGrid = document.getElementsByClassName('drop-targets')[0];
    let colors = Array.from(colorGrid.getElementsByClassName('color-box'));
    let colorsArray = colors.map((box) =>
        box.style.backgroundColor
            .split('(')[1]
            .split(')')[0]
            .replaceAll(' ', '')
    );
    return colorsArray;
}

function checkGameIsFinished() {
    let gameResult = JSON.stringify(generateColorArrayFromGame());
    let gameResultReverse = JSON.stringify(
        generateColorArrayFromGame().reverse()
    );
    let colorArrayStr = JSON.stringify(window.colorArray);

    return gameResult == colorArrayStr || gameResultReverse == colorArrayStr;
}

function initializeGame() {
    var level = 5;
    initializeBoxes(level);

    window.firstColor = createRandomColor();
    window.lastColor = createRandomColor();

    window.interval = createInterval(
        window.firstColor,
        window.lastColor,
        level
    );

    window.colorArray = createColorArray(
        window.firstColor,
        window.interval,
        level
    );

    window.colorBoxes = Array.from(document.querySelectorAll('.color-box'));

    colorBoxes = shuffle(colorBoxes);

    colorBoxes.forEach((box, index) =>
        setBackgroundAndRemoveDropEvent(box, index, colorArray)
    );
}

initializeGame();
