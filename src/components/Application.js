import React from "react";
import { useApplicationData } from "hooks/useApplicationData";

import { getAppointmentsForDay, getInterviewersForDay, getInterview } from '../helpers/selectors'
import DayList from './DayList';
import Appointment from "components/Appointment/"
import "components/Application.scss";

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview } = useApplicationData();

  //Uses helper function to get appointments
  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const schedule = dailyAppointments.map(appointment => {
    const availableInterviewers = getInterviewersForDay(state, state.day)
    const interview = getInterview(state, appointment.interview)
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={availableInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />)
  })

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        {/* <InterviewerListItem /> */}
      </section>
      <section className="schedule">
        {schedule}
        <Appointment id="last" time="5pm" bookInterview={bookInterview} />
      </section>
    </main>
  );
}
