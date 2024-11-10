let nodes = [];
let maxNodes = 50;
let maxDistance = 150;

function setup() {
  let canvas = createCanvas(windowWidth, 300);
  canvas.parent("dynamic-header");

  // Initialize nodes with random positions and initial velocities
  for (let i = 0; i < maxNodes; i++) {
    let vx = random(-0.5, 0.5); // Start with a gentle speed
    let vy = random(-0.5, 0.5);
    nodes.push({
      x: random(width),
      y: random(height),
      vx: vx,
      vy: vy,
      initialVx: vx,
      initialVy: vy,
    });
  }
}

function draw() {
  background(0, 0, 139); // Dark blue background

  // Update and display each node
  nodes.forEach((node) => {
    let mouseDist = dist(mouseX, mouseY, node.x, node.y);

    // Influence of the mouse on node velocity
    if (mouseDist < maxDistance / 2) {
      let angle = atan2(node.y - mouseY, node.x - mouseX);
      node.vx += cos(angle) * 0.02; // Reduced influence for smoother motion
      node.vy += sin(angle) * 0.02;
    } else {
      // Gradually return to initial speed when mouse is not near
      node.vx += (node.initialVx - node.vx) * 0.02;
      node.vy += (node.initialVy - node.vy) * 0.02;
    }

    // Update position with gentle minimum speed
    node.x += node.vx;
    node.y += node.vy;

    // Keep nodes moving at a gentle speed
    let minSpeed = 0.2;
    let maxSpeed = 1.0;
    let speed = sqrt(node.vx * node.vx + node.vy * node.vy);

    // Enforce minimum and maximum speed limits
    if (speed < minSpeed) {
      node.vx = (node.vx / speed) * minSpeed;
      node.vy = (node.vy / speed) * minSpeed;
    } else if (speed > maxSpeed) {
      node.vx = (node.vx / speed) * maxSpeed;
      node.vy = (node.vy / speed) * maxSpeed;
    }

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
