import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('[data-start]');
const selector = document.querySelector('#datetime-picker');

const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

startBtn.disabled = true;
let userSelectedDate;
let countdownInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
        backgroundColor: '#ef4040',
        message: 'Please choose a date in the future',
        messageColor: 'white',
        messageSize: '20',
        position: 'topRight',
        close: true,
        displayMode: 2,
      });
      startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startBtn.disabled = false;
    }
  },
};

flatpickr(selector, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startBtn.addEventListener('click', startCountTimer);

function startCountTimer() {
  startBtn.disabled = true;
  selector.disabled = true;

  countdownInterval = setInterval(() => {
    const currentTime = new Date();
    const timeDifference = userSelectedDate - currentTime;

    if (timeDifference <= 0) {
      // Зупиняємо інтервал
      clearInterval(countdownInterval);
      updateTimer(0);
      selector.disabled = false;

      iziToast.success({
        title: 'Done',
        message: 'Countdown finished!',
        timeout: 3000,
      });

      return;
    }

    updateTimer(timeDifference);
  }, 1000);
}

function updateTimer(ms) {
  const time = convertMs(ms);
  timerDays.textContent = addLeadingZero(time.days);
  timerHours.textContent = addLeadingZero(time.hours);
  timerMinutes.textContent = addLeadingZero(time.minutes);
  timerSeconds.textContent = addLeadingZero(time.seconds);
}
