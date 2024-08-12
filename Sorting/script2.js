let array = [];
let algorithm = 'selection';
let speed = 30; // Default speed (adjusted)

// Event listeners for controls
document.getElementById('generate').addEventListener('click', generateArray);
document.getElementById('arraySize').addEventListener('input', updateArraySize);
document.getElementById('speed').addEventListener('input', updateSpeed);
document.getElementById('refresh').addEventListener('click', () => location.reload());

// Generate a new random array
function generateArray() {
    const size = document.getElementById('arraySize').value;
    array = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    drawArray();
    updateArraySizeValue();
}

// Draw the array as bars in the visualizer
function drawArray() {
    const visualizer = document.getElementById('visualizer-space');
    visualizer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${value * 3}px`; // Scale height for visibility
        visualizer.appendChild(bar);
    });
}

// Update the array size
function updateArraySize() {
    generateArray();
}

// Update the displayed value of the array size
function updateArraySizeValue() {
    document.getElementById('arraySizeValue').textContent = document.getElementById('arraySize').value;
}

// Update the speed based on slider input
function updateSpeed() {
    const speedLevel = document.getElementById('speed').value;
    speed = speedLevel === '1' ? 50 : speedLevel === '2' ? 30 : 10; // Adjusted speeds
    updateSpeedValue();
}

// Update the displayed value of the speed
function updateSpeedValue() {
    document.getElementById('speedValue').textContent = document.getElementById('speed').value;
}

// Set the algorithm to be used for sorting
function setAlgorithm(selectedAlgorithm) {
    algorithm = selectedAlgorithm;
    sortArray();
}

// Main function to execute the sorting algorithm
async function sortArray() {
    lockButtons(true);
    switch (algorithm) {
        case 'selection':
            await selectionSort();
            break;
        case 'bubble':
            await bubbleSort();
            break;
        case 'insertion':
            await insertionSort();
            break;
        case 'merge':
            await mergeSort(array);
            break;
        case 'quick':
            await quickSort(array, 0, array.length - 1);
            break;
        case 'heap':
            await heapSort();
            break;
        case 'counting':
            await countingSort();
            break;
        case 'radix':
            await radixSort();
            break;
        case 'bucket':
            await bucketSort();
            break;
    }
    lockButtons(false);
}

// Lock or unlock buttons
function lockButtons(lock) {
    const buttons = document.querySelectorAll('.algorithm-buttons button, #generate');
    buttons.forEach(button => {
        button.disabled = lock;
    });
}

// Selection Sort Algorithm
async function selectionSort() {
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            highlightBars(i, j);
            await sleep(speed);
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
        drawArray();
    }
}

// Bubble Sort Algorithm
async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            highlightBars(j, j + 1);
            await sleep(speed);
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                drawArray();
            }
        }
    }
}

// Insertion Sort Algorithm
async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        highlightBars(i, -1); // Highlight the key being inserted
        await sleep(speed);

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            highlightBars(j + 1, j); // Highlight the moving bar
            await sleep(speed);
            j--;
        }
        array[j + 1] = key;
        drawArray(); // Update the visual representation after the insertion
    }
}

// Merge Sort Algorithm
async function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = await mergeSort(arr.slice(0, mid));
    const right = await mergeSort(arr.slice(mid));
    return await merge(left, right);
}

async function merge(left, right) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        highlightBars(leftIndex, rightIndex); // Highlight the bars being compared
        await sleep(speed);
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    array = result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    drawArray();
    return array;
}

// Quick Sort Algorithm
async function quickSort(arr, left, right) {
    if (left < right) {
        const pivotIndex = await partition(arr, left, right);
        await quickSort(arr, left, pivotIndex - 1);
        await quickSort(arr, pivotIndex + 1, right);
        drawArray();
    }
}

async function partition(arr, left, right) {
    const pivot = arr[right];
    let i = left - 1;

    for (let j = left; j < right; j++) {
        highlightBars(j, right); // Highlight the pivot and the current element
        await sleep(speed);
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            highlightBars(i, j); // Highlight the swapped elements
            drawArray();
            await sleep(speed);
        }
    }
    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    return i + 1;
}

// Heap Sort Algorithm
async function heapSort() {
    for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
        await heapify(array.length, i);
    }
    for (let i = array.length - 1; i > 0; i--) {
        [array[0], array[i]] = [array[i], array[0]];
        drawArray();
        await sleep(speed);
        await heapify(i, 0);
    }
}

async function heapify(n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
        largest = left;
    }
    if (right < n && array[right] > array[largest]) {
        largest = right;
    }
    if (largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]];
        highlightBars(i, largest); // Highlight the swapped elements
        drawArray();
        await heapify(n, largest);
    }
}

// Counting Sort Algorithm
async function countingSort() {
    const max = Math.max(...array);
    const count = new Array(max + 1).fill(0);
    const output = new Array(array.length);

    for (let i = 0; i < array.length; i++) {
        count[array[i]]++;
    }

    for (let i = 1; i <= max; i++) {
        count[i] += count[i - 1];
    }

    // Visualize the sorting process
    for (let i = array.length - 1; i >= 0; i--) {
        output[count[array[i]] - 1] = array[i];
        count[array[i]]--;
        drawArray();
        await sleep(speed); // Ensure visualization during sorting
    }

    for (let i = 0; i < array.length; i++) {
        array[i] = output[i];
    }
    drawArray(); // Final update
}

// Radix Sort Algorithm
async function radixSort() {
    const max = Math.max(...array);
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        await countingSortForRadix(exp);
        drawArray(); // Ensure final visualization
    }
}

async function countingSortForRadix(exp) {
    const output = new Array(array.length);
    const count = new Array(10).fill(0);

    for (let i = 0; i < array.length; i++) {
        count[Math.floor((array[i] / exp) % 10)]++;
    }

    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    for (let i = array.length - 1; i >= 0; i--) {
        output[count[Math.floor((array[i] / exp) % 10)] - 1] = array[i];
        count[Math.floor((array[i] / exp) % 10)]--;
        drawArray();
        await sleep(speed); // Ensure visualization during sorting
    }

    for (let i = 0; i < array.length; i++) {
        array[i] = output[i];
    }
}

// Bucket Sort Algorithm
async function bucketSort() {
    const numBuckets = Math.ceil(Math.sqrt(array.length));
    const buckets = Array.from({ length: numBuckets }, () => []);

    for (let i = 0; i < array.length; i++) {
        const index = Math.floor((array[i] / Math.max(...array)) * numBuckets);
        buckets[index].push(array[i]);
        highlightBars(i, -1);
        drawArray();
        await sleep(speed); // Ensure visualization during sorting
    }

    let sortedArray = [];
    for (let i = 0; i < numBuckets; i++) {
        if (buckets[i].length > 0) {
            const sortedBucket = await insertionSortBucket(buckets[i]);
            sortedArray = sortedArray.concat(sortedBucket);
        }
    }

    array = sortedArray;
    drawArray(); // Final update
}

// Function to highlight bars being compared or swapped
function highlightBars(index1, index2) {
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        bar.style.backgroundColor = (index === index1 || index === index2) ? '#e74c3c' : '#3498db';
    });
}

// Sleep function to create a delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Initial array generation
generateArray();