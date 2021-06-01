import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';
import * as firebaseui from 'firebaseui';

const firebaseConfig = {
  apiKey: "AIzaSyAOE9Y9NZShzcbF1huCMPCaNMK9lQAS0dM",
  authDomain: "gym-booking-ef593.firebaseapp.com",
  projectId: "gym-booking-ef593",
  storageBucket: "gym-booking-ef593.appspot.com",
  messagingSenderId: "351559060650",
  appId: "1:351559060650:web:9c9359d148cb5248ec14d3"
};

const app = firebase.initializeApp(firebaseConfig);
const ui = new firebaseui.auth.AuthUI(firebase.auth());

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [ firebase.auth.GoogleAuthProvider.PROVIDER_ID]
};

ui.start('#firebaseui-auth-container', uiConfig);

ReactDOM.render(
  <React.StrictMode>
    <App app={app} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
