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
      wordArray = extractWords(data);
      noLoop();  // Initially, stop redrawing the screen to load words
    })
    .catch(error => {
      console.error("Error fetching README.md:", error);
      wordArray = ["Error loading words"];
    });
}

// Extract words from README.md content
function extractWords(text) {
  // Remove non-alphabetic characters and split by whitespace
  let words = text.replace(/[^a-zA-Z\s]/g, "").split(/\s+/);
  return words.filter(word => word.length > 3);  // Filter out short words
}

// Draw the word cloud
function draw() {
  background(255);

  // Randomly place and animate the words
  wordArray.forEach((word, index) => {
    let x = random(width);
    let y = random(height);
    let size = map(noise(index), 0, 1, 20, 70);  // Random size based on noise
    let color = color(random(255), random(255), random(255));  // Random color
    drawWord(word, x, y, size, color);
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
