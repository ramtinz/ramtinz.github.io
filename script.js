// script.js

let nodes = [];
let maxNodes = 50;
let maxDistance = 150;

function setup() {
  // Create a canvas that covers the header element
  let canvas = createCanvas(windowWidth, 300);
  canvas.parent("dynamic-header");
  
  // Initialize nodes with random positions
  for (let i = 0; i < maxNodes; i++) {
    nodes.push({
      x: random(width),
      y: random(height),
      vx: random(-1, 1),
      vy: random(-1, 1),
    });
  }
}

function draw() {
  background(17); // Match header background color

  // Update and display each node
  nodes.forEach((node) => {
    // Update position
    node.x += node.vx;
    node.y += node.vy;

    // Bounce off edges
    if (node.x < 0 || node.x > width) node.vx *= -1;
    if (node.y < 0 || node.y > height) node.vy *= -1;

    // Draw node as a small circle
    noStroke();
    fill(255);
    ellipse(node.x, node.y, 5, 5);
  });

  // Draw connections based on distance
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      let d = dist(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
      if (d < maxDistance) {
        stroke(255, map(d, 0, maxDistance, 255, 50));
        line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
      }
    }
  }
}

// Handle window resizing
function windowResized() {
  resizeCanvas(windowWidth, 300);
}