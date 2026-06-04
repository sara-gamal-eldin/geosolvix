import * as fs from "fs";

function countTags() {
    const file = "app/page.tsx";
    const code = fs.readFileSync(file, "utf8");
    const lines = code.split("\n");
    
    // Extract range (lines 3680 to 4228) -> 0-indexed: 3679 to 4227
    const rangeLines = lines.slice(3679, 4228);
    const rangeText = rangeLines.join("\n");
    
    // Simple regex tags count
    const openDivs = (rangeText.match(/<div(\s|>)/gi) || []).length;
    const closeDivs = (rangeText.match(/<\/div>/gi) || []).length;
    
    console.log("Raw JSX div check:");
    console.log("Open <div>:", openDivs);
    console.log("Close </div>:", closeDivs);
    
    // Other tags
    const otherTags = ["span", "button", "h1", "h2", "h3", "h4", "p", "form", "select", "option", "label", "strong"];
    for (const tag of otherTags) {
        const o = (rangeText.match(new RegExp(`<${tag}(\\s|>)`, "gi")) || []).length;
        const c = (rangeText.match(new RegExp(`</${tag}>`, "gi")) || []).length;
        if (o !== c) {
            console.log(`Mismatch in tag <${tag}>: open=${o}, close=${c}`);
        }
    }
}

countTags();
