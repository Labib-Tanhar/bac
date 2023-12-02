// Initialize Firebase with your own configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhDyy-uWtvbZSnQrCFFubX02CwznIPYp8",
  authDomain: "bac-2012.firebaseapp.com",
  projectId: "bac-2012",
  storageBucket: "bac-2012.appspot.com",
  messagingSenderId: "1080877923320",
  appId: "1:1080877923320:web:41d0cfb6b3cb7da530740d",
  measurementId: "G-75BX9SCCLV"
};
  
  firebase.initializeApp(firebaseConfig);
  
  // Function to fetch presence and absence data for a user from Firebase Firestore
  async function getAttendanceData(userId) {
    const attendanceRef = firebase.firestore().collection('attendance').doc(userId);
    const snapshot = await attendanceRef.get();
  
    if (snapshot.exists) {
      return snapshot.data();
    } else {
      console.log('Attendance data not found for user:', userId);
      return {};
    }
  }
  
  // Function to update calendar based on attendance data
  function updateCalendar(userId) {
    const calendarDays = document.querySelectorAll('.calendar .days li');
  
    getAttendanceData(userId).then(attendanceData => {
      calendarDays.forEach(day => {
        const date = day.dataset.date;
  
        if (attendanceData.absence && attendanceData.absence.includes(date)) {
          day.classList.remove('active');
          day.classList.add('inactive');
        } else if (attendanceData.presence && attendanceData.presence.includes(date)) {
          day.classList.remove('inactive');
          day.classList.add('active');
        } else {
          day.classList.remove('active', 'inactive');
        }
      });
    });
  }
  
  // Fetch user ID from the data attribute and update the calendar
  const userId = document.querySelector('.wrapper').dataset.userId;
  updateCalendar(userId);
  