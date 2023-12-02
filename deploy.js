const firebase = require('firebase/compat/app');  // Use 'compat' for compatibility mode
require('firebase/compat/firestore');  // Use 'compat' for compatibility mode

// Replace with your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhDyy-uWtvbZSnQrCFFubX02CwznIPYp8",
  authDomain: "bac-2012.firebaseapp.com",
  projectId: "bac-2012",
  storageBucket: "bac-2012.appspot.com",
  messagingSenderId: "1080877923320",
  appId: "1:1080877923320:web:fcd3b6a920f0cf0330740d",
  measurementId: "G-VMFJXLEFYQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Replace with the actual user ID
const userId = 'labib';

// Replace with the data you want to add
const attendanceData = {
  presence: ['2023-12-01', '2023-12-03', '2023-12-05'],
  absence: ['2023-12-02', '2023-12-04'],
};

// Add data to Firestore
const db = firebase.firestore();
const attendanceRef = db.collection('attendance').doc(userId);

// Use async/await to handle the asynchronous nature of Firestore operations
async function addAttendanceData() {
  try {
    await attendanceRef.set(attendanceData);
    console.log('Data added successfully!');
  } catch (error) {
    console.error('Error adding data: ', error);
  }
}

// Call the function to add attendance data
addAttendanceData();
