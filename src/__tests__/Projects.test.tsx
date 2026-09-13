import { render, screen } from "@testing-library/react";
import Projects from "@/components/Projects";
import { projects } from "@/data/profile";
import { hasDetail } from "@/data/projectDetails";

beforeAll(() => {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof IntersectionObserver;
});

describe("Projects", () => {
  beforeEach(() => render(<Projects />));

  it("renders the centered Projects heading", () => {
    expect(screen.getByRole("heading", { level: 2, name: /projects/i })).toBeInTheDocument();
  });

  it("renders every project, FlashFind first", () => {
    const titles = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(titles).toEqual(projects.map((p) => p.title));
    expect(titles[0]).toBe("FlashFind");
  });

  it("renders every project description and role", () => {
    projects.forEach((p) => {
      expect(screen.getByText(p.description)).toBeInTheDocument();
      expect(screen.getAllByText(p.role).length).toBeGreaterThan(0);
    });
  });

  it("links each project with a case study to its page", () => {
    projects
      .filter((p) => hasDetail(p.id))
      .forEach((p) => {
        const link = screen.getByRole("link", { name: new RegExp(`${p.title} case study`, "i") });
        expect(link).toHaveAttribute("href", `/work/${p.id}`);
      });
  });

  it("links GitHub sources where present", () => {
    projects
      .filter((p) => p.github)
      .forEach((p) => {
        const link = screen.getByRole("link", { name: new RegExp(`${p.title} on GitHub`, "i") });
        expect(link).toHaveAttribute("href", p.github);
      });
  });
});
