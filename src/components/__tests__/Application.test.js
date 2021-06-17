import React from "react";
import axios from "axios";

import {
  render,
  cleanup,
  fireEvent,
  getByText,
  getByRole,
  getAllByRole,
  prettyDOM,
  findByText,
  getByAltText,
  queryByAltText,
  getByTestId,
  getAllByTestId,
  queryByText,
  findByAltText,
  queryByRole,
  waitForElement
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
    // 2. Wait until the text 'Archie Cohen' is displayeds
    await findByText(container, "Archie Cohen")
    // 3. find the appointment containing archie Cohen
    const appointment = getAllByTestId(container, "appointment")
      .find(appointment => queryByText(appointment, "Archie Cohen"))
    // 4. click on the delete button(img) 
    fireEvent.click(getByAltText(appointment, "Delete"))
    // 5. clicking on the button should display confirmation component
    expect(getByText(appointment, "Are you sure you would like to Delete?")).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"))
    // 6. Check that the element with the text "Deleting" is displayed once Confirm button is clicked.
    expect(getByText(appointment, "Deleting...")).toBeInTheDocument();
    // 7. Wait until the element with the "Add" button is displayed.
    await findByAltText(appointment, "Add")
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))
    // 8 Check that the DayListItem with the text "Monday" also has the text "2 spots remaining"
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  })

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container, debug } = render(<Application />)
    await findByText(container, "Archie Cohen")
    const appointment = getAllByTestId(container, "appointment")
      .find(appointment => queryByText(appointment, "Archie Cohen"))
    fireEvent.click(getByAltText(appointment, "Edit"))
    fireEvent.change(getByTestId(appointment, "student-name-input"), {
      target: { value: "Jane Doe" }
    });
    fireEvent.click(getByText(appointment, "Save"))
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();
    await findByText(appointment, "Jane Doe")
    expect(getByText(appointment, "Jane Doe")).toBeInTheDocument();
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  })

  it("can cancel an edit or delete operation after initiated", async () => {
    const { container, debug } = render(<Application />)
    await findByText(container, "Archie Cohen")
    // Select the appointment element
    const appointment = getAllByTestId(container, "appointment")
      .find(appointment => queryByText(appointment, "Archie Cohen"))

    // Testing cancelling a delete operation
    fireEvent.click(getByAltText(appointment, "Delete"))
    expect(getByText(appointment, "Are you sure you would like to Delete?")).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Cancel"))
    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();

    // Testing cancelling an edit operation
    fireEvent.click(getByAltText(appointment, "Edit"))
    fireEvent.click(getByText(appointment, "Cancel"))
    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();

  })

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container, debug } = render(<Application />);

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
    await findByText(appointment, "Error")
    expect(getByText(appointment, "Failed to Create, Please try again!")).toBeInTheDocument();
    fireEvent.click(queryByAltText(appointment, "Close"));
    expect(getByText(appointment, "Save")).toBeInTheDocument();
    fireEvent.click(queryByText(appointment, "Cancel"))
    expect(getByText(container, "Archie Cohen")).toBeInTheDocument();
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const { container } = render(<Application />)
    await findByText(container, "Archie Cohen")
    const appointment = getAllByTestId(container, "appointment")
      .find(appointment => queryByText(appointment, "Archie Cohen"))
    fireEvent.click(getByAltText(appointment, "Delete"))
    expect(getByText(appointment, "Are you sure you would like to Delete?")).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"))
    expect(getByText(appointment, "Deleting...")).toBeInTheDocument();
    await findByText(appointment, "Error")
    expect(getByText(appointment, "Failed to Cancel Interview, Please try again!")).toBeInTheDocument();
    fireEvent.click(queryByAltText(appointment, "Close"));
    expect(getByText(container, "Archie Cohen")).toBeInTheDocument();
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument()
  })
});
