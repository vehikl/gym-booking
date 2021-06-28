import { useEffect, useState } from 'react';
import { XIcon } from '@heroicons/react/solid';
import { toast } from 'react-toastify';
import TimePicker from './TimePicker';

const defaultTime = {
  hour: '1',
  minute: '0',
  period: 'AM',
};

function AddBooking({
  visible,
  date,
  onSubmit,
  onEdit,
  onCancel,
  user,
  editingBooking,
  onDelete,
  selectedTimeslot,
}) {
  const [startTime, setStartTime] = useState(
    selectedTimeslot.startTime ? selectedTimeslot.startTime : defaultTime,
  );

  const [endTime, setEndTime] = useState(
    selectedTimeslot.endTime ? selectedTimeslot.endTime : defaultTime,
  );

  const onClose = (event) => {
    if (event.which === 27 || event.keyCode === 27) {
      onCancel();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onClose);
    return () => {
      window.removeEventListener('keydown', onClose);
    };
  }, []);

  const getDate = () => date.format('MMMM D, YYYY');

  const handleOnEdit = (e) => {
    e.preventDefault();

    const startHour = parseInt(startTime.hour);
    const endHour = parseInt(endTime.hour);

    const startValue = new Date(
      0,
      0,
      0,
      startTime.period === 'AM' ? startHour : startHour + 12,
      parseInt(startTime.minute),
    );
    const endValue = new Date(
      0,
      0,
      0,
      endTime.period === 'AM' ? endHour : endHour + 12,
      parseInt(endTime.minute),
    );

    if (startValue > endValue) {
      toast.error('Start time cannot be after end time');
      return;
    }

    // create onEdit
    onEdit({ name: user.displayName, startTime, endTime });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const startHour = parseInt(startTime.hour);
    const endHour = parseInt(endTime.hour);

    const startValue = new Date(
      0,
      0,
      0,
      startTime.period === 'AM' ? startHour : startHour + 12,
      parseInt(startTime.minute),
    );
    const endValue = new Date(
      0,
      0,
      0,
      endTime.period === 'AM' ? endHour : endHour + 12,
      parseInt(endTime.minute),
    );

    if (startValue > endValue) {
      toast.error('Start time cannot be after end time');
      return;
    }

    onSubmit({ name: user.displayName, startTime, endTime });
  };

  const handleOnDelete = (e) => {
    e.preventDefault();
    onDelete();
  };

  const heading = () => {
    if (editingBooking) {
      if (user.uid === selectedTimeslot.userId) {
        return 'Edit booking';
      }
      return 'Booking';
    }
    return 'Add booking';
  };

  return visible ? (
    <div className="h-screen w-screen fixed bg-gray-200 bg-opacity-40 inset-0 flex justify-center items-center">
      <div className="bg-white rounded shadow p-5 flex flex-col w-2/3 max-w-md">
        <div className="flex flex-row items-center justify-between mb-4">
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-bold text-gray-800 text-lg">{heading()}</h1>
              <button
                type="button"
                onClick={onCancel}
                className="text-sm text-gray-600 hover:text-gray-400"
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="flex items-center">
              <div className="flex flex-col">
                <span className="text-gray-700">Booking for</span>
                <span>
                  Name:
                  {' '}
                  {selectedTimeslot.name ?? user.displayName}
                </span>
                <span>
                  On:
                  {' '}
                  {getDate()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <form className="flex flex-col">
          <div className="py-3">
            <TimePicker
              disabled={editingBooking && user.uid !== selectedTimeslot.userId}
              label="Start Time"
              value={startTime}
              onChange={setStartTime}
            />
          </div>
          <div className="py-3">
            <TimePicker
              disabled={editingBooking && user.uid !== selectedTimeslot.userId}
              label="End Time"
              value={endTime}
              onChange={setEndTime}
            />
          </div>

          {editingBooking && user.uid === selectedTimeslot.userId && (
            <button
              type="button"
              onClick={handleOnEdit}
              className="p-3 mt-4 text-white rounded font-semibold bg-green-500 hover:bg-green-400"
            >
              Edit booking
            </button>
          )}
          {!editingBooking && (
            <button
              type="button"
              onClick={handleOnSubmit}
              className="p-3 mt-4 text-white rounded font-semibold bg-green-500 hover:bg-green-400"
            >
              Add booking
            </button>
          )}
          {editingBooking && user.uid === selectedTimeslot.userId && (
            <button
              type="button"
              onClick={handleOnDelete}
              className="p-3 mt-4 text-white rounded font-semibold bg-red-500 hover:bg-red-400"
            >
              Delete
            </button>
          )}
        </form>
      </div>
    </div>
  ) : null;
}

export default AddBooking;
