export default function epochToTime(epochTime) {
  const myDate = new Date(epochTime * 1000)
  return myDate.toGMTString()
}
