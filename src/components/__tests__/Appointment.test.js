import React from "react";
import { render, cleanup } from "@testing-library/react";
import Appointment from "components/Appointment"

afterEach(cleanup);

describe("test suite for Appointment componenet", () => {
  it("Renders without crashing", () => {
    const interview = { student: "sunny", interviewer: 2 }
    const availableInterviewers = { name: "Ariana Grande", avatar: "http://avatar.jpg" }
    render(
      <Appointment
      // key='1'
      // id='1'
      // time='12pm'
      // interview={interview}
      // interviewers={availableInterviewers}
      // bookInterview={() => { }}
      // cancelInterview={() => { }}
      />)
  })
})