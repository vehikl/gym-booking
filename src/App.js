import dayjs from 'dayjs';
import {
  useState, useEffect, useMemo,
} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import firebase from 'firebase';
import Day from './Components/Day';
import AddBooking from './Components/AddBooking';
import PasswordScreen from './Components/PasswordScreen';
import SignIn from './Components/SignIn';
import 'react-toastify/dist/ReactToastify.css';
import 'firebase/functions';
import apiClient from './apiClient';

function App({ db }) {
  const [monthOffset, setMonthOffset] = useState(0);
  const [selectedDay, setSelectedDay] = useState();
  const [showModal, setShowModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState(false);
  const [bookingsForMonth, setBookingsForMonth] = useState([]);
  const [user] = useState(localStorage.getItem('user'));

  const [selectedTimeslot, setSelectedTimeslot] = useState({});
  // const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const selectedMonth = useMemo(
    () => dayjs().add(monthOffset, 'M'),
    [monthOffset],
  );

  useEffect(() => {
    db.collection('booking')
      .where('month', '==', selectedMonth.month())
      .onSnapshot((bookings) => {
        setBookingsForMonth(
          bookings.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })),
        );
      });
  }, [monthOffset]);

  useEffect(() => {
    document.querySelector('body').style.overflow = showModal ? 'hidden' : 'auto';
  }, [showModal]);

  const logout = async () => {
    await firebase.auth().signOut();
    window.location.reload();
  };

  const submitPassword = async (password) => {
    if (!password) {
      toast.error('Please enter a password');
      return;
    }

    try {
      apiClient.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
      const response = await apiClient.post('/setPassword', {
        password,
      });
      apiClient.defaults.headers.common.Password = password;
      console.log(response);
    } catch (error) {
      toast.error('Please enter the correct password');
      console.log(error);
    }
  };

  const handleSubmit = (setShowModal, db, selectedMonth, selectedDay) => ({ name, startTime, endTime }) => {
    db.collection('booking').add({
      year: selectedMonth.year(),
      month: selectedMonth.month(),
      day: selectedDay,
      name,
      startTime,
      endTime,
      userId: user.uid,
      password: localStorage.getItem('password'),
      email: user.email,
    });
    setShowModal(false);
    setSelectedTimeslot({});
    setEditingBooking(false);
  };

  const handleEdit = (setShowModal, db, selectedMonth, selectedDay) => ({ name, startTime, endTime }) => {
    db.collection('booking')
      .doc(selectedTimeslot.id)
      .set({
        year: selectedMonth.year(),
        month: selectedMonth.month(),
        day: selectedDay,
        name,
        startTime,
        endTime,
        userId: user.uid,
        password: localStorage.getItem('password'),
        email: user.email,
      });
    setSelectedTimeslot({});
    setShowModal(false);
    setEditingBooking(false);
  };

  const handleDelete = () => {
    db.collection('booking').doc(selectedTimeslot.id).delete();
    setShowModal(false);
    setSelectedTimeslot({});
    setEditingBooking(false);
  };

  const days = Array.from(
    { length: selectedMonth.daysInMonth() },
    (_, index) => ++index,
  );
  const daysOfTheWeeks = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const addMonth = () => setMonthOffset(monthOffset + 1);
  const subtractMonth = () => setMonthOffset(monthOffset - 1);
  const goToCurrentMonth = () => setMonthOffset(0);
  const startDay = parseInt(selectedMonth.startOf('month').format('d')) + 1;

  if (!user) return <SignIn />;

  return (
    <>
      {!localStorage.getItem('password') && <PasswordScreen submitPassword={submitPassword} />}
      <div className="flex items-center justify-between m-2">
        <span className="text-gray-500 pl-2">{user.displayName}</span>
        <button type="button" className="ml-2 py-1 px-2 border" onClick={logout}>
          Logout
        </button>
      </div>
      <div className="month flex flex-col items-center justify-center h-full">
        <h1 className="mt-4">{selectedMonth.format('MMMM YYYY')}</h1>
        <div className="flex flex-row">
          <button
            type="button"
            className="m-1 p-3 rounded bg-gray-200"
            onClick={subtractMonth}
          >
            Previous month
          </button>
          <button
            type="button"
            className="m-1 p-3 rounded bg-gray-200"
            onClick={goToCurrentMonth}
          >
            Now
          </button>
          <button type="button" className="m-1 p-3 rounded bg-gray-200" onClick={addMonth}>
            Next month
          </button>
        </div>

        <div className="md:grid md:grid-cols-7 md:gap-3 w-full px-8">
          {daysOfTheWeeks.map((day) => (
            <div className="hidden md:block" key={day}>
              {day}
            </div>
          ))}

          {days.map((day, index) => (
            <Day
              className={index === 0 ? `col-start-${startDay}` : ''}
              key={day}
              day={day}
              selectedMonth={selectedMonth}
              bookings={bookingsForMonth.filter(
                (booking) => booking.day === day,
              )}
              onAddBooking={({ editing, booking }) => {
                setShowModal(true);
                setSelectedDay(day);
                if (editing) {
                  setEditingBooking(true);
                  setSelectedTimeslot(booking);
                }
              }}
            />
          ))}
        </div>
      </div>
      {showModal && (
        <AddBooking
          editingBooking={editingBooking}
          visible={showModal}
          selectedTimeslot={selectedTimeslot}
          date={selectedMonth.date(selectedDay)}
          user={user}
          onSubmit={handleSubmit(setShowModal, db, selectedMonth, selectedDay)}
          onEdit={handleEdit(setShowModal, db, selectedMonth, selectedDay)}
          onDelete={() => handleDelete()}
          onCancel={() => {
            setShowModal(false);
            setSelectedTimeslot({});
            setEditingBooking(false);
          }}
        />
      )}
      <ToastContainer />
    </>
  );
}

export default App;
