import { render, screen } from "@testing-library/react";
import Achievements from "@/components/Achievements";
import { achievements } from "@/data/profile";

beforeAll(() => {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof IntersectionObserver;
});

describe("Achievements", () => {
  beforeEach(() => render(<Achievements />));

  it("renders the section heading", () => {
    expect(screen.getByRole("heading", { name: /recognition/i })).toBeInTheDocument();
  });

  it("renders every achievement title", () => {
    achievements.forEach((a) => {
      expect(screen.getByText(a.title)).toBeInTheDocument();
    });
  });

  it("renders every achievement detail", () => {
    achievements.forEach((a) => {
      expect(screen.getByText(a.detail)).toBeInTheDocument();
    });
  });

  it("renders every tag in uppercase", () => {
    // Multiple achievements may share the same tag (e.g. "RESEARCH")
    achievements.forEach((a) => {
      const matches = screen.getAllByText(a.tag.toUpperCase());
      expect(matches.length).toBeGreaterThan(0);
    });
  });
});
