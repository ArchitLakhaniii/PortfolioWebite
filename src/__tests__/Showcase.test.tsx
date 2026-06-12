import { render, screen } from "@testing-library/react";
import Showcase from "@/components/showcase/Showcase";
import { projects, scenes } from "@/data/profile";
import { hasDetail } from "@/data/projectDetails";

// framer-motion is mocked and jest.setup's matchMedia stub returns
// matches: false, so every Scene renders its static (mobile) variant.

describe("Showcase", () => {
  beforeEach(() => render(<Showcase />));

  it("renders the section heading", () => {
    expect(
      screen.getByRole("heading", { name: /selected work/i })
    ).toBeInTheDocument();
  });

  it("renders every scene title as a heading", () => {
    scenes.forEach((s) => {
      expect(screen.getByRole("heading", { name: s.title })).toBeInTheDocument();
    });
  });

  it("renders every scene subtitle", () => {
    scenes.forEach((s) => {
      expect(screen.getAllByText(s.subtitle).length).toBeGreaterThan(0);
    });
  });

  it("renders every scene summary", () => {
    scenes.forEach((s) => {
      expect(screen.getByText(s.summary)).toBeInTheDocument();
    });
  });

  it("renders all scene metrics", () => {
    scenes.forEach((s) => {
      s.metrics?.forEach((m) => {
        expect(screen.getByText(m.value)).toBeInTheDocument();
        expect(screen.getByText(m.label)).toBeInTheDocument();
      });
    });
  });

  it("renders GitHub source links for scenes that have one", () => {
    scenes
      .filter((s) => s.github)
      .forEach((s) => {
        const link = screen.getByRole("link", {
          name: new RegExp(`${s.title} on GitHub`, "i"),
        });
        expect(link).toHaveAttribute("href", s.github);
      });
  });

  it("lists non-scene projects in the 'More work' index", () => {
    const sceneIds = new Set(scenes.map((s) => s.id));
    const moreWork = projects.filter((p) => !sceneIds.has(p.id));
    expect(moreWork.length).toBeGreaterThan(0);
    expect(screen.getByText(/more work/i)).toBeInTheDocument();
    moreWork.forEach((p) => {
      expect(screen.getByText(p.title)).toBeInTheDocument();
      // role strings may also appear as a scene subtitle (e.g. shared roles)
      expect(screen.getAllByText(p.role).length).toBeGreaterThan(0);
    });
  });

  it("does not duplicate scene-covered projects in the 'More work' index", () => {
    // GitGood is a scene — its title should appear exactly once (the scene heading)
    expect(screen.getAllByText("GitGood")).toHaveLength(1);
  });

  it("renders a 'View details' link for every scene that has a case study", () => {
    const withDetail = scenes.filter((s) => hasDetail(s.id));
    expect(withDetail.length).toBeGreaterThan(0);
    const links = screen.getAllByRole("link", { name: /view details/i });
    expect(links).toHaveLength(withDetail.length);
    links.forEach((a) => expect(a.getAttribute("href")).toMatch(/^\/work\//));
  });

  it("links each 'More work' project to its case-study page", () => {
    const sceneIds = new Set(scenes.map((s) => s.id));
    const moreWork = projects.filter((p) => !sceneIds.has(p.id));
    moreWork.forEach((p) => {
      if (!hasDetail(p.id)) return;
      const link = screen.getByRole("link", { name: new RegExp(`${p.title} case study`, "i") });
      expect(link).toHaveAttribute("href", `/work/${p.id}`);
    });
  });
});
