import { scenes, projects } from "@/data/profile";

describe("scenes data", () => {
  it("has at least one scene", () => {
    expect(scenes.length).toBeGreaterThan(0);
  });

  it("every scene has required fields", () => {
    scenes.forEach((s) => {
      expect(typeof s.id).toBe("string");
      expect(["project", "role"]).toContain(s.kind);
      expect(typeof s.kicker).toBe("string");
      expect(typeof s.title).toBe("string");
      expect(typeof s.subtitle).toBe("string");
      expect(typeof s.summary).toBe("string");
      expect(s.summary.length).toBeGreaterThan(0);
      expect(Array.isArray(s.tags)).toBe(true);
      expect(s.tags.length).toBeGreaterThan(0);
    });
  });

  it("all scene ids are unique", () => {
    const ids = scenes.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("hue is a valid 0-360 number", () => {
    scenes.forEach((s) => {
      expect(s.hue).toBeGreaterThanOrEqual(0);
      expect(s.hue).toBeLessThanOrEqual(360);
    });
  });

  it("metrics, when present, have value and label", () => {
    scenes.forEach((s) => {
      s.metrics?.forEach((m) => {
        expect(m.value.length).toBeGreaterThan(0);
        expect(m.label.length).toBeGreaterThan(0);
      });
    });
  });

  it("github links, when present, are valid URLs", () => {
    scenes.forEach((s) => {
      if (s.github) expect(s.github).toMatch(/^https?:\/\//);
    });
  });

  it("project-kind scenes reference existing project ids", () => {
    const projectIds = new Set(projects.map((p) => p.id));
    scenes
      .filter((s) => s.kind === "project")
      .forEach((s) => {
        expect(projectIds.has(s.id)).toBe(true);
      });
  });

  it("featured projects are all covered by scenes", () => {
    const sceneIds = new Set(scenes.map((s) => s.id));
    projects
      .filter((p) => p.featured)
      .forEach((p) => {
        expect(sceneIds.has(p.id)).toBe(true);
      });
  });
});
