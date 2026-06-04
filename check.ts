import * as fs from "fs";

function scan() {
    const file = "app/page.tsx";
    const code = fs.readFileSync(file, "utf8");
    
    const stack: { char: string; line: number; col: number; pos: number }[] = [];
    let state = "normal"; // normal, string_double, string_single, string_template, comment_block, comment_line
    
    let line = 1;
    let col = 1;
    
    for (let i = 0; i < code.length; i++) {
        const c = code[i];
        const next = code[i + 1] || "";
        const prev = code[i - 1] || "";
        
        // Update line/col
        const currentLine = line;
        const currentCol = col;
        if (c === "\n") {
            line++;
            col = 1;
        } else {
            col++;
        }
        
        if (state === "normal") {
            if (c === "/" && next === "/") {
                state = "comment_line";
                i++;
                col++;
            } else if (c === "/" && next === "*") {
                state = "comment_block";
                i++;
                col++;
            } else if (c === '"') {
                state = "string_double";
            } else if (c === "'") {
                state = "string_single";
            } else if (c === "`") {
                state = "string_template";
            } else if (c === "{" || c === "[" || c === "(") {
                stack.push({ char: c, line: currentLine, col: currentCol, pos: i });
            } else if (c === "}" || c === "]" || c === ")") {
                if (stack.length === 0) {
                    console.log(`Unmatched closing ${c} on line ${currentLine}, col ${currentCol}`);
                } else {
                    const last = stack[stack.length - 1];
                    const matches = (last.char === "{" && c === "}") ||
                                    (last.char === "[" && c === "]") ||
                                    (last.char === "(" && c === ")");
                    if (matches) {
                        stack.pop();
                    } else {
                        console.log(`Mismatched ${c} on line ${currentLine}, col ${currentCol}. Expected matching close for ${last.char} from line ${last.line}, col ${last.col}`);
                        // Pop anyway to prevent cascade
                        stack.pop();
                    }
                }
            }
        } else if (state === "comment_line") {
            if (c === "\n") {
                state = "normal";
            }
        } else if (state === "comment_block") {
            if (c === "*" && next === "/") {
                state = "normal";
                i++;
                col++;
            }
        } else if (state === "string_double") {
            if (c === '"' && prev !== "\\") {
                state = "normal";
            }
        } else if (state === "string_single") {
            if (c === "'" && prev !== "\\") {
                state = "normal";
            }
        } else if (state === "string_template") {
            if (c === "`" && prev !== "\\") {
                state = "normal";
            }
        }
    }
    
    console.log("Scan complete. Stack length remaining:", stack.length);
    if (stack.length > 0) {
        console.log("Unclosed elements remaining (top 15):");
        for (let j = Math.max(0, stack.length - 15); j < stack.length; j++) {
            const item = stack[j];
            console.log(`- ${item.char} on line ${item.line}, col ${item.col} (char pos ${item.pos})`);
        }
    }
}

scan();
