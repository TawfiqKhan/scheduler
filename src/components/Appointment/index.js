import React, { useEffect } from "react";

import { useVisualMode } from "hooks/useVisualMode"
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import("components/Appointment/styles.scss")

// console.log(useVisualMode)

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING"
  const CONFIRM = "CONFIRM"
  const DELETING = "DELETING"
  const EDIT = "EDIT"
  const ERROR_SAVING = "ERROR_SAVING"
  const ERROR_DELETING = "ERROR_DELETING"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING);
    let newInterview = {
      student: name,
      interviewer
    }
    // console.log("Line 26----", props.id)
    props.bookInterview(props.id, newInterview)
      .then(res => transition(SHOW))
      .catch(res => transition(ERROR_SAVING, true))
  }
  function confirmDelete() {
    transition(DELETING)
    deleteInterview()
  }

  function deleteInterview() {
    props.cancelInterview(props.id)
      .then(res => transition(EMPTY))
      .catch(() => transition(ERROR_DELETING))
  }

  //EMPTY, CREATE, SAVING, ERROR_SAVING
  //SHOW, CONFIRM, DELETING, ERROR_DELETING

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM, true)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}ß
      {mode === SAVING && (
        <Status
          message="Saving..."
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to Delete?"
          onConfirm={confirmDelete}
          onCancel={() => transition(SHOW)}
        />
      )}
      {mode === DELETING && (
        <Status
          message="Deleting..."
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVING && (
        <Error
          message="Failed to Create, Please try again!"
          onClose={back}
        />
      )}
      {mode === ERROR_DELETING && (
        <Error
          message="Failed to Cancel Interview, Please try again!"
          onClose={() => transition(SHOW)}
        />
      )}
    </article>
  )
}