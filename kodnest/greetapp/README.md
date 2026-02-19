# Greet App

A modern greeting web application with celebration-style background animations.

## Features

- **Interface**: Centered card with "Enter Your Name" label, text input (placeholder: "Type your name here"), and a "Greet" button.
- **Functionality**: Clicking "Greet" shows **"Hello [entered name]"** below the button.
- **Background animations** (one random per click, no overlap):
  - Confetti effect
  - Party popper effect
  - Glowing burst effect

## Run locally

1. Open `index.html` in a browser, or
2. Use a local server (recommended):
   ```bash
   npm start
   ```
   Then open http://localhost:3000

## Tests

```bash
npm test
```

## Project structure

```
greetApp/
├── index.html      # Main page
├── css/
│   └── styles.css  # Layout and styling
├── js/
│   └── app.js      # Greeting logic and animations
├── tests/
│   └── run-tests.js # Verification tests
├── package.json
└── README.md
```
