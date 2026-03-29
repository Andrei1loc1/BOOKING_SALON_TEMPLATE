const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();

// Patterns to search for
const patterns = [
    /oklch\(\s*290\)/g,
    /oklch\(0\.65\s+0\.25\s+290\)/g,
    /oklch\(0\.75\s+0\.18\s+290\)/g,
    /oklch\(0\.6\s+0\.2\s+290\)/g,
    /oklch\(0\.65_0\.25_290\)/g,
    /oklch\(0\.75_0\.18_290\)/g,
    /oklch\(0\.6_0\.2_290\)/g,
    /oklch\(0\.65\s+0\.25\s+290\s*\/\s*[\d.]+\)/g,
    /oklch\(0\.65_0\.25_290\s*\/\s*[\d.]+\)/g,
    /oklch\(0\.55\s+0\.15\s+72\)/g, // gold leftovers
    /oklch\(0\.84\s+0\.18\s+80\)/g, // gold leftovers
    /oklch\(0\.84_0\.18_80\)/g, // gold leftovers
    /oklch\(0\.75_0\.15_290\)/g,
    /oklch\(0\.88_0\.12_290\)/g,
    /oklch\(0\.68_0\.14_290\)/g,
    /oklch\(0\.78_0\.15_290\)/g,
    /oklch\(0\.9_0\.1_290\)/g,
    /oklch\(0\.72_0\.14_290\)/g,
    /oklch\(0\.72\s+0\.16\s+15\)/g, // red/orange
    /oklch\(0\.25\s+0\.08\s+15\s*\/\s*0\.25\)/g,
    /oklch\(0\.50\s+0\.18\s+15\s*\/\s*0\.5\)/g,
    /var\(--color-purple-light\)/g,
    /var\(--color-purple\)/g,
    /text-gold-gradient/g,
    /bg-gold-gradient/g,
    /shadow-gold/g,
    /border-gold/g
];

function getReplacement(match) {
    if (match.includes('0.65 0.25') || match.includes('0.65_0.25') || match.includes('0.84 0.18') || match.includes('0.84_0.18')) {
        const opacityMatch = match.match(/\/\s*([\d.]+)/);
        if (opacityMatch) return `oklch(0.65 0.25 var(--primary-hue) / ${opacityMatch[1]})`;
        return `oklch(0.65 0.25 var(--primary-hue))`;
    }
    if (match.includes('0.75 0.18') || match.includes('0.75_0.18') || match.includes('0.55 0.15')) {
        return `oklch(0.75 0.18 var(--primary-hue))`;
    }
    if (match.includes('text-gold-gradient')) return 'text-purple-gradient';
    if (match.includes('bg-gold-gradient')) return 'bg-primary-gradient-border';
    if (match.includes('shadow-gold')) return 'shadow-primary/30';
    if (match.includes('border-gold')) return 'border-primary/20';
    if (match.includes('var(--color-purple-light)')) return `oklch(0.75 0.18 var(--primary-hue))`;
    if (match.includes('var(--color-purple)')) return `oklch(0.65 0.25 var(--primary-hue))`;
    if (match.includes('290')) return match.replace('290', 'var(--primary-hue)');
    
    return match;
}

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const targetDirs = ['app', 'components', 'config', 'hooks', 'lib'];

targetDirs.forEach(dir => {
    const fullDir = path.join(projectRoot, dir);
    if (fs.existsSync(fullDir)) {
        walkDir(fullDir, (filePath) => {
            if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
                let content = fs.readFileSync(filePath, 'utf8');
                let originalContent = content;
                
                patterns.forEach(pattern => {
                    content = content.replace(pattern, (match) => getReplacement(match));
                });

                if (content !== originalContent) {
                    console.log(`Updating ${filePath}`);
                    fs.writeFileSync(filePath, content, 'utf8');
                }
            }
        });
    }
});
