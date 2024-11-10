let nodes = [];
let maxNodes = 50;
let maxDistance = 150;

function setup() {
  // Create a canvas that covers the header element
  let canvas = createCanvas(windowWidth, 300);
  canvas.parent("dynamic-header");

  // Initialize nodes with random positions and colors
  for (let i = 0; i < maxNodes; i++) {
    nodes.push({
      x: random(width),
      y: random(height),
      vx: random(-0.2, 0.2),
      vy: random(-0.2, 0.2),
      color: color(random(100, 255), random(100, 255), random(100, 255)) // Random pastel colors
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
      
      // Apply an easing force to move nodes slowly away from the cursor
      let force = map(mouseDist, 0, maxDistance, 0.1, 0); // Smaller force for gentler movement
      node.vx += cos(angle) * force;
      node.vy += sin(angle) * force;
    }

    // Update position
    node.x += node.vx;
    node.y += node.vy;

    // Apply gentle damping so they keep moving slowly
    node.vx *= 0.98;
    node.vy *= 0.98;

    // Limit speed for smooth, natural motion
    node.vx = constrain(node.vx, -0.5, 0.5);
    node.vy = constrain(node.vy, -0.5, 0.5);

    // Bounce off edges
    if (node.x < 0 || node.x > width) node.vx *= -1;
    if (node.y < 0 || node.y > height) node.vy *= -1;

    // Draw node as a small, colored circle
    noStroke();
    fill(node.color);
    ellipse(node.x, node.y, 6, 6);
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
