import { useState } from "react"
import TimePicker from './TimePicker'

function AddBooking({ visible, date, onSubmit, onCancel }) {
  const [name, setName] = useState('')
  const [startTime, setStartTime] = useState({hour: '1', minute: '0', period: 'AM'})
  const [endTime, setEndTime] = useState({hour: '1', minute: '0', period: 'AM'})
  
  
  const getDate = () => {
    return date.format('MMMM D, YYYY');
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    onSubmit({ name, startTime, endTime })
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
