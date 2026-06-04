import * as fs from "fs";

function checkDetailed() {
    const file = "app/page.tsx";
    const code = fs.readFileSync(file, "utf8");
    const lines = code.split("\n");
    
    interface DivTag {
        line: number;
        col: number;
        isOpen: boolean;
        text: string;
    }
    
    const tags: DivTag[] = [];
    
    for (let i = 3679; i < 4228; i++) {
        const lineText = lines[i];
        const lineNum = i + 1;
        
        let pos = 0;
        const regex = /<\/div>|<div(\s|>)/gi;
        let match;
        while ((match = regex.exec(lineText)) !== null) {
            tags.push({
                line: lineNum,
                col: match.index + 1,
                isOpen: !match[0].toLowerCase().startsWith("</div"),
                text: lineText.trim()
            });
        }
    }
    
    console.log(`Found ${tags.length} div events in the tools section.`);
    
    const stack: DivTag[] = [];
    for (const tag of tags) {
        if (tag.isOpen) {
            stack.push(tag);
        } else {
            if (stack.length === 0) {
                console.log(`[Mismatch] Extra close at line ${tag.line}, col ${tag.col}: "${tag.text}"`);
            } else {
                const last = stack.pop()!;
                // Excellent, matched!
            }
        }
    }
    
    console.log(`\nRemaining open divs on stack: ${stack.length}`);
    for (const tag of stack) {
        console.log(`- Open on line ${tag.line}, col ${tag.col}: "${tag.text}"`);
    }
}

checkDetailed();
