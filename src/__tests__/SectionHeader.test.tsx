import { render, screen } from "@testing-library/react";
import SectionHeader from "@/components/SectionHeader";

// Reveal uses IntersectionObserver — stub it
beforeAll(() => {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof IntersectionObserver;
});

describe("SectionHeader", () => {
  it("renders the section number", () => {
    render(<SectionHeader num="01" title="About" />);
    expect(screen.getByText("01")).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(<SectionHeader num="01" title="About" />);
    expect(screen.getByRole("heading", { name: "About" })).toBeInTheDocument();
  });

  it("renders the optional sub text when provided", () => {
    render(<SectionHeader num="02" title="Projects" sub="A subtitle" />);
    expect(screen.getByText("A subtitle")).toBeInTheDocument();
  });

  it("does not render sub text when omitted", () => {
    const { queryByText } = render(<SectionHeader num="03" title="Experience" />);
    expect(queryByText(/A subtitle/)).toBeNull();
  });
});
