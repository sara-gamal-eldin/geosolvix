import * as ts from "typescript";
import * as fs from "fs";

function doAutoTranspile() {
    const file = "app/page.tsx";
    const code = fs.readFileSync(file, "utf8");
    const lines = code.split("\n");
    
    // Line 3680 is index 3679
    // Line 4228 is index 4227
    const rawJsxLines = lines.slice(3679, 4228);
    const rawJsxText = rawJsxLines.join("\n");
    
    console.log("Found raw JSX to transpile. Direct sample:");
    console.log(rawJsxLines.slice(0, 5).join("\n"));
    
    // Wrap the JSX in a function or assign to test it is parsed correctly as an expression
    const sourceText = `const temp = (\n${rawJsxText}\n);`;
    
    // Transpile using typescript compiler
    const result = ts.transpileModule(sourceText, {
        compilerOptions: {
            jsx: ts.JsxEmit.ReactJSX,
            target: ts.ScriptTarget.ES2022,
            module: ts.ModuleKind.ESNext,
        }
    });
    
    let transpiled = result.outputText;
    
    // Strip the imports added by compiler
    transpiled = transpiled.replace(/import\s+\{\s*jsx\s+as\s+_jsx\s*,\s*jsxs\s+as\s+_jsxs\s*\}\s*from\s*"react\/jsx-runtime";/g, "");
    transpiled = transpiled.replace(/import\s+\{\s*jsx\s+as\s+_jsx\s*\}\s*from\s*"react\/jsx-runtime";/g, "");
    transpiled = transpiled.replace(/import\s+\{\s*jsxs\s+as\s+_jsxs\s*\}\s*from\s*"react\/jsx-runtime";/g, "");
    
    // Strip "const temp = (" and ending ");"
    transpiled = transpiled.trim();
    transpiled = transpiled.replace(/^const temp = \(/, "");
    transpiled = transpiled.replace(/\);$/, "");
    transpiled = transpiled.trim();
    
    console.log("\nTranspiled successfully! Head sample:");
    console.log(transpiled.split("\n").slice(0, 8).join("\n"));
    
    // Replace the original lines 3680 to 4228 (indexes 3679 to 4227) in the lines array
    // Wait, the parent line 3679 is activeView === "tools" && (
    // We want: lines[3678] is activeView === "tools" && ...
    // Let's replace rawJsxLines in lines with transpiled
    lines.splice(3679, 4228 - 3679, transpiled);
    
    // Write back
    fs.writeFileSync(file, lines.join("\n"), "utf8");
    console.log("\nSuccessfully updated app/page.tsx with transpiled code!");
}

doAutoTranspile();
