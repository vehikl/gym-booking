import Day from './Components/Day'
import AddBooking from './Components/AddBooking'
import dayjs from 'dayjs'
import { useState, useEffect, useMemo } from 'react'
import SignIn from './Components/SignIn'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebase from 'firebase';



function App({ app }) {
  const [monthOffset, setMonthOffset] = useState(0)
  const [selectedDay, setSelectedDay] = useState()
  const [showModal, setShowModal] = useState(false)
  const [bookingsForMonth, setBookingsForMonth] = useState([])
  const [user, setUser] = useState(null)

  const selectedMonth = useMemo(() => dayjs().add(monthOffset, 'M'), [monthOffset])

  const db = firebase.firestore(app); // TODO: db is stale? :(

  useEffect(() => {
    (async () => {
      const snap = await db
      .collection('booking')
      .where('month', '==', selectedMonth.month())
      .get();

      setBookingsForMonth(snap.docs.map(doc => doc.data()))
    })()
  }, [db, selectedMonth, setBookingsForMonth])

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user)
    })
  }, [])

  const logout = async () => {
    await firebase.auth().signOut()
    window.location.reload()
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
      <div className="fixed right-0 top-0 mr-2 mt-2">
        {user.displayName}
        <button className="ml-2" onClick={logout}>Logout</button>
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
                onAddBooking={()=> {
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
        user={user}
        onSubmit={({ name, startTime, endTime, }) => {
          setShowModal(false);
          console.log('New booking saved');
          db.collection('booking').add({  year: selectedMonth.year(), month: selectedMonth.month(), day: selectedDay, name, startTime, endTime })
        }}
        onCancel={() => setShowModal(false)}
      />
      <ToastContainer />
    </>
  );
}

export default App;
