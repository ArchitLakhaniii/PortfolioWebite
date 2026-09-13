import { render, screen, fireEvent, within } from "@testing-library/react";
import Experience from "@/components/Experience";
import { experience, projects } from "@/data/profile";
import { hasDetail } from "@/data/projectDetails";

beforeAll(() => {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof IntersectionObserver;
});

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const rowFor = (company: string) =>
  screen.getByRole("button", { name: new RegExp(escape(company)) });

describe("Experience", () => {
  beforeEach(() => render(<Experience />));

  it("renders the section heading", () => {
    expect(screen.getByRole("heading", { level: 2, name: /experience/i })).toBeInTheDocument();
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
      expect(screen.getAllByText(e.location).length).toBeGreaterThan(0);
    });
  });

  it("renders every date string", () => {
    experience.forEach((e) => {
      expect(screen.getAllByText(e.date).length).toBeGreaterThan(0);
    });
  });

  it("lists MBZUAI first", () => {
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveTextContent(experience[0].company);
    expect(experience[0].company).toMatch(/MBZUAI/);
  });

  it("gives every role its own opening animation", () => {
    const effects = experience.map((e) => e.open);
    effects.forEach((fx) => expect(fx).toBeDefined());
    expect(new Set(effects).size).toBe(effects.length);
    expect(effects[0]).toBe("genie");
  });

  it("opens a window with each role's bullets and metrics, then closes it", () => {
    experience.forEach((e) => {
      fireEvent.click(rowFor(e.company));
      const dialog = screen.getByRole("dialog", { name: e.role });
      e.bullets.forEach((b) => expect(within(dialog).getByText(b)).toBeInTheDocument());
      e.metrics?.forEach((m) => {
        expect(within(dialog).getByText(m.value)).toBeInTheDocument();
        expect(within(dialog).getByText(m.label)).toBeInTheDocument();
      });
      fireEvent.click(within(dialog).getByRole("button", { name: /close/i }));
      expect(screen.queryByRole("dialog")).toBeNull();
    });
  });

  it("closes the window with Escape", () => {
    fireEvent.click(rowFor(experience[0].company));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("offers a Read more link on rows that have a related page, and only those", () => {
    const withPage = experience.filter((e) => e.caseStudy && hasDetail(e.caseStudy));
    const links = screen.getAllByRole("link", { name: /read more/i });
    expect(links).toHaveLength(withPage.length);
    withPage.forEach((e) => {
      const title = projects.find((p) => p.id === e.caseStudy)!.title;
      const link = screen.getByRole("link", {
        name: new RegExp(`read more: ${escape(title)} case study`, "i"),
      });
      expect(link).toHaveAttribute("href", `/work/${e.caseStudy}`);
    });
  });

  it("links to the related case study when there is one", () => {
    const withCase = experience.filter((e) => e.caseStudy && hasDetail(e.caseStudy));
    expect(withCase.length).toBeGreaterThan(0);
    withCase.forEach((e) => {
      fireEvent.click(rowFor(e.company));
      const link = within(screen.getByRole("dialog")).getByRole("link", { name: /case study/i });
      expect(link).toHaveAttribute("href", `/work/${e.caseStudy}`);
      fireEvent.keyDown(document, { key: "Escape" });
    });
  });
});
