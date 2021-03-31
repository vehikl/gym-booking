import range from 'lodash/range'

const HOUR_OPTIONS = range(1, 12)
const MINUTE_OPTIONS = [0, 15, 30, 45]
const AM_PM_OPTIONS = ['AM', 'PM']


const TimePicker = ({ label, value, onChange }) => {
    return (
    <label>{label}:
        <select value={value.hour} onChange={(e) => onChange({ ...value, hour: e.target.value })}>
        { HOUR_OPTIONS.map((hour) => <option value={hour}>{hour}</option>)}
        </select>
        <select value={value.minute} onChange={(e) => onChange({ ...value, minute: e.target.value })}>
        { MINUTE_OPTIONS.map((minute) => <option value={minute}>{minute}</option>)}
        </select>
        <select value={value.amPm} onChange={(e) => onChange({ ...value, amPm: e.target.value })}>
        { AM_PM_OPTIONS.map((option) => <option value={option}>{option}</option>)}
        </select>
    </label>    
    )
}

export default TimePicker