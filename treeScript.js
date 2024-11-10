let treeData;

function setup() {
  createCanvas(windowWidth, windowHeight);
  treeData = generateTreeData();
  noLoop();
  fill(0);
  textSize(18);
}

function draw() {
  background(255);
  translate(width / 2, 100);

  drawTree(treeData, 0, 200, 0, 0);
}

function generateTreeData() {
  return {
    label: "Ramtin Zargari Marandi",
    children: [
      {
        label: "Research",
        children: [
          { label: "ExplaineR Package" },
          { label: "Predictive Modeling" },
          { label: "Biofeedback Research" },
        ]
      },
      {
        label: "Education",
        children: [
          { label: "Ph.D. in Biomedical Science" },
          { label: "M.Sc. in Biomedical Engineering" },
          { label: "B.Sc. in Electrical Engineering" },
        ]
      },
      {
        label: "Skills",
        children: [
          { label: "Python, R, MATLAB" },
          { label: "Machine Learning & AI" },
          { label: "Data Analysis & Visualization" },
          { label: "Containerization (Docker, Kubernetes)" }
        ]
      },
      {
        label: "Publications",
        children: [
          { label: "ExplaineR R Package (2024)" },
          { label: "Early Prediction of Dengue (2023)" },
          { label: "Gut Microbiome & Infection (2022)" },
        ]
      }
    ]
  };
}

function drawTree(node, x, y, angle, depth) {
  let len = 100 / (depth + 1);
  textAlign(CENTER);
  text(node.label, x, y);

  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      let newX = x + cos(angle + i * PI / 4) * len;
      let newY = y + sin(angle + i * PI / 4) * len;
      line(x, y, newX, newY);
      drawTree(node.children[i], newX, newY, angle + i * PI / 4, depth + 1);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
