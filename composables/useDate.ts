export const useDate = () => {
  const formatTime = (time: Date, options?: { hours?: boolean, minutes?: boolean, seconds?: boolean }) => {
    let hours = time.getHours()
    let minutes = time.getMinutes()
    let seconds = time.getSeconds()

    const formatHours = hours < 9 ? `0${hours}` : hours
    const formatminutes = minutes < 9 ? `0${minutes}` : minutes
    const formatseconds = seconds < 9 ? `0${seconds}` : seconds
  
    if (!options) {
      return `${formatHours}:${formatminutes}:${formatseconds}`
    }
  
    if (options.hours && options.minutes) return `${formatHours}:${formatminutes}`
    if (options.minutes && options.seconds) return `${formatminutes}:${formatseconds}`
  }

  return { formatTime }
}