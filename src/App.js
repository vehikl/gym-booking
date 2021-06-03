import Day from './Components/Day'
import AddBooking from './Components/AddBooking'
import dayjs from 'dayjs'
import { useState, useEffect, useMemo } from 'react'
import SignIn from './Components/SignIn'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebase from 'firebase';

function App({ db }) {
  const [monthOffset, setMonthOffset] = useState(0)
  const [selectedDay, setSelectedDay] = useState()
  const [showModal, setShowModal] = useState(false)
  const [editingBooking, setEditingBooking] = useState(false)
  const [bookingsForMonth, setBookingsForMonth] = useState([])
  const [user, setUser] = useState(null)
  const [selectedTimeslotId, setSelectedTimeslotId] = useState()
  const selectedMonth = useMemo(() => dayjs().add(monthOffset, 'M'), [monthOffset])

  useEffect(() => {
    db.collection('booking')
      .where('month', '==', selectedMonth.month())
      .onSnapshot((bookings) => {
      setBookingsForMonth(bookings.docs.map(doc => {
        return {
          ...doc.data(),
          id: doc.id
        }
      }))
    })
  }, [])

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user)
      console.log({user})
    })
  }, [])

  const logout = async () => {
    await firebase.auth().signOut()
    window.location.reload()
  }

  const handleSubmit = (setShowModal, db, selectedMonth, selectedDay) => {
    return ({ name, startTime, endTime, }) => {
      setShowModal(false)
      db.collection('booking').add({
        year: selectedMonth.year(),
        month: selectedMonth.month(),
        day: selectedDay,
        name,
        startTime,
        endTime,
        userId: user.uid
      })
      console.log('New booking saved')
    }
  }

  const handleDelete = () => {
    setShowModal(false)
    db.collection('booking').doc(selectedTimeslotId).delete()
    console.log('Booking deleted')
  }
  
  const days = Array.from({length: selectedMonth.daysInMonth()}, (_, index) => ++index)
  const daysOfTheWeeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const addMonth = () => setMonthOffset(monthOffset + 1)
  const subtractMonth = () => setMonthOffset(monthOffset - 1)
  const goToCurrentMonth = () => setMonthOffset(0)
  const startDay = parseInt(selectedMonth.startOf('month').format('d')) + 1

  if(!user) return <SignIn />

  return (
    <>
      <div className="fixed right-0 top-0 mr-8 mt-2">
        <span className="text-gray-500">{user.displayName}</span>
        <button className="ml-2 py-1 px-2 border" onClick={logout}>Logout</button>
      </div>
      <div className="month flex flex-col items-center justify-center h-full">
        <h1 className='mt-4'>{selectedMonth.format('MMMM YYYY')}</h1>
        <div className='flex flex-row'>
          <button className='p-3' onClick={subtractMonth}>Previous month</button>
          <button className='p-3' onClick={goToCurrentMonth}>Now</button>
          <button className='p-3' onClick={addMonth}>Next month</button>
        </div>
        
        <div className="md:grid md:grid-cols-7 md:gap-3 w-full px-8">
          {daysOfTheWeeks.map(day => (
            <div className="hidden md:block" key={day}>{day}</div>
          ))}

          {days.map((day, index) => {
              return <Day 
                className={index === 0 ? `col-start-${startDay}` : ""}
                key={day} 
                day={day}
                selectedMonth={selectedMonth}
                bookings={bookingsForMonth.filter(booking => booking.day === day)}
                onAddBooking={({ editing, id })=> {
                  setShowModal(true)
                  setSelectedDay(day)
                  if (editing) {
                    setEditingBooking(true)
                    setSelectedTimeslotId(id)
                  }
                }}
              />
          })}   
        </div>
      </div>
      <AddBooking
        editingBooking={editingBooking}
        visible={showModal}
        date={selectedMonth.date(selectedDay)}
        user={user}
        onSubmit={handleSubmit(setShowModal, db, selectedMonth, selectedDay)}
        onDelete={() => handleDelete()}
        onCancel={() => setShowModal(false)}
      />
      <ToastContainer />
    </>
  );
}

export default App;
