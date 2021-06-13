import Empty from "components/Appointment/Empty";

function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const allAppointments = [];
  let filetredDay = state.days.filter(item=> item.name === day)
  if(!filetredDay[0]){
    return allAppointments
  }
  let appointmentsForfilteredDay = filetredDay[0].appointments
  for(let appointmentId of appointmentsForfilteredDay ) {
    if(state.appointments[appointmentId]) {
      allAppointments.push(state.appointments[appointmentId])
    }
  }
  return allAppointments;
}

// there is a bug here, no form validation so when use input blanks data get accepted and site breaks

function getInterview(state, interview) {
  // if interview objects passes is Empty, meaning no interview booked, so returning null
  // console.log("From Selectors------State:---", state)
  // console.log("From Selectors------Interview---", interview)
  const output = {};
  if(!interview){
    return null;
  }
  output.student = interview.student;
  output.interviewer = {};
  output.interviewer.id = interview.interviewer;
  // console.log("From Selectors------", output.interviewers)
  output.interviewer.name = state.interviewers[interview.interviewer]["name"];
  output.interviewer.avatar = state.interviewers[interview.interviewer]["avatar"];
  return output;
}

function getInterviewersForDay(state, day){
  const allInterviewers = [];
  let filetredDay = state.days.filter(item=> item.name === day)
  if(!filetredDay[0]){
    return allInterviewers
  }
  let interviewersForfilteredDay = filetredDay[0].interviewers
  for(let interviewerId of interviewersForfilteredDay ) {
    if(state.interviewers[interviewerId]) {
      allInterviewers.push(state.interviewers[interviewerId])
    }
  }
  // console.log("allInterviewers", allInterviewers)
  return allInterviewers;
}

export {getAppointmentsForDay, getInterviewersForDay, getInterview}