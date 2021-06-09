import React from "react";
import Button from "components/Button"

export default function confirm(props) {
  const {message, onConfirm, onCancel} = props;
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{message}</h1>
      <section className="appointment__actions">
        <Button onClick = {onConfirm} danger>Cancel</Button>
        <Button onClick = {onCancel} danger>Confirm</Button>
      </section>
    </main>
  )
}