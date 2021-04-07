import cn from 'classnames'

function Timeslot({ booking }) {
return (
        <div className='whitespace-nowrap flex items-center min-w-0 font-semibold text-gray-700 text-sm'>
            <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
            <span className="">{booking.startTime.hour}:{booking.startTime.minute} {booking.startTime.period}</span>
            <span className="mx-1">-</span>
            <span className="">{booking.name}</span>
        </div>
    )
}

function Day({ className, day, onAddBooking, bookings }) {
    const classes = cn(className = '', 'day border p-2 relative h-32 overflow-y-auto')

    return (
        <div className={classes}>
            <div className="flex flex-row justify-between">
                <div className="text-base">{day}</div>
                <button onClick={() => onAddBooking()}>+</button>
            </div>
            { bookings.map((booking, index) =>  <Timeslot key={index} booking={booking} />) }
        </div>
    );
}

Day.defaultProps = {
    className: '',
    bookings: []
}

export default Day
