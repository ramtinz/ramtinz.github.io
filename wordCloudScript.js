let words = [];  // Array to store the words extracted from README.md
let wordSizes = {};  // Object to store word sizes for frequency

// p5.js setup function
function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  noStroke();

  // Load the README.md and process its content
  fetch('README.md')
    .then(response => response.text())
    .then(data => {
      console.log("README.md fetched successfully.");
      words = extractWords(data);
      wordSizes = calculateWordFrequency(words);
      loop();  // Start the animation once words are loaded
    })
    .catch(error => {
      console.error("Error fetching README.md:", error);
      words = ["Error loading words"];
      wordSizes = { "Error": 1 };
      loop();
    });
}

// Extract words from the README text
function extractWords(text) {
  // Remove non-alphabetic characters and split by spaces
  let wordList = text.replace(/[^a-zA-Z\s]/g, "").split(/\s+/);
  return wordList.filter(word => word.length > 3);  // Remove short words
}

// Calculate word frequency for size
function calculateWordFrequency(wordList) {
  let freq = {};
  wordList.forEach(word => {
    word = word.toLowerCase();  // Convert to lowercase
    if (freq[word]) {
      freq[word]++;
    } else {
      freq[word] = 1;
    }
  });
  return freq;
}

// p5.js draw function to render the word cloud
function draw() {
  background(255);  // White background
  
  // Display each word with a random position and color
  Object.keys(wordSizes).forEach((word, index) => {
    let x = random(width);
    let y = random(height);
    let size = map(wordSizes[word], 1, Math.max(...Object.values(wordSizes)), 20, 100);
    let col = color(random(255), random(255), random(255));  // Random color for each word
    drawWord(word, x, y, size, col);
  });
}

// Function to draw a single word
function drawWord(word, x, y, size, col) {
  fill(col);
  textSize(size);
  text(word, x, y);
}

// Handle window resizing
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
