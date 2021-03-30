import { useState } from "react"
import dayjs from "dayjs"

function AddBooking({ visible, date, onSubmit, onCancel }) {
  const [name, setName] = useState('')
  const [time, setTime] = useState('')

  
  
  const getDate = () => {
    return date.format('MMMM D, YYYY');
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    const [hour, minute] = time.split(':').map(thing => +thing);
    // Check that, cause it's wrong
    const bookedTime =  dayjs().year(date.year).month(date.month).day(date.date).hour(hour).minute(minute)
  
    onSubmit({name, bookedTime})
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
          <label>Time: <input type="time" onChange={(e) => setTime(e.target.value)}/></label>
          <button onClick={handleOnSubmit}>Submit</button>
        </form>
      </div>
    </div>
  ) : null
}

export default AddBooking
