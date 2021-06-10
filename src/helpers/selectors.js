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

function getInterview(state, interview) {
  // if interview objects passes is Empty, meaning no interview booked, so returning null
  const output = {};
  if(!interview){
    return null;
  }
  output.student = interview.student;
  output.interviewer = {};
  output.interviewer.id = interview.interviewer;

  output.interviewer.name = state.interviewers[interview.interviewer]["name"];
  output.interviewer.avatar = state.interviewers[interview.interviewer]["avatar"];
  return output;
}

export{getAppointmentsForDay, getInterview}