export const formatTime = (seconds: number) => {
const hrs = Math.floor(seconds / 3600)
const mins = Math.floor((seconds % 3600) / 60)
const secs = seconds % 60
return [hrs, mins, secs]
.map((val) => String(val).padStart(2, "0"))
.join(":")
}
