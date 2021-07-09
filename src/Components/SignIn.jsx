import { useEffect } from 'react';

function SignIn() {
  const onMessage = (e) => {
    console.log('E: ', e);
    console.log('WINDPW: ', window.origin);
    if (e.origin === process.env.REACT_APP_API_BASE_URL) {
      console.log('YO');
    }

    // console.log(e);
    // console.log('TOKEN: ', e.data.token);
    // console.log('NAME:', e.data.name);
    // localStorage.setItem('user',e.data.name)
    // localStorage.setItem('jwt',e.data.token)
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
