import { render, screen } from "@testing-library/react";
import Skills from "@/components/Skills";
import { skills } from "@/data/profile";

beforeAll(() => {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof IntersectionObserver;
});

describe("Skills", () => {
  beforeEach(() => render(<Skills />));

  it("renders the section heading", () => {
    expect(screen.getByRole("heading", { name: /toolkit/i })).toBeInTheDocument();
  });

  it("renders every skill group name", () => {
    // Group names are rendered as-is; CSS `uppercase` makes them visually uppercase
    skills.forEach((g) => {
      expect(screen.getByText(g.group)).toBeInTheDocument();
    });
  });

  it("renders every skill item", () => {
    skills.forEach((g) => {
      g.items.forEach((item) => {
        expect(screen.getByText(item)).toBeInTheDocument();
      });
    });
  });
});
