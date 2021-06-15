import React, { useState } from "react";

import InterviewerList from "components/InterviewerList"
import Button from "components/Button"

export default function Form(props) {

  const [name, setName] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("")

  function handleChange(e) {
    setName(e.target.value)
  }

  function reset() {
    setName("");
    setInterviewer(null);
  }

  function cancel() {
    reset();
    props.onCancel()
  }

  function save() {
    props.onSave(name, interviewer)
  }

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank")
      return
    }
    props.onSave(name, interviewer)
  }
  // there is a bug here, no form validation so when use input blanks data get accepted and site breaks
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off"
          onSubmit={event => event.preventDefault()}
        >
          <input
            className="appointment__create-input text--semi-bold"
            value={name}
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={handleChange}
            data-testid="student-name-input"
            required="required"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={validate} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}