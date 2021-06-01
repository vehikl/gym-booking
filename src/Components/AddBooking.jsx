import { useState } from "react"
import TimePicker from './TimePicker'
import { XIcon } from '@heroicons/react/solid'
import { toast } from 'react-toastify';

function AddBooking({ visible, date, onSubmit, onCancel, user }) {
  const [startTime, setStartTime] = useState({hour: '1', minute: '0', period: 'AM'})
  const [endTime, setEndTime] = useState({hour: '1', minute: '0', period: 'AM'})

  document.querySelector('body').style.overflow = visible ? 'hidden' : 'auto'
  
  
  const getDate = () => {
    return date.format('MMMM D, YYYY');
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    
    const startHour = parseInt(startTime.hour)
    const endHour = parseInt(endTime.hour)

    const startValue = new Date(0, 0, 0, startTime.period === 'AM' ? startHour: startHour + 12, parseInt(startTime.minute))
    const endValue = new Date(0, 0, 0, endTime.period === 'AM' ? endHour: endHour + 12, parseInt(endTime.minute))

    if(startValue > endValue){
      toast.error('Start time cannot be after end time')
    }

    onSubmit({ name: user.displayName, startTime, endTime })
  }

  return visible ? (
    <div className="h-screen w-screen absolute bg-gray-200 bg-opacity-40 inset-0 flex justify-center items-center">
      <div className="bg-white rounded shadow p-5 flex flex-col w-2/3 max-w-md">
        <div className="flex flex-row items-center justify-between mb-4">
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between mb-6">
                <h1 className="font-bold text-gray-800 text-lg">Add booking</h1>

                <button onClick={onCancel} className="text-sm text-gray-600 hover:text-gray-400">
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="flex items-center">
              <img className="flex-none w-32 h-32 rounded-full mr-8" alt={user.displayName} src={user.photoURL}/>

              <div className="flex flex-col">
                <span className="text-gray-700">Booking for</span>
                <span>Name: {user.displayName}</span>
                <span>Email: {user.email}</span> 
                <span>On: {getDate()}</span> 
              </div>
            </div>
          </div>          
        </div>
        
        <form className="flex flex-col">
          <div className="py-3">
            <TimePicker label="Start Time" value={startTime} onChange={setStartTime} />
          </div>
          <div className="py-3">
            <TimePicker label="End Time" value={endTime} onChange={setEndTime} />
          </div>
          <button 
            onClick={handleOnSubmit}
            className="p-3 mt-4 text-white rounded font-semibold bg-green-500 hover:bg-green-400"
          >Submit</button>
        </form>
      </div>
    </div>
  ) : null
}

export default AddBooking
