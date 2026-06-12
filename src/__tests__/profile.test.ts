import {
  profile,
  stats,
  projects,
  experience,
  skills,
  achievements,
  navLinks,
} from "@/data/profile";

describe("profile data", () => {
  it("has required personal fields", () => {
    expect(profile.name).toBe("Archit Lakhani");
    expect(profile.firstName).toBe("Archit");
    expect(profile.lastName).toBe("Lakhani");
    expect(profile.initials).toBe("AL");
    expect(profile.email).toContain("@");
    expect(profile.resumeUrl).toMatch(/^\/.*\.pdf$/);
  });

  it("has valid external links", () => {
    expect(profile.links.github).toMatch(/^https:\/\//);
    expect(profile.links.linkedin).toMatch(/^https:\/\//);
  });

  it("has a non-empty about array", () => {
    expect(Array.isArray(profile.about)).toBe(true);
    expect(profile.about.length).toBeGreaterThan(0);
    profile.about.forEach((p) => expect(typeof p).toBe("string"));
  });
});

describe("stats", () => {
  it("has at least one stat", () => {
    expect(stats.length).toBeGreaterThan(0);
  });

  it("every stat has value and label", () => {
    stats.forEach((s) => {
      expect(typeof s.value).toBe("string");
      expect(typeof s.label).toBe("string");
    });
  });
});

describe("projects", () => {
  it("has at least one project", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("every project has required fields", () => {
    projects.forEach((p) => {
      expect(typeof p.id).toBe("string");
      expect(typeof p.title).toBe("string");
      expect(typeof p.role).toBe("string");
      expect(typeof p.description).toBe("string");
      expect(Array.isArray(p.tags)).toBe(true);
      expect(Array.isArray(p.categories)).toBe(true);
      expect(typeof p.featured).toBe("boolean");
    });
  });

  it("all project ids are unique", () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("featured projects exist", () => {
    expect(projects.some((p) => p.featured)).toBe(true);
  });

  it("every category value is a valid enum member", () => {
    const valid = ["ai", "ios", "backend", "web", "startup", "research"];
    projects.forEach((p) => {
      p.categories.forEach((c) => expect(valid).toContain(c));
    });
  });

  it("optional github and link fields are valid URLs when present", () => {
    projects.forEach((p) => {
      if (p.github) expect(p.github).toMatch(/^https?:\/\//);
      if (p.link) expect(p.link).toMatch(/^https?:\/\//);
    });
  });
});

describe("experience", () => {
  it("has at least one entry", () => {
    expect(experience.length).toBeGreaterThan(0);
  });

  it("every entry has required fields", () => {
    experience.forEach((e) => {
      expect(typeof e.company).toBe("string");
      expect(typeof e.role).toBe("string");
      expect(typeof e.date).toBe("string");
      expect(typeof e.location).toBe("string");
      expect(Array.isArray(e.bullets)).toBe(true);
      expect(e.bullets.length).toBeGreaterThan(0);
    });
  });
});

describe("skills", () => {
  it("has at least one group", () => {
    expect(skills.length).toBeGreaterThan(0);
  });

  it("every group has a name and non-empty items", () => {
    skills.forEach((g) => {
      expect(typeof g.group).toBe("string");
      expect(Array.isArray(g.items)).toBe(true);
      expect(g.items.length).toBeGreaterThan(0);
    });
  });
});

describe("achievements", () => {
  it("has at least one achievement", () => {
    expect(achievements.length).toBeGreaterThan(0);
  });

  it("every achievement has title, detail, and tag", () => {
    achievements.forEach((a) => {
      expect(typeof a.title).toBe("string");
      expect(typeof a.detail).toBe("string");
      expect(typeof a.tag).toBe("string");
    });
  });
});

describe("navLinks", () => {
  it("has at least one link", () => {
    expect(navLinks.length).toBeGreaterThan(0);
  });

  it("every link has a label and href starting with #", () => {
    navLinks.forEach((l) => {
      expect(typeof l.label).toBe("string");
      expect(l.href).toMatch(/^#/);
    });
  });
});
