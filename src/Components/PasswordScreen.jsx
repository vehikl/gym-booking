import { useState } from "react";

function PasswordScreen() {
  const [password, setPassword] = useState("");

  const submitPassword = () => {
    if (!password) {
      return;
    }

    console.log("submit");
    // submit to firestore funciton, check if password is correct
    // if correct, store locally
    // if incorrect, error toast: 'incorrect password'
  };

  return (
    <div className="bg-blue-500 fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-4 rounded">
        <label className="block mb-2" htmlFor="">
          Enter Application Password
        </label>
        <input
          onChange={({ target: { value } }) => setPassword(value)}
          value={password}
          type="text"
          className="bg-white text-black p-2 rounded border border-black w-full"
        />

        <button
          className="p-4 rounded border border-gray-400"
          onClick={submitPassword}
        >
          Login Again
        </button>
      </div>
    </div>
  );
}

export default PasswordScreen;
