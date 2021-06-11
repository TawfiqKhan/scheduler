import React, {useEffect} from "react";

import { useVisualMode } from "hooks/useVisualMode"
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import("components/Appointment/styles.scss")

// console.log(useVisualMode)

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING"
  const CONFIRM = "CONFIRM"
  const DELETING = "DELETING"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // useEffect(() => {

  //   if (props.interview && mode === EMPTY) {
  //     transition(SHOW);
  //   }

  //   if (!props.interview && mode === SHOW) {
  //     transition(EMPTY);
  //   }

  // }, [mode, transition, props.interview])

  function save(name, interviewer) {
    transition(SAVING);
    let newInterview = {
      student: name,
      interviewer
    }
    // console.log("Line 26----", props.id)
    props.bookInterview(props.id, newInterview)
    .then(res => transition(SHOW))   
  }

  function canInterview(){
    // transition(CONFIRM)
    transition(DELETING)
    props.cancelInterview(props.id)
    .then(res => {
      console.log("Deleted")
      transition(EMPTY)}
      )   

  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete = {canInterview}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status
          message="Saving..."
        />
      )}
      {mode === CONFIRM && (
        <Confirm
        message = "Are you sure you would like to Delete?"
        />
      )}
      {mode === DELETING && (
        <Status
        message="Deleting..."
      />
      )}
    </article>
  )
}