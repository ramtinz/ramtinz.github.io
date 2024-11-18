let stars = [];
let waves = [];
let waveHeight = 20;
let numStars = 100;
let numWaves = 5;

function setup() {
  // Create a full-width canvas at the bottom of the footer
  let canvas = createCanvas(windowWidth, 200);
  canvas.parent('footer-container');
  noStroke();

  // Initialize stars
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: random(width),
      y: random(height / 2),
      size: random(1, 3),
      twinkle: random(0.5, 1.5)
    });
  }

  // Initialize wave positions
  for (let i = 0; i < numWaves; i++) {
    waves.push({
      offset: random(0, TWO_PI),
      amplitude: random(5, 15),
      speed: random(0.02, 0.05),
      color: color(0, 50 + i * 30, 100 + i * 30, 150)
    });
  }
}

function draw() {
  // Draw background (water effect)
  background(5, 5, 30);

  // Draw stars
  for (let star of stars) {
    fill(255, 255, 200, random(150, 255)); // Yellowish-white glow
    let twinkleSize = star.size * (1 + sin(frameCount * star.twinkle) * 0.1);
    ellipse(star.x, star.y, twinkleSize);
  }

  // Draw waves
  for (let i = 0; i < waves.length; i++) {
    fill(waves[i].color);
    beginShape();
    for (let x = 0; x <= width; x += 10) {
      let y = height / 2 + i * waveHeight + sin(x * 0.02 + waves[i].offset) * waves[i].amplitude;
      vertex(x, y);
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);

    waves[i].offset += waves[i].speed; // Animate wave motion
  }
}

function windowResized() {
  resizeCanvas(windowWidth, 200); // Resize canvas on window size change
}
