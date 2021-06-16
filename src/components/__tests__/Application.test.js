import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("defaults to Monday and changes the schedule when a new day is selected.", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const RenderedComponent = render(<Application />);

    await RenderedComponent.findByText("Monday").then(() => {
      const button = RenderedComponent.getByText('Tuesday')
      fireEvent.click(button)
      expect(RenderedComponent.getByText("Leopold Silvers")).toBeInTheDocument();
    })
  });
});
