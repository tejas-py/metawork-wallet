export default function epochToTime(unixTime) {
  const date = new Date(unixTime * 1000)
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  // // Hours part from the timestamp
  // const hours = date.getHours()
  // // Minutes part from the timestamp
  // const minutes = '0' + date.getMinutes()
  // // Seconds part from the timestamp
  // const seconds = '0' + date.getSeconds()
  // Will display time in 10:30:23 format
  // const formattedTime = `${day}/${month}/${year} ${hours}:${minutes.substr(-2)}:${seconds.substr(
  //   -2
  // )}`
  const formattedTime = `${day}/${month}/${year}`
  return formattedTime
}
