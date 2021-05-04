import { useState } from "react"
import TimePicker from './TimePicker'
import { XIcon } from '@heroicons/react/solid'

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
      <div className="bg-white rounded shadow p-5 flex flex-col w-2/3 max-w-md">
        <div className="flex flex-row items-center justify-between mb-4">
          <div className="flex flex-col mr-6">
            <h1 className="font-bold text-gray-800 text-lg">Add booking</h1>
            <p className="text-gray-700">Booking for {getDate()}</p>
          </div>
          
          <button onClick={onCancel} className="text-sm text-gray-600 hover:text-gray-400">
            <XIcon className="h-6 w-6" />
          </button>
          
        </div>
        
        <form className="flex flex-col">
          <label className="py-3 flex flex-col">
            <span className="text-xs uppercase tracking-wide mb-1 font-semibold text-gray-700">Name</span>
            <input type="text" className="border border-gray-300 rounded p-2" onChange={(e) => setName(e.target.value)}/>
          </label> 

          <div className="py-3">
            <TimePicker label="Start Time" value={startTime} onChange={setStartTime} />
          </div>
          <div className="py-3">
            <TimePicker label="End Time" value={endTime} onChange={setEndTime} />
          </div>
          <button 
            onClick={handleOnSubmit}
            className="p-3 my-3 border border-gray-500 rounded"
          >Submit</button>
        </form>
      </div>
    </div>
  ) : null
}

export default AddBooking
