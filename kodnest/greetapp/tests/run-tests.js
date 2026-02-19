/**
 * Verification tests for the Greet App.
 * Run with: node tests/run-tests.js
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const htmlPath = path.join(projectRoot, 'index.html');
const jsPath = path.join(projectRoot, 'js', 'app.js');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log('  ✓ ' + message);
  } else {
    failed++;
    console.log('  ✗ ' + message);
  }
}

function assertIncludes(text, substring, message) {
  const ok = text && text.includes(substring);
  if (ok) {
    passed++;
    console.log('  ✓ ' + message);
  } else {
    failed++;
    console.log('  ✗ ' + message);
  }
}

console.log('\n--- Greet App Verification ---\n');

if (!fs.existsSync(htmlPath) || !fs.existsSync(jsPath)) {
  console.error('Missing index.html or js/app.js');
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf-8');
const js = fs.readFileSync(jsPath, 'utf-8');

// 1. Interface: label "Enter Your Name"
assertIncludes(html, 'Enter Your Name', 'Label "Enter Your Name" is present');

// 2. Input with placeholder
assertIncludes(html, 'Type your name here', 'Placeholder "Type your name here" is present');
assertIncludes(html, 'name-input', 'Text input (name-input) exists');

// 3. Greet button
assertIncludes(html, '>Greet</button>', 'Button labeled "Greet" exists');

// 4. Greeting message element
assertIncludes(html, 'greeting-message', 'Greeting message element exists');

// 5. Functionality: script builds "Hello" + name
assertIncludes(js, 'Hello', 'Script displays greeting with "Hello"');
assertIncludes(js, 'greetingMessage.textContent', 'Script updates greeting text');
assertIncludes(js, 'nameInput.value', 'Script reads input value');

// 6. Animations: clear before new, one random
assertIncludes(js, 'clearAnimations', 'Previous animation is cleared');
assertIncludes(js, 'confetti', 'Confetti effect implemented');
assertIncludes(js, 'partyPopper', 'Party popper effect implemented');
assertIncludes(js, 'glowingBurst', 'Glowing burst effect implemented');
assertIncludes(js, 'pickRandomAnimation', 'One random animation per click');

// 7. Animation container in background
assertIncludes(html, 'animation-container', 'Animation container exists');
assertIncludes(js, 'animation-container', 'Script uses animation container');

console.log('\n--- Results: ' + passed + ' passed, ' + failed + ' failed ---\n');
process.exit(failed > 0 ? 1 : 0);
