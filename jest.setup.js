import "@testing-library/jest-dom";

// jsdom doesn't implement matchMedia; components use it to detect desktop.
// matches: false → tests always render the static (mobile) variants.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
