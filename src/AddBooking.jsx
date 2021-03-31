import { useState } from "react"
import dayjs from "dayjs"
import range from 'lodash/range'
import TimePicker from './TimePicker'

const HOUR_OPTIONS = range(1, 12)
const MINUTE_OPTIONS = [0, 15, 30, 45]
const AM_PM_OPTIONS = ['AM', 'PM']

function AddBooking({ visible, date, onSubmit, onCancel }) {
  const [name, setName] = useState('')
  const [startTime, setStartTime] = useState({hour: 0, minute: 0, amPm: 'pm'})
  const [endTime, setEndTime] = useState({hour: 0, minute: 0, amPm: 'pm'})
  
  
  const getDate = () => {
    return date.format('MMMM D, YYYY');
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    console.log(startTime)
    console.log(endTime)

    // const [hour, minute] = time.split(':').map(thing => +thing);
    // Check that, cause it's wrong
    // const bookedTime =  dayjs().year(date.year).month(date.month).day(date.date).hour(hour).minute(minute)
  
    // onSubmit({name, bookedTime})
  }

  return visible ? (
    <div className="h-screen w-screen absolute bg-gray-200 bg-opacity-40 inset-0 flex justify-center items-center">
      <div className="bg-white rounded shadow p-5 flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <h1 className="font-bold text-lg">Add Your Booking for {getDate()}</h1>
          <button onClick={onCancel} className="text-sm">Cancel</button>
        </div>
        <form>
          <label>Name: <input type="text" onChange={(e) => setName(e.target.value)}/></label>
          <TimePicker  label="Start Time" value={startTime} onChange={setStartTime} />
          <TimePicker  label="End Time" value={endTime} onChange={setEndTime} />
          <button onClick={handleOnSubmit}>Submit</button>
        </form>
      </div>
    </div>
  ) : null
}

export default AddBooking
