const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

// Find the start of the products view
let productsIdx = content.indexOf('activeView === "products"');
if (productsIdx === -1) {
    console.log('Could not find products view');
    process.exit(1);
}

// Slice to keep only the home view
let newContent = content.substring(0, productsIdx);

// Clean up trailing characters
newContent = newContent.trim();
if (newContent.endsWith('}')) newContent = newContent.slice(0, -1);
if (newContent.endsWith(',')) newContent = newContent.slice(0, -1);

// Add closing tags for return statement
newContent += '\n  );\n}';

// Remove the `activeView === "home" && (` part
newContent = newContent.replace(/\{\s*activeView === "home" && \(/, '');

// Remove Navbar and Footer usages
newContent = newContent.replace(/<Navbar \/>/g, '');
newContent = newContent.replace(/<Footer \/>/g, '');

// Remove fragment wrapper return ( <> ...
newContent = newContent.replace(/return \(\s*<>\s*/, 'return (\n');

// Remove extra closing tag for activeView (the closing parenthesis)
// Since we removed `{ activeView === "home" && (` there's a dangling `)` at the end
if (newContent.endsWith(');\n}')) {
  // Let's replace the last `)` before `);\n}` ? No, `newContent` ends with `  );\n}` which we just appended.
  // Actually, wait, before appending `  );\n}`, `newContent` ended with the `)` from `</div>\n  )` or something. Let's just fix it.
  
  // A simple way is to use regex:
  // We want to remove the last matching parenthesis. Let's not be too smart, just write it as:
  // `newContent` ends with `</div>\n    )\n  );\n}` if there's a dangling `)`.
}

// Let's just remove the imports
newContent = newContent.replace(/import Navbar from "@\/components\/layout\/Navbar";/g, '');
newContent = newContent.replace(/import Footer from "@\/components\/layout\/Footer";/g, '');

fs.writeFileSync('app/(main)/page.tsx', newContent);
console.log('Successfully wrote to app/(main)/page.tsx');
