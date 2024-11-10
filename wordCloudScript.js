// Function to fetch and parse the README.md content
async function fetchReadmeContent(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    return text;
  } catch (error) {
    console.error("Failed to fetch README content:", error);
    return "";
  }
}

// Function to process the text and create a word frequency object
function processText(text) {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const wordFreq = {};
  words.forEach(word => {
    if (word.length > 3) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  });
  return wordFreq;
}

// Function to create the word cloud
function createWordCloud(wordFreq) {
  const wordList = Object.entries(wordFreq)
    .map(([text, weight]) => ({ text, weight }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 100);

  const canvas = document.getElementById('word-cloud');
  const containerWidth = canvas.parentElement.clientWidth;
  const containerHeight = canvas.parentElement.clientHeight;

  canvas.width = containerWidth;
  canvas.height = containerHeight;

  WordCloud(canvas, {
    list: wordList,
    gridSize: Math.round(16 * containerWidth / 1024),
    weightFactor: 1,
    fontFamily: 'Arial, sans-serif',
    color: 'random-dark',
    rotateRatio: 0.5,
    rotationSteps: 2,
    backgroundColor: '#f5f5f5',
    minSize: 10,
    drawOutOfBound: false
  });
}

// Main function to fetch README, process text, and create word cloud
async function generateWordCloud() {
  const readmeUrl = 'https://raw.githubusercontent.com/ramtinz/ramtinz.github.io/master/README.md';
  const readmeContent = await fetchReadmeContent(readmeUrl);
  const wordFreq = processText(readmeContent);
  createWordCloud(wordFreq);
}

// Call the main function when the window loads
window.addEventListener('load', generateWordCloud);

// Redraw the word cloud when the window is resized
window.addEventListener('resize', () => {
  const wordFreq = processText(document.getElementById('word-cloud').textContent);
  createWordCloud(wordFreq);
});
