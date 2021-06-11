import React, { useEffect, useState } from "react";
import axios from 'axios'

import {getAppointmentsForDay, getInterviewersForDay, getInterview} from '../helpers/selectors'

import DayList from './DayList';
import Appointment from "components/Appointment/"
import "components/Application.scss";

export default function Application(props) {

//Setting up state
  const [state, setState] = useState({
    day: "",
    days : [],
    appointments: {},
    interviewers : []
  })
  //Uses helper function to get appointments
  const dailyAppointments = getAppointmentsForDay(state, state.day)


  const setDay = day => setState(prevState => ({...prevState, day}))

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState(prev => ({...prev, appointments}))
  }
  const schedule = dailyAppointments.map(appointment => {
    const availableInterviewers = getInterviewersForDay(state, state.day)
    const interview = getInterview(state, appointment.interview)
    return (
      <Appointment
        key= {appointment.id}
        id = {appointment.id}
        time = {appointment.time}
        interview = {interview}
        interviewers = {availableInterviewers}
        bookInterview = {bookInterview}
      />)
  })

  useEffect(()=> {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all)=> {
      const daysData = all[0].data;
      const appointmentsData = all[1].data
      const interviewersData = all[2].data
      setState(prevState => ({...prevState, days: daysData, appointments: appointmentsData, interviewers : interviewersData}))
    })
  }, [])
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
      </section>
    </main>
  );
}
