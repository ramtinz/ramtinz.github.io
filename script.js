let nodes = [];
let maxNodes = 50;
let maxDistance = 150;
let maxZ = 500; // Maximum distance in the z-axis for perspective

function setup() {
  // Create a canvas that covers the header element
  let canvas = createCanvas(windowWidth, 300);
  canvas.parent("dynamic-header");

  // Initialize nodes with random positions and a z-depth
  for (let i = 0; i < maxNodes; i++) {
    nodes.push({
      x: random(width),
      y: random(height),
      z: random(maxZ), // z-depth for 3D perspective
      vx: random(-1, 1),
      vy: random(-1, 1),
      vz: random(-0.5, 0.5), // slight movement along z-axis
    });
  }
}

function draw() {
  background(0, 0, 139); // Set to a dark blue background

  // Update and display each node
  nodes.forEach((node) => {
    // Scale size and opacity based on z-depth
    let scale = map(node.z, 0, maxZ, 2, 0.2);
    let opacity = map(node.z, 0, maxZ, 255, 50);

    // Make node react to the cursor in 3D space
    let mouseDist = dist(mouseX, mouseY, node.x, node.y);
    if (mouseDist < maxDistance / 2) {
      let angle = atan2(node.y - mouseY, node.x - mouseX);
      node.vx += cos(angle) * 0.5;
      node.vy += sin(angle) * 0.5;
    }

    // Update position in x, y, and z axes
    node.x += node.vx;
    node.y += node.vy;
    node.z += node.vz;

    // Bounce off edges in x and y directions
    if (node.x < 0 || node.x > width) node.vx *= -1;
    if (node.y < 0 || node.y > height) node.vy *= -1;
    if (node.z < 0 || node.z > maxZ) node.vz *= -1; // Reflect in z-axis as well

    // Draw node as a small circle, scaled by its z-depth
    noStroke();
    fill(255, opacity); // Adjust opacity based on z-depth
    ellipse(node.x, node.y, 5 * scale, 5 * scale); // Scale size by z-depth
  });

  // Draw connections based on 3D distance (projected to 2D)
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      let d = dist(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
      let zDist = abs(nodes[i].z - nodes[j].z); // z-axis difference
      let adjustedDistance = d + zDist; // Approximate 3D distance

      if (adjustedDistance < maxDistance) {
        let alpha = map(adjustedDistance, 0, maxDistance, 255, 50);
        stroke(255, alpha);
        line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
      }
    }
  }
}

// Handle window resizing
function windowResized() {
  resizeCanvas(windowWidth, 300);
}
