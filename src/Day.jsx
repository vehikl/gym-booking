import cn from 'classnames'

function Day({ className, day }) {
    return (
        <div className={cn(className, 'h-40 day border p-2 relative')}>
            <div className="flex flex-row justify-between">
                <div className="text-base">{day}</div>
                <button>+</button>
            </div>
        </div>
    );
}

export default Day;