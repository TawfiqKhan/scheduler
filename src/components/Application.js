import React, { useEffect, useState } from "react";
import axios from 'axios'


import DayList from './DayList';
import Appointment from "components/Appointment/"
import InterviewerListItem from './InterviewerListItem'
import "components/Application.scss";


// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 6,
//     time: "3pm",
//     interview: {
//       student: "Tawfiq Khan",
//       interviewer: {
//         id: 1,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "4pm",
//   },
// ];

export default function Application(props) {

  // const [day, setDay] = useState("Monday")
  // const [days, setDays] = useState([])

  const [state, setState] = useState({
    day: "Monday",
    days : [],
    appointments: {}
  })

  const dailyAppointments = [];

  const setDay = day => setState(prevState => ({...prevState, day}))
  // const setDays = days => setState(prevState => ({...prevState, days}))
  // setState(prev => ({ ...prev, days }));
  
  const interviewers = [
    { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
    { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
    { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
    { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
    { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
  ];
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
      axios.get('/api/appointments')
    ]).then((all)=> {
      const daysData = all[0].data;
      const appointmentsData = all[1].data
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
