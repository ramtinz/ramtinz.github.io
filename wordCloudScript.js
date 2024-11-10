// Function to fetch and parse the README.md content
async function fetchReadmeContent(url) {
  try {
    console.log("Fetching README from:", url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    console.log("Fetched content length:", text.length);
    if (text.length === 0) {
      throw new Error("Fetched content is empty");
    }
    return text;
  } catch (error) {
    console.error("Failed to fetch README content:", error);
    return "";
  }
}

// Function to process the text and create a word frequency object
function processText(text) {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  console.log("Number of words processed:", words.length);
  const wordFreq = {};
  words.forEach(word => {
    if (word.length > 3) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  });
  console.log("Number of unique words:", Object.keys(wordFreq).length);
  return wordFreq;
}

// Function to create the word cloud
function createWordCloud(wordFreq) {
  const wordList = Object.entries(wordFreq)
    .map(([text, weight]) => [text, weight])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 100);

  console.log("Top 5 words:", wordList.slice(0, 5));

  const canvas = document.getElementById('word-cloud');
  const containerWidth = canvas.parentElement.clientWidth;
  const containerHeight = canvas.parentElement.clientHeight;

  canvas.width = containerWidth;
  canvas.height = containerHeight;

  console.log("Canvas size:", containerWidth, "x", containerHeight);

  WordCloud(canvas, {
    list: wordList,
    gridSize: Math.round(16 * containerWidth / 1024),
    weightFactor: 5,
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
  if (!readmeContent) {
    console.error("No content fetched. Cannot generate word cloud.");
    return;
  }
  const wordFreq = processText(readmeContent);
  if (Object.keys(wordFreq).length === 0) {
    console.error("No words found in the content. Cannot generate word cloud.");
    return;
  }
  createWordCloud(wordFreq);
}

// Function to test word cloud with sample data
function testWordCloud() {
  const sampleWords = [
    ['Hello', 10], ['World', 8], ['JavaScript', 15], ['WordCloud', 12],
    ['Test', 7], ['Data', 9], ['Sample', 6], ['Content', 11]
  ];
  
  const canvas = document.getElementById('word-cloud');
  const containerWidth = canvas.parentElement.clientWidth;
  const containerHeight = canvas.parentElement.clientHeight;

  canvas.width = containerWidth;
  canvas.height = containerHeight;

  WordCloud(canvas, {
    list: sampleWords,
    gridSize: Math.round(16 * containerWidth / 1024),
    weightFactor: 5,
    fontFamily: 'Arial, sans-serif',
    color: 'random-dark',
    rotateRatio: 0.5,
    rotationSteps: 2,
    backgroundColor: '#f5f5f5',
    minSize: 10,
    drawOutOfBound: false
  });
}

// Call the main function when the window loads
window.addEventListener('load', generateWordCloud);

// Uncomment the line below to test with sample data instead
// window.addEventListener('load', testWordCloud);

// Redraw the word cloud when the window is resized
window.addEventListener('resize', () => {
  generateWordCloud();
});
