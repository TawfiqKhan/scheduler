import React from "react";

import {
  render,
  cleanup,
  fireEvent,
  getByText,
  prettyDOM,
  findByText,
  getByAltText,
  getByTestId,
  getAllByTestId,
  queryByText,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const renderedComponent = render(<Application />);
    await renderedComponent.findByText("Monday")
    const button = renderedComponent.getByText('Tuesday')
    fireEvent.click(button)
    expect(renderedComponent.getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await findByText(container, "Archie Cohen")
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0]
    fireEvent.click(getByAltText(appointment, "Add"))
    fireEvent.change(getByTestId(appointment, "student-name-input"), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))
    fireEvent.click(getByText(appointment, "Save"))
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();
    await findByText(appointment, "Lydia Miller-Jones")
    // queryByText returns null if it cant find the element.getByText will not work for the below test.
    expect(queryByText(appointment, "Saving...")).toBeNull();
    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the application
    const { container, debug } = render(<Application />)
    // 2. Wait until the text 'Archie Cohen' is displayed
    // 3. find the appointment containing archie Cohen
    // 4. click on the delete button(img)
    // 5. clicking on the button should display confirmation component
    // 6. confirming delete should set the interview as null
    // 7. Check that the element with the text "Deleting" is displayed.
    // 8. Wait until the element with the "Add" button is displayed.
    // 9 Check that the DayListItem with the text "Monday" also has the text "2 spots remaining"
  })
});
