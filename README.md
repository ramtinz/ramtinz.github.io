# Dynamic Portfolio Website

A modern, responsive portfolio website that automatically updates with the latest information from professional profiles.

## Live Demo

Visit: **https://ramtinz.github.io**

## Features

- **Dynamic Data Integration**: Automatically fetches repositories, followers, and profile information from GitHub
- **Publications Display**: Shows research papers and citation metrics from Google Scholar
- **Professional Experience**: Displays career history and achievements from LinkedIn
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Updates**: Data refreshes automatically via GitHub Actions
- **Modern UI**: Clean, professional design with smooth animations

## Quick Start

### Clone and Setup
```bash
git clone https://github.com/ramtinz/ramtinz.github.io.git
cd ramtinz.github.io
npm install
```

### Update Your Information
Edit the data files with your details:
- `data/profile-summary.json` - Main profile information
- `data/github.json` - GitHub profile data
- `data/linkedin.json` - LinkedIn profile data
- `data/google-scholar.json` - Publications and citations

### Development
```bash
# Start local server
python3 -m http.server 8080

# Update data manually
bash scripts/update-data.sh
```

## Project Structure

```
ramtinz.github.io/
├── index.html                 # Main HTML file
├── style.css                  # CSS styles
├── js/main.js                 # Dynamic functionality
├── data/                      # Profile data (JSON files)
├── scripts/                   # Update scripts
├── .github/workflows/         # GitHub Actions
└── assets/images/             # Profile images
```

## Automatic Updates

The portfolio includes a GitHub Actions workflow that runs daily to:
1. Fetch latest data from GitHub API and other sources
2. Update repository with new information
3. Deploy changes to GitHub Pages

## Customization

### Profile Data
Update `data/profile-summary.json`:
```json
{
  "name": "Your Name",
  "title": "Your Professional Title",
  "location": "Your Location",
  "bio": "Your professional bio...",
  "stats": {
    "githubRepos": 0,
    "citations": 0,
    "hIndex": 0
  }
}
```

### Styling
Modify CSS variables in `style.css`:
```css
:root {
    --primary-color: #4a90e2;
    --secondary-color: #7b68ee;
    --accent-color: #f39c12;
}
```

## Deployment

### GitHub Pages
1. Enable GitHub Pages in repository settings
2. Select "GitHub Actions" as the source
3. The workflow will automatically deploy your site

### Manual Deployment
Upload the files to any static hosting provider.

## License

This project is licensed under the MIT License.

## Contact

Email: ramtin [dot] zargari [at] gmail [dot] com
