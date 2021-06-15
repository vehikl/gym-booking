import { useState } from "react";
import firebase from "firebase/app";
import "firebase/functions";
import { toast } from "react-toastify";

function PasswordScreen() {
  const [password, setPassword] = useState("");

  const [visible, setVisible] = useState(true);

  const submitPassword = async () => {
    if (!password) {
      return;
    }

    const submitPassword = firebase.functions().httpsCallable("submitPassword");
    try {
      const result = await submitPassword({ password });
      localStorage.setItem("password", result.data);
      setVisible((previous) => !previous);
    } catch (e) {
      toast.error("Incorrect Password");
    }

    // submit to firestore funciton, check if password is correct
    // if correct, store locally
    // if incorrect, error toast: 'incorrect password'
  };

  return visible ? (
    <div className="bg-blue-500 fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-4 rounded">
        <label className="block mb-2" htmlFor="">
          Enter Application Password
        </label>
        <input
          onChange={({ target: { value } }) => setPassword(value)}
          value={password}
          type="password"
          className="bg-white text-black p-2 rounded border border-black w-full"
        />

        <button
          className="p-4 rounded border border-gray-400"
          onClick={submitPassword}
        >
          Enter
        </button>
      </div>
    </div>
  ) : null;
}

export default PasswordScreen;
