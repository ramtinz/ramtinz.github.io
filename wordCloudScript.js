let wordArray = [];  // To hold words from the README.md

// Setup the canvas for p5.js
function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  noStroke();

  // Load the README.md and parse the words
  fetch('README.md')
    .then(response => response.text())
    .then(data => {
      console.log("README.md successfully fetched.");
      wordArray = extractWords(data);
      console.log("Extracted words: ", wordArray);
      noLoop();  // Initially, stop redrawing the screen to load words
    })
    .catch(error => {
      console.error("Error fetching README.md:", error);
      wordArray = ["Error loading words"];
    });
}

// Extract words from README.md content
function extractWords(text) {
  console.log("Extracting words...");
  // Remove non-alphabetic characters and split by whitespace
  let words = text.replace(/[^a-zA-Z\s]/g, "").split(/\s+/);
  console.log("Words extracted: ", words);
  return words.filter(word => word.length > 3);  // Filter out short words
}

// Draw the word cloud
function draw() {
  background(255);

  if (wordArray.length === 0) {
    fill(0);
    textSize(24);
    text("No words to display. Ensure README.md has content.", width / 2, height / 2);
  }

  // Randomly place and animate the words
  wordArray.forEach((word, index) => {
    let x = random(width);
    let y = random(height);
    let size = map(noise(index), 0, 1, 20, 70);  // Random size based on noise
    let colorValue = color(random(255), random(255), random(255));  // Random color
    drawWord(word, x, y, size, colorValue);
  });
}

// Draw a single word
function drawWord(word, x, y, size, col) {
  fill(col);
  textSize(size);
  text(word, x, y);
}

// Make the words move with mouse interaction
function mousePressed() {
  loop();  // Start the animation when mouse is pressed
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
