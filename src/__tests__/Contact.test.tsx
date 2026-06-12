import { render, screen } from "@testing-library/react";
import Contact from "@/components/Contact";
import { profile } from "@/data/profile";

beforeAll(() => {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof IntersectionObserver;
});

describe("Contact", () => {
  beforeEach(() => render(<Contact />));

  it("renders the heading", () => {
    expect(screen.getByRole("heading", { name: /let's build something/i })).toBeInTheDocument();
  });

  it("renders the 'Get in Touch' mailto link", () => {
    const link = screen.getByRole("link", { name: /get in touch/i });
    expect(link).toHaveAttribute("href", `mailto:${profile.email}`);
  });

  it("renders the 'Download Resume' link", () => {
    const link = screen.getByRole("link", { name: /download resume/i });
    expect(link).toHaveAttribute("href", profile.resumeUrl);
  });

  it("renders the GitHub link", () => {
    const link = screen.getByRole("link", { name: /github/i });
    expect(link).toHaveAttribute("href", profile.links.github);
  });

  it("renders the LinkedIn link", () => {
    const link = screen.getByRole("link", { name: /linkedin/i });
    expect(link).toHaveAttribute("href", profile.links.linkedin);
  });

  it("renders the email address text", () => {
    expect(screen.getByText(profile.email)).toBeInTheDocument();
  });
});
