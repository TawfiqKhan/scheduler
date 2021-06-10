export function getAppointmentsForDay(state, day) {
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