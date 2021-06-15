import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
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

  it("calls onSave function when the name is defined", () => {
    const onSave = jest.fn();
    const RenderedComponent = render(
      <Form interviewers={interviewers} onSave={onSave} student='Lydia Miller-Jones' />
    )

    const button = RenderedComponent.getByText('Save')
    fireEvent.click(button)

    expect(RenderedComponent.queryByText(/student name cannot be blank/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });
});