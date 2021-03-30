import Day from './Day'
import AddBooking from './AddBooking'
import dayjs from 'dayjs'
import { useState } from 'react'

function App() {
  const [monthOffset, setMonthOffset] = useState(0)
  const [selectedDay, setSelectedDay] = useState()
  const [showModal, setShowModal] = useState(false)

  const selectedMonth = dayjs().add(monthOffset, 'M')

  const days = Array.from({length: selectedMonth.daysInMonth()}, (_, index) => ++index)
  const daysOfTheWeeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const addMonth = () => setMonthOffset(monthOffset + 1)
  const subtractMonth = () => setMonthOffset(monthOffset - 1)
  const goToCurrentMonth = () => setMonthOffset(0)
  const startDay = parseInt(selectedMonth.startOf('month').format('d')) + 1

  // get current day of the week (Mon, Tues, Wed, ...)
  // figure out it's offset (0, 1, 2, ...)


  // get the number of days before the offset
  // use the number of days before offset to offset the grid

  return (
    <>
      <div className="month flex flex-col items-center justify-center h-screen">
        <h1>{selectedMonth.format('MMMM YYYY')}</h1>
        <div className='flex flex-row'>
          <button className='p-3' onClick={subtractMonth}>Previous month</button>
          <button className='p-3' onClick={goToCurrentMonth}>Now</button>
          <button className='p-3' onClick={addMonth}>Next month</button>
        </div>
        
        <div className="week grid grid-cols-7 gap-3 w-3/4">
          {daysOfTheWeeks.map(day => (
              <div>{day}</div>
          ))}

          {days.map((day, index) => {
              return <Day 
                className={index === 0 ? `col-start-${startDay}` : ""}
                key={day} 
                day={day} 
                onAddBooking={()=> {
                  // toggle modal
                  setShowModal(true)
                  setSelectedDay(day)
                }}
              />
          })}   
        </div>
      </div>
      <AddBooking
        visible={showModal}
        date={selectedMonth.date(selectedDay)}
        onSubmit={({name, bookedTime}) => {
          setShowModal(false);
          console.log(bookedTime);
        }}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
}

export default App;
