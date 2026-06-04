import * as fs from "fs";

function traceStackDepth() {
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
        
        const regex = /<\/div>|<div[^>]*>/gi;
        let match;
        while ((match = regex.exec(lineText)) !== null) {
            const tagText = match[0];
            if (tagText.endsWith("/>")) continue;
            
            if (tagText.toLowerCase().startsWith("</div")) {
                if (stack.length === 0) {
                    console.log(`[Line ${lineNum}] EXTRA CLOSE!`);
                } else {
                    const pop = stack.pop()!;
                    console.log(`[Line ${lineNum}] Pop <div> from line ${pop.line}. New stack height: ${stack.length}`);
                }
            } else {
                stack.push({ line: lineNum, text: lineText.trim() });
                console.log(`[Line ${lineNum}] Push <div>. New stack height: ${stack.length}`);
            }
        }
    }
}

traceStackDepth();
