import { render, screen } from "@testing-library/react";
import Reveal from "@/components/Reveal";

// framer-motion is mocked (see __mocks__/framer-motion.js) so Reveal renders
// its children synchronously without animation side effects.

describe("Reveal", () => {
  it("renders children", () => {
    render(
      <Reveal>
        <span>hello</span>
      </Reveal>
    );
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("forwards an extra className to the wrapper", () => {
    const { container } = render(<Reveal className="mb-10">content</Reveal>);
    expect(container.firstChild).toHaveClass("mb-10");
  });

  it("renders with a custom delay without error", () => {
    render(<Reveal delay={200}>delayed</Reveal>);
    expect(screen.getByText("delayed")).toBeInTheDocument();
  });

  it("renders with a custom y offset without error", () => {
    render(<Reveal y={50}>offset</Reveal>);
    expect(screen.getByText("offset")).toBeInTheDocument();
  });
});
