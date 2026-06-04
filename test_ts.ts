import * as ts from "typescript";

const rawJsx = `
const x = (
    <div id="test">
        <span>Hello</span>
    </div>
);
`;

const result = ts.transpileModule(rawJsx, {
    compilerOptions: {
        jsx: ts.JsxEmit.ReactJSX,
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ESNext,
    }
});

console.log(result.outputText);
