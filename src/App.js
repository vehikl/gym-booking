import Day from './Day'
import dayjs from 'dayjs'

function App() {
  const days = Array.from({length: dayjs().daysInMonth()}, (_, index) => ++index)
  const daysOfTheWeeks = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  return (
    <div className="month flex flex-col items-center justify-center h-screen">
      <h1>Month</h1>
      {daysOfTheWeeks.map(day => (
          <div>{day}</div>
      ))}
      <div className="week grid grid-cols-7 gap-3 w-3/4">
        {days.map(day => (
          <Day key={day} day={day} />
        ))}
      </div>
    </div>
  );
}

export default App;
