import { render, screen } from "@testing-library/react";
import Experience from "@/components/Experience";
import { experience } from "@/data/profile";

beforeAll(() => {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof IntersectionObserver;
});

describe("Experience", () => {
  beforeEach(() => render(<Experience />));

  it("renders the section heading", () => {
    expect(screen.getByRole("heading", { name: /experience/i })).toBeInTheDocument();
  });

  it("renders every company name", () => {
    experience.forEach((e) => {
      expect(screen.getByText(e.company)).toBeInTheDocument();
    });
  });

  it("renders every role title", () => {
    experience.forEach((e) => {
      expect(screen.getByText(e.role)).toBeInTheDocument();
    });
  });

  it("renders every location", () => {
    // Multiple roles may share the same location (e.g. "Atlanta, GA")
    experience.forEach((e) => {
      const matches = screen.getAllByText(e.location);
      expect(matches.length).toBeGreaterThan(0);
    });
  });

  it("renders every date string", () => {
    experience.forEach((e) => {
      // getAllByText handles cases where multiple roles share the same date string
      const matches = screen.getAllByText(e.date);
      expect(matches.length).toBeGreaterThan(0);
    });
  });

  it("renders bullet points for each role", () => {
    experience.forEach((e) => {
      e.bullets.forEach((b) => {
        expect(screen.getByText(b)).toBeInTheDocument();
      });
    });
  });
});
