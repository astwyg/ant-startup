export const createHours = ()=>{
  let hours = [];
  for(let h=0; h<25; h++){
    hours.push((h<10?("0"+h.toString()):h.toString())+":00")
  }
  return hours;
};
