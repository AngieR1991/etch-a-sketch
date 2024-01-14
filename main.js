const DEFAULT_COLOR = '#000000'
const DEFAULT_MODE = 'color'
const DEFAULT_PIXEL_SIZE = 16

let color = DEFAULT_COLOR
let mode = DEFAULT_MODE
let size = DEFAULT_PIXEL_SIZE

function setColor(newColor)
{
    color = newColor
}

function setMode(newMode)
{
    activateButton(newMode)
    mode = newMode
}

function setSize(newSize)
{
    size = newSize
    size = newSize
}


const colorChooser = document.getElementById('colorChooser')
const colorBtn = document.getElementById('color')
const rainbowBtn = document.getElementById('rainbow')
const eraserBtn =document.getElementById('eraser')
const clearBtn = document.getElementById('clear');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');
const grid = document.getElementById('grid');




colorChooser.oninput = (e) => setColor(e.target.value);
colorBtn.onclick = () => setMode('color');
rainbowBtn.onclick = () => setMode('rainbow');
eraserBtn.onclick = () => setMode('eraser');
clearBtn.onclick = () => resetGrid();
sizeSlider.onmousemove = (e) => updateSize(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);


let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);



function changeSize(value)
{
    setSize(value)
    updateSize(value)
    resetGrid()
}


function updateSize(value)
{
    sizeValue.innerHTML = `${value} x ${value}`
}

function resetGrid()
{
    clearGrid()
    setupGrid(size)
}
    
function clearGrid()
{
    grid.innerHTML = ''
}
    
function setupGrid(size)
{
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeats(${size}, 1fr)`

    for ( let i = 0; i < size*size; i++)
    {
        const gridElement = document.createElement('div')
        gridElement.classList.add('grid-element')
        gridElement.addEventListener('mouseover', colorChange)
        gridElement.addEventListener('mousedown', colorChange)
        grid.appendChild(gridElement)
    }
}
    
function colorChange(e)
{
    if(e.type == 'mouseover' && !mouseDown) return

    if(mode == 'rainbow')
    {
        const randomR = Math.floor(Math.random()*256)
        const randomG = Math.floor(Math.random()*256)
        const randomB = Math.floor(Math.random()*256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    }
    else if(mode == 'color')
    {
        e.target.style.backgroundColor = color;
    }
    else if(mode == 'eraser')
    {
        e.target.style.backgroundColor = '#FEFEFE';
    }
}

function activateButton(newMode)
{
    if ( mode == 'rainbow')
    {
        rainbowBtn.classList.remove('active');
    }
    else if (mode == 'color')
    {
        colorBtn.classList.remove('active');
    }
    else if (mode == 'eraser')
    {
        eraserBtn.classList.remove('active');
    }

    if(newMode == 'rainbow')
    {
        rainbowBtn.classList.add('active');
    }
    else if(newMode == 'color')
    {
        colorBtn.classList.add('active');
    }
    else if(newMode == 'eraser')
    {
        eraserBtn.classList.add('active');
    }
}

window.onload = () =>{
    setupGrid(DEFAULT_PIXEL_SIZE);
    activateButton(DEFAULT_MODE);
}

