import range from 'lodash/range'

const HOUR_OPTIONS = range(1, 13)
const MINUTE_OPTIONS = [0, 15, 30, 45]
const PERIODS = ['AM', 'PM']


const TimePicker = ({ label, value, onChange }) => {
    return (
    <label>{label}:
        <select value={value.hour} onChange={(e) => onChange({ ...value, hour: e.target.value })}>
        { HOUR_OPTIONS.map((hour) => <option key={hour} value={hour}>{hour}</option>)}
        </select>
        <select value={value.minute} onChange={(e) => onChange({ ...value, minute: e.target.value })}>
        { MINUTE_OPTIONS.map((minute) => <option key={minute} value={minute}>{minute}</option>)}
        </select>
        <select value={value.period} onChange={(e) => onChange({ ...value, period: e.target.value })}>
        { PERIODS.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
    </label>    
    )
}

export default TimePicker
