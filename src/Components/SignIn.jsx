import { useEffect } from 'react';
import apiClient from '../apiClient';

function SignIn() {
  const onMessage = (message) => {
    if (`${message.origin}/api` !== process.env.REACT_APP_API_BASE_URL) {
      return;
    }

    localStorage.setItem('user', message.data.name);
    localStorage.setItem('jwt', message.data.token);
    apiClient.defaults.headers.common.Authorization = `Bearer ${message.data.token}`;
  };

  useEffect(() => {
    window.addEventListener('message', onMessage, false);
    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, []);

  const handleOnClick = () => {
    window.open(`${process.env.REACT_APP_API_BASE_URL}/login/google/`, 'message');
  };

  return (
    <div className="h-screen w-screen items-center justify-center flex">
      <button type="button" onClick={handleOnClick} className="border rounded p-2">
        Sign in
      </button>
    </div>
  );
}

export default SignIn;
