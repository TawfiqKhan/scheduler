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
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  return axios.put(`/api/appointments/${id}`, {interview})
  .then(res => {
    console.log("Entered then after put.....")
    setState(prev => ({...prev, appointments}))
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