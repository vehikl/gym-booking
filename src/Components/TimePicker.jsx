import range from 'lodash/range';
import { ChevronDownIcon } from '@heroicons/react/solid';

const HOUR_OPTIONS = range(1, 13);
const MINUTE_OPTIONS = [0, 15, 30, 45];
const PERIODS = ['AM', 'PM'];

const TimePicker = ({
  label, value, onChange, disabled,
}) => (
  <div className="">
    {/* eslint-disable-next-line */}
    <label className="text-xs uppercase tracking-wide mb-1 font-semibold text-gray-700">
      {label}
    </label>
    <div className="flex">
      <div className="relative flex-1 mr-2">
        <select
          disabled={disabled}
          className="border border-gray-300 rounded p-2 appearance-none w-full"
          value={value.hour}
          onChange={(e) => onChange({ ...value, hour: e.target.value })}
        >
          {HOUR_OPTIONS.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        {disabled || (
        <ChevronDownIcon className="pointer-events-none w-6 h-6 mt-2 mr-2 absolute right-0 top-0" />
        )}
      </div>

      <div className="relative flex-1 mr-2">
        <select
          disabled={disabled}
          className="border border-gray-300 rounded p-2 appearance-none w-full"
          value={value.minute}
          onChange={(e) => onChange({ ...value, minute: e.target.value })}
        >
          {MINUTE_OPTIONS.map((minute) => (
            <option key={minute} value={minute}>
              {minute}
            </option>
          ))}
        </select>
        {disabled || (
        <ChevronDownIcon className="pointer-events-none w-6 h-6 mt-2 mr-2 absolute right-0 top-0" />
        )}
      </div>

      <div className="relative flex-1">
        <select
          disabled={disabled}
          className="border border-gray-300 rounded p-2 appearance-none w-full"
          value={value.period}
          onChange={(e) => onChange({ ...value, period: e.target.value })}
        >
          {PERIODS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {disabled || (
        <ChevronDownIcon className="pointer-events-none w-6 h-6 mt-2 mr-2 absolute right-0 top-0" />
        )}
      </div>
    </div>
  </div>
);

export default TimePicker;
