import cn from 'classnames'

function Day({ className, day, onAddBooking, bookings }) {
    return (
        <div className={cn(className = '', 'day border p-2 relative')}>
            <div className="flex flex-row justify-between">
                <div className="text-base">{day}</div>
                <button onClick={() => onAddBooking()}>+</button>
            </div>
        </div>
    );
}

Day.defaultProps = {
    className: ''
}

export default Day
