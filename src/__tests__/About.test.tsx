import { render, screen } from "@testing-library/react";
import About from "@/components/About";
import { profile } from "@/data/profile";

beforeAll(() => {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof IntersectionObserver;
});

describe("About", () => {
  beforeEach(() => render(<About />));

  it("renders the section heading", () => {
    expect(screen.getByRole("heading", { name: "About" })).toBeInTheDocument();
  });

  it("renders every about paragraph", () => {
    profile.about.forEach((para) => {
      expect(screen.getByText(para)).toBeInTheDocument();
    });
  });

  it("renders the institution fact", () => {
    expect(screen.getByText("Georgia Tech College of Computing")).toBeInTheDocument();
  });

  it("renders the GPA fact", () => {
    expect(screen.getByText("4.00 / 4.00")).toBeInTheDocument();
  });

  it("renders fact key labels", () => {
    // The component renders keys as-is; CSS `uppercase` makes them visually uppercase
    ["institution", "degree", "gpa", "graduation", "focus"].forEach((key) => {
      expect(screen.getByText(key)).toBeInTheDocument();
    });
  });
});
