import React, { useEffect, useState } from "react";
import axios from 'axios'

import {getAppointmentsForDay} from '../helpers/selectors'

import DayList from './DayList';
import Appointment from "components/Appointment/"
import InterviewerListItem from './InterviewerListItem'
import "components/Application.scss";

export default function Application(props) {

  // const [day, setDay] = useState("Monday")
  // const [days, setDays] = useState([])

  const [state, setState] = useState({
    day: "",
    days : [],
    appointments: {},
    interviewers : []
  })
  console.log(getAppointmentsForDay)
  const dailyAppointments = getAppointmentsForDay(state, state.day)

  // const setDay = day => setState(prevState => ({...prevState, day: day}))
  const setDay = (day)=> {
    console.log(day)
    setState(prevState => ({...prevState, day}))
  }
  // const setDays = days => setState(prevState => ({...prevState, days}))
  // setState(prev => ({ ...prev, days }));

  const allAppointments = dailyAppointments.map(appointment => {
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
      />)
  })

  useEffect(()=> {
    // axios.get('/api/days')
    //   .then(res => {
    //     setDays(res.data)
    //   })
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all)=> {
      const daysData = all[0].data;
      const appointmentsData = all[1].data
      const interviewersData = all[1].data
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
        {allAppointments}
      </section>
    </main>
  );
}
