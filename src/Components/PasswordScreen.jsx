import { useState } from 'react';

function PasswordScreen({ submitPassword }) {
  const [password, setPassword] = useState('');

  return (
    <div className="bg-blue-500 fixed inset-0 flex items-center justify-center z-10">
      <div className="bg-white p-4 rounded">
        <label className="block mb-2" htmlFor="password">
          Enter Application Password
          <input
            id="password"
            onChange={({ target: { value } }) => setPassword(value)}
            value={password}
            type="password"
            className="bg-white text-black p-2 rounded border border-black w-full"
          />
        </label>

        <button
          type="button"
          className="mt-4 py-2 px-4 rounded border border-gray-400"
          onClick={() => submitPassword(password)}
        >
          Enter
        </button>
      </div>
    </div>
  );
}

export default PasswordScreen;
