import Day from './Components/Day'
import AddBooking from './Components/AddBooking'
import dayjs from 'dayjs'
import { useState, useEffect, useMemo } from 'react'
import firebase from 'firebase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const firebaseConfig = {
  apiKey: "AIzaSyAOE9Y9NZShzcbF1huCMPCaNMK9lQAS0dM",
  authDomain: "gym-booking-ef593.firebaseapp.com",
  projectId: "gym-booking-ef593",
  storageBucket: "gym-booking-ef593.appspot.com",
  messagingSenderId: "351559060650",
  appId: "1:351559060650:web:9c9359d148cb5248ec14d3"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);


function App() {
  const [monthOffset, setMonthOffset] = useState(0)
  const [selectedDay, setSelectedDay] = useState()
  const [showModal, setShowModal] = useState(false)
  const [bookingsForMonth, setBookingsForMonth] = useState([])

  const selectedMonth = useMemo(() => dayjs().add(monthOffset, 'M'), [monthOffset])

  useEffect(() => {
    (async () => {
      const snap = await db
      .collection('booking')
      .where('month', '==', selectedMonth.month())
      .get();

      setBookingsForMonth(snap.docs.map(doc => doc.data()))
    })()
  }, [selectedMonth, setBookingsForMonth])


  const days = Array.from({length: selectedMonth.daysInMonth()}, (_, index) => ++index)
  const daysOfTheWeeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const addMonth = () => setMonthOffset(monthOffset + 1)
  const subtractMonth = () => setMonthOffset(monthOffset - 1)
  const goToCurrentMonth = () => setMonthOffset(0)
  const startDay = parseInt(selectedMonth.startOf('month').format('d')) + 1

  return (
    <>
      <div className="month flex flex-col items-center justify-center h-full">
        <h1>{selectedMonth.format('MMMM YYYY')}</h1>
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
        onSubmit={({ name, startTime, endTime }) => {
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
