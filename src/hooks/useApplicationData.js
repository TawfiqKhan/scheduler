import {useState, useEffect} from 'react';
import axios from 'axios';


function useApplicationData(){
//Setting up state
const [state, setState] = useState({
  day: "Monday",
  days : [],
  appointments: {},
  interviewers : []
})

const setDay = day => setState(prevState => ({...prevState, day}))


//Book interview and cancel funnction can be merged in future
function bookInterview(id, interview) {
  // console.log("line 19----application---", id)
  // console.log("line 19----application---", interview)
  // const bookingDay = state.days.filter(day=> {
  // // returning the particular day whose appointments array contain our specifc appointment id
  //       return day.appointments.includes(id)
  //   })
    // console.log("Booking-day:::::::::", bookingDay)
    
  return axios.put(`/api/appointments/${id}`, {interview})
  
  .then(res => {
    console.log(res.config)
    // spreading the appointment in all appointments and changing its interview
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
      // new: "checking"
    };
  // spreading all the appointment and updating a particular appointment
    const appointments = {
      ...state.appointments,  
      [id]: appointment,
    };
    //Getting the day for which a new appoint has been created
    const bookingDay = state.days.filter(day=> {
      // returning the particular day whose appointments array contain our specifc appointment id
        return day.appointments.includes(id)
     })
    // console.log(bookingDay[0])
    
    // mapping over the days array to find our booking day and returning its updated spots plus all other day unchanged
    const days = state.days.map(day => {
      // creating a copy of the nested object because map mutated nested object.
      let tempDay = {...day}
      if(tempDay.name === bookingDay[0].name){
        tempDay.spots -= 1
      }
      return tempDay
    })
    // console.log(updatedDays);
    setState(prev => ({...prev, appointments, days}))
  })
}

function cancelInterview(id){
  // first setting interview to null
  const appointment = {
    ...state.appointments[id],
    interview: null
  };
  // updating the appointment
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  // making delete request to DB
  return axios.delete(`/api/appointments/${id}`, {interview: null})
    .then(res => {
      // Updating the state once db request is successfull
      setState(prev => ({...prev, appointments}))
    })
}

useEffect(() => {
  Promise.all([
    axios.get('/api/days'),
    axios.get('/api/appointments'),
    axios.get('/api/interviewers'),
  ]).then((all) => {
    const daysData = all[0].data;
    const appointmentsData = all[1].data
    const interviewersData = all[2].data
    setState(prevState => ({ ...prevState, days: daysData, appointments: appointmentsData, interviewers: interviewersData }))
  })
}, [])

return {state, setDay, bookInterview, cancelInterview}
}

export {useApplicationData};