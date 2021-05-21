import cn from 'classnames'
import { CheckCircleIcon, PlusIcon } from '@heroicons/react/solid'

function Timeslot({ booking }) {
    const minute = booking.startTime.minute.padStart(2, '0')
return (
        <div className='whitespace-nowrap flex items-center min-w-0 font-semibold text-gray-700 text-sm'>
            <span className="w-2 h-2 bg-green-600 rounded-full flex-shrink-0 mr-2"></span>
            <span className="">{booking.startTime.hour}:{minute} {booking.startTime.period}</span>
            <span className="mx-1">-</span>
            <span className="">{booking.name}</span>
        </div>
    )
}

function Day({ className, day, onAddBooking, bookings, selectedMonth }) {
    const classes = cn(className, 'day border p-2 relative h-32 overflow-y-auto md:mb-0 mb-3')

    

    return (
        <div className={classes}>
            <div className="flex flex-row justify-between">
                {/* TODO: responsive day name */}
                <div className="hidden md:block text-base">{selectedMonth.date(day).format('D')}</div>
                <div className="md:hidden text-base">{selectedMonth.date(day).format('ddd MMM D, YYYY')}</div>
                <button onClick={() => onAddBooking()}>                
                    <PlusIcon className="h-6 w-6" />
                </button>
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
