// script.js
let nodes = [];
let maxNodes = 50;
let maxDistance = 150;

function setup() {
  let canvas = createCanvas(windowWidth, 300);
  canvas.parent("dynamic-header");

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
  background(17);

  nodes.forEach((node) => {
    node.x += node.vx;
    node.y += node.vy;

    if (node.x < 0 || node.x > width) node.vx *= -1;
    if (node.y < 0 || node.y > height) node.vy *= -1;

    noStroke();
    fill(255);
    ellipse(node.x, node.y, 5, 5);
  });

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

function windowResized() {
  resizeCanvas(windowWidth, 300);
}
