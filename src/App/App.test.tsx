import { expect, test, describe } from "vitest";
import { render } from "vitest-browser-react";
import { App } from "./App.tsx";

describe("renders the application layout structure", () => {
  test("renders the layout header", async () => {
    const { getByRole } = await render(<App />);
    const headerElement = getByRole("banner");
    const imageElement = getByRole("img");
    await expect.element(headerElement).toBeInTheDocument();
    await expect.element(headerElement).toContainElement(imageElement);
    await expect
      .element(imageElement)
      .toHaveAttribute("alt", "rick and morthy header title");
  });

  test("renders the layout content container", async () => {
    const { getByRole } = await render(<App />);
    await expect.element(getByRole("main")).toBeInTheDocument();
  });

  test("renders the layout footer", async () => {
    const { getByRole } = await render(<App />);
    const footerElement = getByRole("contentinfo");
    await expect.element(footerElement).toBeInTheDocument();
    await expect
      .element(footerElement)
      .toHaveTextContent("by Cristina Chiu-Cucu 2025");
  });
});
