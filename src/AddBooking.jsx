import { useState } from "react"

function AddBooking({ visible, date }) {
  const [name, setName] = useState('')
  const [time, setTime] = useState('')

  const submitBooking = (e) => {
    e.preventDefault()

    console.log({time, name, date})
  }

  return visible ? (
    <div className="h-screen w-screen absolute bg-gray-200 bg-opacity-40 inset-0 flex justify-center items-center">
      <div className="bg-white rounded shadow p-5 flex flex-col">
        <h1 className="font-bold text-lg">Add Your Booking</h1>
          <form>
            <label>Name: <input type="text" onChange={(e) => setName(e.target.value)}/></label>
            <label>Time: <input type="time" onChange={(e) => setTime(e.target.value)}/></label>
            <button onClick={submitBooking}>Submit</button>
          </form>
      </div>
    </div>
  ) : null
}

export default AddBooking
