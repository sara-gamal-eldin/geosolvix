import * as fs from "fs";

function traceTrueDivs() {
    const file = "app/page.tsx";
    const code = fs.readFileSync(file, "utf8");
    const lines = code.split("\n");
    
    interface DivTag {
        line: number;
        text: string;
    }
    
    const stack: DivTag[] = [];
    
    for (let i = 3679; i < 4228; i++) {
        const lineText = lines[i];
        const lineNum = i + 1;
        
        // Find all tags in line
        // A tag can be: 1. </div>, 2. <div ... />, 3. <div ...>
        // Let's find each div tag carefully
        const regex = /<\/div>|<div[^>]*>/gi;
        let match;
        while ((match = regex.exec(lineText)) !== null) {
            const tagText = match[0];
            
            // Check if self-closing
            if (tagText.endsWith("/>")) {
                // Ignore self-closing
                continue;
            }
            
            if (tagText.toLowerCase().startsWith("</div")) {
                // Closing tag
                if (stack.length === 0) {
                    console.log(`[Line ${lineNum}] EXTRA CLOSE! "${lineText.trim()}"`);
                } else {
                    const pop = stack.pop()!;
                    // console.log(`[Line ${lineNum}] CLOSE matches line ${pop.line}`);
                }
            } else {
                // Opening tag
                stack.push({ line: lineNum, text: lineText.trim() });
            }
        }
    }
    
    console.log(`\nRemaining open divs (${stack.length}):`);
    for (const item of stack) {
        console.log(`- Line ${item.line}: "${item.text.substring(0, 100)}"`);
    }
}

traceTrueDivs();
