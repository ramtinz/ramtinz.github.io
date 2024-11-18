let stars = [];
let waves = [];
let reflections = [];
let waveHeight = 20;
let numStars = 100;
let numWaves = 6;

function setup() {
  // Create a full-width canvas for the footer
  let canvas = createCanvas(windowWidth, 200);
  canvas.parent('footer-container');
  noStroke();

  // Initialize stars
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: random(width),
      y: random(height / 2), // Stars in the upper half of the canvas
      size: random(1, 3),
      twinkle: random(0.5, 1.5),
      reflectionAlpha: random(50, 100),
    });
  }

  // Initialize waves
  for (let i = 0; i < numWaves; i++) {
    waves.push({
      offset: random(0, TWO_PI),
      amplitude: random(10, 25),
      speed: random(0.01, 0.03) * (i + 1), // Closer waves move faster
      depth: i, // Depth layer for wave
      color: color(0, 50 + i * 30, 100 + i * 30, 150 - i * 20),
    });
  }
}

function draw() {
  // Clear the canvas
  background(5, 5, 30);

  // Draw stars
  for (let star of stars) {
    // Twinkling stars
    fill(255, 255, 200, random(150, 255));
    let twinkleSize = star.size * (1 + sin(frameCount * star.twinkle) * 0.1);
    ellipse(star.x, star.y, twinkleSize);

    // Draw reflections below the water
    let reflectedY = height / 2 + waveHeight + (height / 2 - star.y) * 0.5;
    fill(255, 255, 200, star.reflectionAlpha);
    ellipse(star.x, reflectedY, star.size, star.size * 2); // Stretch reflections
  }

  // Draw waves
  for (let wave of waves) {
    fill(wave.color);
    beginShape();
    for (let x = 0; x <= width; x += 10) {
      let y =
        height / 2 + wave.depth * waveHeight + sin(x * 0.02 + wave.offset) * wave.amplitude;
      vertex(x, y);
    }
    vertex(width, height); // Close the shape at the bottom of the canvas
    vertex(0, height);
    endShape(CLOSE);

    // Animate wave offset
    wave.offset += wave.speed;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, 200); // Adjust canvas on window resize
}
