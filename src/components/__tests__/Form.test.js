import React from "react";
import { render, cleanup, fireEvent, debug, prettyDOM } from "@testing-library/react";
import Form from "components/Appointment/Form"

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} student="Lydia Miller-Jones" />
    );
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    // setting up mock function
    const onSave = jest.fn();
    const RenderedComponent = render(
      <Form interviewers={interviewers} onSave={onSave} name='' />
    )
    // Targetting the button element
    const button = RenderedComponent.getByText('Save')
    // firing movk click event
    fireEvent.click(button)
    // targetting the validation field
    const inputValidation = RenderedComponent.getByText(/Student name cannot be blank/i)

    expect(inputValidation).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("validates that the interviewer is not blank", () => {
    // setting up mock function
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText, getByAltText, debug } = render(
      <Form interviewers={interviewers} onSave={onSave} student="Lydia Miller-Jones" />
    );
    // Trying to save without selecting interviewer
    fireEvent.click(getByText("Save"));
    expect(getByText(/You must select an interviewer/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
    // Saving after selecting an interviewer is allowed
    fireEvent.click(getByAltText("Sylvia Palmer"))
    expect(queryByText(/You must select an interviewer/i)).toBeNull()
    fireEvent.click(getByText("Save"));
    expect(onSave).toHaveBeenCalledTimes(1);
  });

  it("can successfully save after providing student name and selecting interviewer", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText, getByAltText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText("Sylvia Palmer"))
    fireEvent.click(getByText("Save"));
    expect(onSave).toHaveBeenCalledTimes(1);
    // Here 1 is our interviewers (Sylvia Palmer) id
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });

  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );

    fireEvent.click(getByText("Save"));

    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByText("Cancel"));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});