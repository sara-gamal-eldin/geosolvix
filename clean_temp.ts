import * as fs from "fs";

function cleanTemp() {
    const file = "app/page.tsx";
    const code = fs.readFileSync(file, "utf8");
    const lines = code.split("\n");
    
    // Line 3680 is index 3679
    // Line 3681 is index 3680
    console.log("Original line 3680:", lines[3679]);
    console.log("Original line 3681:", lines[3680]);
    
    if (lines[3679].includes('import { jsx as _jsx')) {
        console.log("Removing import from line 3680");
        lines.splice(3679, 1);
    }
    
    // Now index 3679 is the "const temp = (" line
    console.log("Current line 3680 (index 3679):", lines[3679]);
    if (lines[3679].includes('const temp = (')) {
        console.log("Opening temp expression found! Stripping 'const temp = (' wrapper");
        lines[3679] = lines[3679].replace('const temp = (', '');
        
        // Find the matching close parenthesis at the end of this block
        let resourcesIndex = -1;
        for (let j = 3679; j < lines.length; j++) {
            if (lines[j].includes('activeView === "resources"')) {
                resourcesIndex = j;
                break;
            }
        }
        
        if (resourcesIndex !== -1) {
            console.log(`Found activeView === "resources" at line ${resourcesIndex + 1}`);
            // Let's strip the ending ");" of temp from the line right before resourcesIndex (or close)
            let lastLineIndex = resourcesIndex - 1;
            console.log(`Stripping ending ); or );, from line ${lastLineIndex + 1}: ${lines[lastLineIndex]}`);
            const text = lines[lastLineIndex].trim();
            if (text.endsWith(');,')) {
                lines[lastLineIndex] = lines[lastLineIndex].replace(');,', '   ,');
            } else if (text.endsWith(');')) {
                lines[lastLineIndex] = lines[lastLineIndex].replace(');', '   ,');
            } else if (text.includes('})()')) {
                // Remove ); and replace with ,
                lines[lastLineIndex] = lines[lastLineIndex].replace(');', ',');
            } else if (text.endsWith(')')) {
                lines[lastLineIndex] = lines[lastLineIndex].replace(')', ',');
            }
        }
    }
    
    fs.writeFileSync(file, lines.join("\n"), "utf8");
    console.log("Clean temp complete!");
}

cleanTemp();
