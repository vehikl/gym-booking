import 'firebaseui/dist/firebaseui.css'

function SignIn() {
  return ( 
    <div className="h-screen w-screen items-center justify-center flex">
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>
    </div>
  )
}

export default SignIn
