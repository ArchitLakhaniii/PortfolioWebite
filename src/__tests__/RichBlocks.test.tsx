import { render, screen } from "@testing-library/react";
import RichBlocks, { RichText } from "@/components/detail/RichBlocks";
import type { DetailBlock } from "@/data/projectDetails";

describe("RichText (safe inline markup)", () => {
  it("renders plain text", () => {
    render(<RichText text="hello world" />);
    expect(screen.getByText("hello world")).toBeInTheDocument();
  });

  it("renders **bold** as a <strong>", () => {
    const { container } = render(<RichText text="see **Tech Stack:** Python" />);
    const strong = container.querySelector("strong");
    expect(strong).not.toBeNull();
    expect(strong).toHaveTextContent("Tech Stack:");
  });

  it("renders `code` as a <code> element", () => {
    const { container } = render(<RichText text="call `/api/ingest` now" />);
    const code = container.querySelector("code");
    expect(code).not.toBeNull();
    expect(code).toHaveTextContent("/api/ingest");
  });

  it("never injects raw HTML", () => {
    const { container } = render(<RichText text="<img src=x onerror=alert(1)>" />);
    // the angle-bracket text is rendered as text, not as an element
    expect(container.querySelector("img")).toBeNull();
    expect(container).toHaveTextContent("<img src=x onerror=alert(1)>");
  });
});

describe("RichBlocks", () => {
  const blocks: DetailBlock[] = [
    { type: "heading", text: "Overview" },
    { type: "paragraph", text: "A paragraph." },
    { type: "list", items: ["first", "second"] },
    { type: "code", text: "line1\nline2" },
  ];

  beforeEach(() => render(<RichBlocks blocks={blocks} />));

  it("renders a heading", () => {
    expect(screen.getByRole("heading", { name: "Overview" })).toBeInTheDocument();
  });

  it("renders a paragraph", () => {
    expect(screen.getByText("A paragraph.")).toBeInTheDocument();
  });

  it("renders list items", () => {
    expect(screen.getByText("first")).toBeInTheDocument();
    expect(screen.getByText("second")).toBeInTheDocument();
  });

  it("renders a code block preserving newlines", () => {
    expect(screen.getByText(/line1/)).toBeInTheDocument();
  });
});
