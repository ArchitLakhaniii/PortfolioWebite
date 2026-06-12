import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Nav from "@/components/Nav";
import { navLinks, profile } from "@/data/profile";

beforeAll(() => {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof IntersectionObserver;
});

describe("Nav", () => {
  it("renders the initials logo", () => {
    render(<Nav />);
    expect(screen.getByText(profile.initials, { exact: false })).toBeInTheDocument();
  });

  it("renders all nav links", () => {
    render(<Nav />);
    navLinks.forEach((l) => {
      const links = screen.getAllByRole("link", { name: l.label });
      expect(links.length).toBeGreaterThan(0);
    });
  });

  it("each nav link points to the correct href", () => {
    render(<Nav />);
    navLinks.forEach((l) => {
      const links = screen.getAllByRole("link", { name: l.label });
      links.forEach((a) => expect(a).toHaveAttribute("href", l.href));
    });
  });

  it("renders the 'Get in touch' link as a mailto", () => {
    render(<Nav />);
    const contactLinks = screen.getAllByRole("link", { name: /get in touch/i });
    contactLinks.forEach((a) =>
      expect(a).toHaveAttribute("href", `mailto:${profile.email}`)
    );
  });

  it("renders the desktop nav list", () => {
    render(<Nav />);
    expect(screen.queryByRole("list")).not.toBeNull();
  });

  it("toggles mobile menu open and closed", async () => {
    const user = userEvent.setup();
    render(<Nav />);
    const toggle = screen.getByRole("button", { name: /toggle menu/i });

    // Initially closed — no mobile "Get in touch →" entry
    expect(screen.queryByText("Get in touch →")).toBeNull();

    await user.click(toggle);
    expect(screen.getByText("Get in touch →")).toBeInTheDocument();

    await user.click(toggle);
    expect(screen.queryByText("Get in touch →")).toBeNull();
  });

  it("closes mobile menu when a nav link is clicked", async () => {
    const user = userEvent.setup();
    render(<Nav />);
    const toggle = screen.getByRole("button", { name: /toggle menu/i });
    await user.click(toggle);

    // Click the last matching (mobile) nav link
    const mobileLinks = screen.getAllByRole("link", { name: navLinks[0].label });
    await user.click(mobileLinks[mobileLinks.length - 1]);

    expect(screen.queryByText("Get in touch →")).toBeNull();
  });
});
