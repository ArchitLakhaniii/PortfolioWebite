import { projectDetails, projectDetailSlugs, hasDetail } from "@/data/projectDetails";
import { projects, scenes } from "@/data/profile";

describe("projectDetails data", () => {
  const entries = Object.entries(projectDetails);

  it("has the expected 11 migrated projects", () => {
    expect(entries.length).toBe(11);
  });

  it("every detail has required fields", () => {
    entries.forEach(([key, d]) => {
      expect(d.slug).toBe(key); // slug matches its key
      expect(d.title.length).toBeGreaterThan(0);
      expect(d.role.length).toBeGreaterThan(0);
      expect(d.desc.length).toBeGreaterThan(0);
    });
  });

  it("all slugs are unique", () => {
    expect(new Set(projectDetailSlugs).size).toBe(projectDetailSlugs.length);
  });

  it("longDesc / appStructure blocks have valid shapes", () => {
    const valid = new Set(["heading", "paragraph", "list", "code"]);
    entries.forEach(([, d]) => {
      [...(d.longDesc ?? []), ...(d.appStructure ?? [])].forEach((b) => {
        expect(valid.has(b.type)).toBe(true);
        if (b.type === "list") {
          expect(Array.isArray(b.items)).toBe(true);
          expect(b.items.length).toBeGreaterThan(0);
        } else {
          expect(typeof (b as { text: string }).text).toBe("string");
        }
      });
    });
  });

  it("resource URLs are valid (http or rooted /public path)", () => {
    entries.forEach(([, d]) => {
      Object.values(d.resources ?? {}).forEach((url) => {
        expect(url).toMatch(/^(https?:\/\/|\/)/);
      });
    });
  });

  it("local asset resources point at /work/*", () => {
    expect(projectDetails["eunokinetix"].resources?.image).toBe("/work/eunokinetix.png");
    expect(projectDetails["text-to-sql"].resources?.pdf).toBe("/work/jio-internship-report.pdf");
    expect(projectDetails["nus-ml-nlp"].resources?.notebook).toBe(
      "/work/nus-internship-notebook.html"
    );
  });

  it("hasDetail reflects membership", () => {
    expect(hasDetail("gitgood")).toBe(true);
    expect(hasDetail("does-not-exist")).toBe(false);
  });

  it("every scene that maps to a detail uses a real slug", () => {
    scenes.forEach((s) => {
      if (hasDetail(s.id)) {
        expect(projectDetails[s.id]).toBeDefined();
      }
    });
  });

  it("every 'More work' project resolves to a detail page", () => {
    const sceneIds = new Set(scenes.map((s) => s.id));
    const moreWork = projects.filter((p) => !sceneIds.has(p.id));
    moreWork.forEach((p) => {
      expect(hasDetail(p.id)).toBe(true);
    });
  });

  it("the 6 featured project scenes all have detail pages", () => {
    const featuredScenes = scenes.filter((s) => s.kind === "project");
    featuredScenes.forEach((s) => expect(hasDetail(s.id)).toBe(true));
  });
});
