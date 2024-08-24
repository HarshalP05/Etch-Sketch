const container = document.querySelector("#sketch");
const maincontainer=document.querySelector(".maincontainer")
let isLeftButtonDown = false;
let isRightButtonDown = false;

let gridcolor = true; // true for color, false for black & white
let gridSize = 16; // Default grid size

function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function createGrid(size) {
    container.innerHTML = "";

    for (let i = 0; i < size; i++) {
        const containerRow = document.createElement("div");
        containerRow.style.display = "flex";
        containerRow.style.flex = "1 1 100%";

        for (let j = 0; j < size; j++) {
            const gridItem = document.createElement("div");
            gridItem.style.flex = "1 1 100%";
            gridItem.style.border = "solid 1px black";
            gridItem.style.background = "rgb(0, 0, 0, 0)"; // Start with transparent background

            gridItem.addEventListener("mouseover", () => {
                if (isLeftButtonDown) {
                    let opacity = parseFloat(gridItem.style.background.match(/rgba\(0, 0, 0, (\d+\.\d+)\)/)?.[1] || "0");
                        opacity = Math.min(opacity + 0.1, 1);
                    if (gridcolor) {
                        
                        gridItem.style.background = generateRandomColor();
                    } else {
                        gridItem.style.background = `rgba(0, 0, 0, ${opacity})`;
                    }
                } else if (isRightButtonDown) {
                    gridItem.style.background = "rgb(0, 0, 0, 0)"; // Clear the background color
                }
            });

            containerRow.appendChild(gridItem);
        }

        container.appendChild(containerRow);
    }
}

// Function to handle mouse button state changes
document.addEventListener("mousedown", (event) => {
    if (event.button === 0) { // Left mouse button
        isLeftButtonDown = true;
    } else if (event.button === 2) { // Right mouse button
        isRightButtonDown = true;
    }
});

document.addEventListener("mouseup", (event) => {
    if (event.button === 0) { // Left mouse button
        isLeftButtonDown = false;
    } else if (event.button === 2) { // Right mouse button
        isRightButtonDown = false;
    }
});

document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
});

// Function to handle color mode toggle
function RGB() {
    const colorButton = document.getElementById("colorbutton");
    const bwButton = document.getElementById("bwbutton");

    colorButton.addEventListener("click", () => {
        gridcolor = true;
    });

    bwButton.addEventListener("click", () => {
        gridcolor = false;
    });
}

// Function to clear grid
function clearGrid() {
    createGrid(gridSize); // Recreate the grid with the current size
}

// Initialize functions
RGB();
createGrid(gridSize);

// Resize grid size when user clicks the resize button
const resizeButton = document.querySelector("#button");

resizeButton.addEventListener("click", () => {
    let newSize = parseInt(document.getElementById('num').value);

    if (newSize !== null) {
        newSize = parseInt(newSize);

        if (isNaN(newSize) || newSize <= 0 || newSize > 100) {
            alert("Invalid input! Please enter a number between 1 and 100");
        } else {
            gridSize = newSize;
            createGrid(gridSize);
        }
    }
});

// Set up event listener for the clear button
const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", () => {
    clearGrid();
});

function sizechange() {
const sizeSelect = document.getElementById("sizeSelect");
sizeSelect.addEventListener("change", (event) => {
    const [width, height] = event.target.value.split('x').map(Number);
    container.style.width = `${width}px`;
    container.style.height = `${height}px`;
    if(width>300 && height>300) {
        maincontainer.style.width = `${width}px`;
        maincontainer.style.height = `${height}px`; }

}); }

sizechange();