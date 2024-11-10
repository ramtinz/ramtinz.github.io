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
      vx: random(-0.5, 0.5),
      vy: random(-0.5, 0.5),
    });
  }
}

function draw() {
  background(0, 0, 139); // Set to a dark blue background

  // Update and display each node
  nodes.forEach((node) => {
    // Make node react to the cursor
    let mouseDist = dist(mouseX, mouseY, node.x, node.y);
    if (mouseDist < maxDistance) {
      let angle = atan2(node.y - mouseY, node.x - mouseX);
      
      // Apply an easing force to move nodes smoothly away from the cursor
      let force = map(mouseDist, 0, maxDistance, 0.2, 0); // Decrease force as distance increases
      node.vx += cos(angle) * force;
      node.vy += sin(angle) * force;
    }

    // Update position
    node.x += node.vx;
    node.y += node.vy;

    // Gradually slow down the nodes for smooth motion
    node.vx *= 0.95;
    node.vy *= 0.95;

    // Limit speed for more natural motion
    node.vx = constrain(node.vx, -1, 1);
    node.vy = constrain(node.vy, -1, 1);

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
