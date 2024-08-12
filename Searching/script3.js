const visualizerSpace = document.getElementById("visualizer-space");
const generateArrayButton = document.getElementById("generateArray");
const arraySizeSlider = document.getElementById("arraySize");
const arraySizeValue = document.getElementById("arraySizeValue");
const speedSlider = document.getElementById("speed");
const speedValue = document.getElementById("speedValue");
const refreshButton = document.getElementById("refresh");

document.getElementById("linearSearch").addEventListener("click", linearSearch);
document.getElementById("binarySearch").addEventListener("click", binarySearch);
document.getElementById("ternarySearch").addEventListener("click", ternarySearch);
document.getElementById("jumpSearch").addEventListener("click", jumpSearch);
document.getElementById("interpolationSearch").addEventListener("click", interpolationSearch);
document.getElementById("exponentialSearch").addEventListener("click", exponentialSearch);

let array = [];
let originalArray = []; // Store the original unsorted array
let speed = 200; // Default speed (medium)
let delay = speed;

// Event listener for the speed slider
speedSlider.addEventListener("input", updateSpeed);

// Event listener for the array size slider
arraySizeSlider.addEventListener("input", () => {
    arraySizeValue.textContent = arraySizeSlider.value;
    generateArray(arraySizeSlider.value);
});

// Event listener for the generate array button
generateArrayButton.addEventListener("click", () => {
    generateArray(arraySizeSlider.value);
});

// Event listener for the refresh button
refreshButton.addEventListener("click", () => {
    window.location.reload();
});

// Update delay based on selected speed
function updateSpeed() {
    const speedLevel = speedSlider.value;
    speed = speedLevel === '1' ? 250 : speedLevel === '2' ? 200 : 150; // Adjusted speeds
    updateSpeedValue();
}

// Update the displayed value of the speed
function updateSpeedValue() {
    speedValue.textContent = speedSlider.value;
}

// Generate array based on the provided size
function generateArray(size) {
    array = [];
    originalArray = []; // Reset original array
    visualizerSpace.innerHTML = "";
    const barWidth = Math.max(2, Math.floor(visualizerSpace.clientWidth / size)); // Adjust bar width

    for (let i = 0; i < size; i++) {
        const value = Math.floor(Math.random() * 100) + 1;
        array.push(value);
        originalArray.push(value); // Store original value

        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.width = `${barWidth}px`; // Set bar width
        bar.style.height = `${value * 4}px`;
        bar.textContent = value;
        visualizerSpace.appendChild(bar);
    }
}

// Lock/Unlock buttons during algorithm execution
function toggleButtons(disabled) {
    const buttons = document.querySelectorAll(".algorithm-buttons button");
    buttons.forEach(button => {
        button.disabled = disabled;
    });
    generateArrayButton.disabled = disabled;
    arraySizeSlider.disabled = disabled;
    speedSlider.disabled = disabled;
}

// Function to highlight bars
function highlight(index, color) {
    const bars = document.querySelectorAll(".bar");
    bars[index].style.backgroundColor = color;
}

// Sleep function to create a delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Linear Search Algorithm
async function linearSearch() {
    toggleButtons(true);
    const target = prompt("Enter the value to search:");
    if (isNaN(target)) {
        alert("Please enter a valid number.");
        toggleButtons(false);
        return;
    }

    for (let i = 0; i < array.length; i++) {
        highlight(originalArray.indexOf(array[i]), "red"); // Highlight based on original index
        await sleep(delay);
        if (array[i] == target) {
            highlight(originalArray.indexOf(array[i]), "green"); // Highlight found element
            toggleButtons(false);
            return;
        }
        highlight(originalArray.indexOf(array[i]), "#3498db"); // Reset highlight
    }

    alert("Value not found");
    toggleButtons(false);
}

// Binary Search Algorithm
async function binarySearch() {
    toggleButtons(true);
    const target = parseInt(prompt("Enter the value to search:"), 10); // Ensure integer input
    if (isNaN(target)) {
        alert("Please enter a valid number.");
        toggleButtons(false);
        return;
    }

    let low = 0;
    let high = array.length - 1;
    const sortedArray = [...array].sort((a, b) => a - b); // Sort a copy of the array

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        highlight(originalArray.indexOf(sortedArray[mid]), "red"); // Highlight based on original index
        await sleep(delay);

        if (sortedArray[mid] === target) {
            highlight(originalArray.indexOf(sortedArray[mid]), "green"); // Highlight found element
            toggleButtons(false);
            return;
        } else if (sortedArray[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }

        highlight(originalArray.indexOf(sortedArray[mid]), "#3498db"); // Reset highlight
    }

    alert("Value not found");
    toggleButtons(false);
}

// Ternary Search Algorithm
async function ternarySearch() {
    toggleButtons(true);
    const target = parseInt(prompt("Enter the value to search:"), 10); // Ensure integer input
    if (isNaN(target)) {
        alert("Please enter a valid number.");
        toggleButtons(false);
        return;
    }

    const sortedArray = [...array].sort((a, b) => a - b); // Sort a copy of the array
    let low = 0;
    let high = sortedArray.length - 1;

    while (low <= high) {
        const mid1 = low + Math.floor((high - low) / 3);
        const mid2 = high - Math.floor((high - low) / 3);
        highlight(originalArray.indexOf(sortedArray[mid1]), "red");
        highlight(originalArray.indexOf(sortedArray[mid2]), "red");
        await sleep(delay);

        if (sortedArray[mid1] === target) {
            highlight(originalArray.indexOf(sortedArray[mid1]), "green");
            toggleButtons(false);
            return;
        } else if (sortedArray[mid2] === target) {
            highlight(originalArray.indexOf(sortedArray[mid2]), "green");
            toggleButtons(false);
            return;
        } else if (target < sortedArray[mid1]) {
            high = mid1 - 1;
        } else if (target > sortedArray[mid2]) {
            low = mid2 + 1;
        } else {
            low = mid1 + 1;
            high = mid2 - 1;
        }

        highlight(originalArray.indexOf(sortedArray[mid1]), "#3498db");
        highlight(originalArray.indexOf(sortedArray[mid2]), "#3498db");
    }

    alert("Value not found");
    toggleButtons(false);
}

// Jump Search Algorithm
async function jumpSearch() {
    toggleButtons(true);
    const target = parseInt(prompt("Enter the value to search:"), 10); // Ensure integer input
    if (isNaN(target)) {
        alert("Please enter a valid number.");
        toggleButtons(false);
        return;
    }

    const sortedArray = [...array].sort((a, b) => a - b); // Sort a copy of the array
    const step = Math.floor(Math.sqrt(sortedArray.length));
    let prev = 0;
    let curr = step;

    while (curr < sortedArray.length && sortedArray[curr] < target) {
        for (let i = prev; i < curr; i++) {
            highlight(originalArray.indexOf(sortedArray[i]), "red");
            await sleep(delay);
            highlight(originalArray.indexOf(sortedArray[i]), "#3498db");
        }
        prev = curr;
        curr += step;
    }

    for (let i = prev; i < Math.min(curr, sortedArray.length); i++) {
        highlight(originalArray.indexOf(sortedArray[i]), "red");
        await sleep(delay);
        if (sortedArray[i] === target) {
            highlight(originalArray.indexOf(sortedArray[i]), "green");
            toggleButtons(false);
            return;
        }
        highlight(originalArray.indexOf(sortedArray[i]), "#3498db");
    }

    alert("Value not found");
    toggleButtons(false);
}

// Interpolation Search Algorithm
async function interpolationSearch() {
    toggleButtons(true);
    const target = parseInt(prompt("Enter the value to search:"), 10); // Ensure integer input
    if (isNaN(target)) {
        alert("Please enter a valid number.");
        toggleButtons(false);
        return;
    }

    const sortedArray = [...array].sort((a, b) => a - b); // Sort a copy of the array
    let low = 0;
    let high = sortedArray.length - 1;

    while (low <= high && target >= sortedArray[low] && target <= sortedArray[high]) {
        if (low === high) {
            if (sortedArray[low] === target) {
                highlight(originalArray.indexOf(sortedArray[low]), "green");
                toggleButtons(false);
                return;
            }
            break;
        }

        const pos = low + Math.floor(((target - sortedArray[low]) * (high - low)) / (sortedArray[high] - sortedArray[low]));
        highlight(originalArray.indexOf(sortedArray[pos]), "red");
        await sleep(delay);

        if (sortedArray[pos] === target) {
            highlight(originalArray.indexOf(sortedArray[pos]), "green");
            toggleButtons(false);
            return;
        } else if (sortedArray[pos] < target) {
            low = pos + 1;
        } else {
            high = pos - 1;
        }

        highlight(originalArray.indexOf(sortedArray[pos]), "#3498db");
    }

    alert("Value not found");
    toggleButtons(false);
}

// Exponential Search Algorithm
async function exponentialSearch() {
    toggleButtons(true);
    const target = parseInt(prompt("Enter the value to search:"), 10); // Ensure integer input
    if (isNaN(target)) {
        alert("Please enter a valid number.");
        toggleButtons(false);
        return;
    }

    const sortedArray = [...array].sort((a, b) => a - b); // Sort a copy of the array
    if (sortedArray[0] === target) {
        highlight(originalArray.indexOf(sortedArray[0]), "green");
        toggleButtons(false);
        return;
    }

    let i = 1;
    while (i < sortedArray.length && sortedArray[i] <= target) {
        highlight(originalArray.indexOf(sortedArray[i]), "red");
        await sleep(delay);
        highlight(originalArray.indexOf(sortedArray[i]), "#3498db");
        i = i * 2;
    }

    let low = Math.floor(i / 2);
    let high = Math.min(i, sortedArray.length - 1);

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        highlight(originalArray.indexOf(sortedArray[mid]), "red");
        await sleep(delay);

        if (sortedArray[mid] === target) {
            highlight(originalArray.indexOf(sortedArray[mid]), "green");
            toggleButtons(false);
            return;
        } else if (sortedArray[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }

        highlight(originalArray.indexOf(sortedArray[mid]), "#3498db");
    }

    alert("Value not found");
    toggleButtons(false);
}

// Initial array generation
generateArray(arraySizeSlider.value);
updateSpeedValue();