// Function to fetch and parse the README.md content
async function fetchReadmeContent(url) {
  const response = await fetch(url);
  const text = await response.text();
  return text;
}

// Function to process the text and create a word frequency object
function processText(text) {
  const words = text.toLowerCase().match(/\b\w+\b/g);
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

  WordCloud(document.getElementById('word-cloud'), {
    list: wordList,
    gridSize: 16,
    weightFactor: 10,
    fontFamily: 'Arial, sans-serif',
    color: 'random-dark',
    rotateRatio: 0.5,
    rotationSteps: 2,
    backgroundColor: '#fff'
  });
}

// Main function to fetch README, process text, and create word cloud
async function generateWordCloud() {
  const readmeUrl = 'https://github.com/ramtinz/ramtinz.github.io/blob/master/README.md';
  const readmeContent = await fetchReadmeContent(readmeUrl);
  const wordFreq = processText(readmeContent);
  createWordCloud(wordFreq);
}

// Call the main function
generateWordCloud();
