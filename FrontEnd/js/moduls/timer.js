export default function timer() {
    const deadline = "2024-12-31 23:59";
  
    const setZero = n => n >= 0 && n < 10 ? `0${n}` : n;
  
    function getTimeRemaining(endtime) {
      let days, hours, minutes, seconds;
      const total = Date.parse(endtime) - Date.parse(new Date());
  
      if (total <= 0) {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
      }
  
      else {
        days = Math.floor(total / (1000 * 60 * 60 * 24));
        hours = Math.floor((total / (1000 * 60 * 60) % 24));
        minutes = Math.floor((total / 1000 / 60) % 60);
        seconds = Math.floor((total / 1000) % 60);
      }
  
      return { total, days, hours, minutes, seconds };
    }
  
    function setTimer(selector, endtime) {
      const timer = document.querySelector(selector);
      const daysElem = timer.querySelector("#days");
      const hoursElem = timer.querySelector("#hours");
      const minutesElem = timer.querySelector("#minutes");
      const secondsElem = timer.querySelector("#seconds");
  
      const timerID = setInterval(updateTimer, 1000);
  
      updateTimer();
  
      function updateTimer() {
        const { total, days, hours, minutes, seconds } = getTimeRemaining(endtime);
        daysElem.innerHTML = setZero(days);
        hoursElem.innerHTML = setZero(hours);
        minutesElem.innerHTML = setZero(minutes);
        secondsElem.innerHTML = setZero(seconds);
  
        if (total <= 0) {
          clearInterval(timerID);
        }
      }
    }
  
    setTimer(".timer", deadline);
  }