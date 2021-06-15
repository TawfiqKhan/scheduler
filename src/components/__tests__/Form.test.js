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
    const onSave = jest.fn();
    const RenderedComponent = render(
      <Form interviewers={interviewers} onSave={onSave} name='' />
    )
    const inputValidation = RenderedComponent.getByText(/student name cannot be blank/i)
    const button = RenderedComponent.getByText('Save')
    // expect(inputValidation).toBeInTheDocument();
    // expect(button).toBeInTheDocument();
    fireEvent.click(button)
    expect(inputValidation).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it.only("calls onSave function when the name is defined", () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();
    /* 2. Render the Form with interviewers, name and the onSave mock function passed as an onSave prop */
    const RenderedComponent = render(
      <Form interviewers={interviewers} onSave={onSave} student='Lydia Miller-Jones' />
    )
    const button = RenderedComponent.getByText('Save')

    /* 3. Click the save button */
    fireEvent.click(button)
    // expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });
});