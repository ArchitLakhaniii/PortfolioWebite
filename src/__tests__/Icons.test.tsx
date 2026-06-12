import { render } from "@testing-library/react";
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  ArrowIcon,
  DownloadIcon,
} from "@/components/Icons";

describe("Icons", () => {
  it("GitHubIcon renders an svg", () => {
    const { container } = render(<GitHubIcon />);
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("GitHubIcon applies custom className", () => {
    const { container } = render(<GitHubIcon className="custom-class" />);
    expect(container.querySelector("svg")).toHaveClass("custom-class");
  });

  it("LinkedInIcon renders an svg", () => {
    const { container } = render(<LinkedInIcon />);
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("MailIcon renders an svg", () => {
    const { container } = render(<MailIcon />);
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("ArrowIcon renders an svg", () => {
    const { container } = render(<ArrowIcon />);
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("DownloadIcon renders an svg", () => {
    const { container } = render(<DownloadIcon />);
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("all icons use currentColor stroke by default", () => {
    const icons = [GitHubIcon, LinkedInIcon, MailIcon, ArrowIcon, DownloadIcon];
    icons.forEach((Icon) => {
      const { container } = render(<Icon />);
      const svg = container.querySelector("svg")!;
      expect(svg.getAttribute("stroke")).toBe("currentColor");
    });
  });
});
