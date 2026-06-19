@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Outfit", sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}

/* Custom transitions and scrollbar overrides */
::selection {
  background-color: rgba(139, 92, 246, 0.3);
  color: #4c1d95;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(139, 92, 246, 0.25);
  border-radius: 99px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(139, 92, 246, 0.4);
}

/* Dynamic pop up transition hover & active effects for all clickable buttons */
button:not(:disabled),
input[type="submit"]:not(:disabled),
input[type="button"]:not(:disabled),
[role="button"]:not(:disabled) {
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
}

button:not(:disabled):hover,
input[type="submit"]:not(:disabled):hover,
input[type="button"]:not(:disabled):hover,
[role="button"]:not(:disabled):hover {
  transform: scale(1.04) translateY(-2px);
  filter: brightness(1.05);
  box-shadow: 0 10px 20px -3px rgba(139, 92, 246, 0.15), 0 4px 8px -4px rgba(139, 92, 246, 0.15);
}

button:not(:disabled):active,
input[type="submit"]:not(:disabled):active,
input[type="button"]:not(:disabled):active,
[role="button"]:not(:disabled):active {
  transform: scale(0.96) translateY(0);
  filter: brightness(0.95);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.05);
}

