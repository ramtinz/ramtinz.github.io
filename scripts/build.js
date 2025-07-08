const fs = require('fs').promises;
const path = require('path');

async function build() {
    console.log('🏗️  Building dynamic portfolio...');
    
    try {
        // Create build directory
        const buildDir = path.join(__dirname, '../build');
        await fs.mkdir(buildDir, { recursive: true });
        
        // Copy necessary files
        const filesToCopy = [
            'index-dynamic.html',
            'style-dynamic.css',
            'js/main.js',
            'assets',
            'data',
            'footer.js',
            'script.js',
            'README.md'
        ];
        
        for (const file of filesToCopy) {
            const srcPath = path.join(__dirname, '..', file);
            const destPath = path.join(buildDir, file);
            
            try {
                const stats = await fs.stat(srcPath);
                if (stats.isDirectory()) {
                    await copyDirectory(srcPath, destPath);
                } else {
                    await fs.mkdir(path.dirname(destPath), { recursive: true });
                    await fs.copyFile(srcPath, destPath);
                }
                console.log(`✅ Copied ${file}`);
            } catch (error) {
                console.log(`⚠️  Skipped ${file} (not found)`);
            }
        }
        
        // Rename main files
        await fs.rename(path.join(buildDir, 'index-dynamic.html'), path.join(buildDir, 'index.html'));
        await fs.rename(path.join(buildDir, 'style-dynamic.css'), path.join(buildDir, 'style.css'));
        
        console.log('✅ Build completed successfully!');
        
    } catch (error) {
        console.error('❌ Build failed:', error);
        process.exit(1);
    }
}

async function copyDirectory(src, dest) {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });
    
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
            await copyDirectory(srcPath, destPath);
        } else {
            await fs.copyFile(srcPath, destPath);
        }
    }
}

if (require.main === module) {
    build();
}

module.exports = { build };
