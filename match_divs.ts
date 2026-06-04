import * as fs from "fs";

function matchDivs() {
    const file = "app/page.tsx";
    const code = fs.readFileSync(file, "utf8");
    const lines = code.split("\n");
    
    const stack: { line: number; text: string }[] = [];
    
    // Scan range of lines
    for (let i = 3679; i < 4228; i++) {
        const lineText = lines[i];
        const lineNum = i + 1;
        
        // Find tags in line
        // We do a simple character loop or regex match
        const regex = /<\/div>|<div(\s|>)/gi;
        let match;
        while ((match = regex.exec(lineText)) !== null) {
            const token = match[0];
            if (token.toLowerCase().startsWith("</div")) {
                if (stack.length === 0) {
                    console.log(`[Line ${lineNum}] Extra closing </div>`);
                } else {
                    const pop = stack.pop();
                    // console.log(`[Line ${lineNum}] Closed <div> from line ${pop.line}`);
                }
            } else {
                stack.push({ line: lineNum, text: lineText.trim() });
            }
        }
    }
    
    console.log(`\nRemaining open divs (${stack.length}):`);
    for (const item of stack) {
        console.log(`- Line ${item.line}: ${item.text.substring(0, 80)}`);
    }
}

matchDivs();
