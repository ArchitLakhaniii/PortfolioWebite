import { render, screen } from "@testing-library/react";
import Hero from "@/components/Hero";
import { profile, stats } from "@/data/profile";

beforeAll(() => {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof IntersectionObserver;
});

describe("Hero", () => {
  beforeEach(() => render(<Hero />));

  it("renders the first name", () => {
    expect(screen.getByText(profile.firstName)).toBeInTheDocument();
  });

  it("renders the last name", () => {
    expect(screen.getByText(profile.lastName)).toBeInTheDocument();
  });

  it("renders the availability badge", () => {
    expect(screen.getByText(profile.availability)).toBeInTheDocument();
  });

  it("renders the tagline", () => {
    expect(screen.getByText(profile.tagline)).toBeInTheDocument();
  });

  it("renders the eyebrow in uppercase", () => {
    expect(screen.getByText(profile.eyebrow.toUpperCase())).toBeInTheDocument();
  });

  it("links to projects section", () => {
    const link = screen.getByRole("link", { name: /view work/i });
    expect(link).toHaveAttribute("href", "#projects");
  });

  it("links to resume download", () => {
    const link = screen.getByRole("link", { name: /resume/i });
    expect(link).toHaveAttribute("href", profile.resumeUrl);
  });

  it("renders all stats", () => {
    stats.forEach((s) => {
      expect(screen.getByText(s.value)).toBeInTheDocument();
      expect(screen.getByText(s.label)).toBeInTheDocument();
    });
  });

  it("renders the GitHub link with correct href", () => {
    const link = screen.getByRole("link", { name: /github/i });
    expect(link).toHaveAttribute("href", profile.links.github);
  });

  it("renders the LinkedIn link with correct href", () => {
    const link = screen.getByRole("link", { name: /linkedin/i });
    expect(link).toHaveAttribute("href", profile.links.linkedin);
  });

  it("renders the mailto link", () => {
    const link = screen.getByRole("link", { name: /email/i });
    expect(link).toHaveAttribute("href", `mailto:${profile.email}`);
  });
});
