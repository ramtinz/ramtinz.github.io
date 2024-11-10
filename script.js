let nodes = [];
let maxNodes = 50;
let maxDistance = 150;

function setup() {
  let canvas = createCanvas(windowWidth, 300);
  canvas.parent("dynamic-header");

  // Initialize nodes with random positions and initial velocities
  for (let i = 0; i < maxNodes; i++) {
    let vx = random(-1, 1);
    let vy = random(-1, 1);
    nodes.push({
      x: random(width),
      y: random(height),
      vx: vx,
      vy: vy,
      initialVx: vx, // Store the initial velocity
      initialVy: vy,
    });
  }
}

function draw() {
  background(0, 0, 139); // Dark blue background

  // Update and display each node
  nodes.forEach((node) => {
    let mouseDist = dist(mouseX, mouseY, node.x, node.y);

    if (mouseDist < maxDistance / 2) {
      let angle = atan2(node.y - mouseY, node.x - mouseX);
      node.vx += cos(angle) * 0.05; // Small influence to avoid fast acceleration
      node.vy += sin(angle) * 0.05;
    } else {
      // Gradually return to initial speed when mouse is not near
      node.vx += (node.initialVx - node.vx) * 0.05;
      node.vy += (node.initialVy - node.vy) * 0.05;
    }

    // Update position with constrained speed
    node.x += node.vx;
    node.y += node.vy;

    // Constrain speed for smoother motion
    let maxSpeed = 1.5;
    node.vx = constrain(node.vx, -maxSpeed, maxSpeed);
    node.vy = constrain(node.vy, -maxSpeed, maxSpeed);

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
