import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const btnEl = document.querySelector('[data-start]');
const inputEl = document.querySelector('#datetime-picker');

const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

let userSelectedDate;

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

btnEl.classList.add('disable');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate <= new Date()) {
      iziToast.error({
        backgroundColor: '#ef4040',
        message: 'Please choose a date in the future',
        messageColor: 'white',
        messageSize: '20',
        position: 'topRight',
        close: true,
        displayMode: 2,
      });
      btnEl.classList.add('disable');
    } else {
      btnEl.classList.remove('disable');
    }
    console.log(userSelectedDate);
  },
};

function addZerro(value) {
  return String(value).padStart(2, '0');
}

function updateTimer(ms) {
  const time = convertMs(ms);
  timerDays.textContent = addZerro(time.days);
  timerHours.textContent = addZerro(time.hours);
  timerMinutes.textContent = addZerro(time.minutes);
  timerSeconds.textContent = addZerro(time.seconds);
}

const onBtnClick = () => {
  btnEl.classList.add('disable');
  inputEl.classList.add('disable');

  let letIntervalId = null;
  let diff;

  letIntervalId = setInterval(() => {
    diff = userSelectedDate - Date.now();

    if (diff <= 0) {
      clearInterval(letIntervalId);
      updateTimer(0);
      inputEl.classList.remove('disable');

      iziToast.success({
        title: 'Done',
        message: 'Countdown finished!',
        timeout: 3000,
        messageSize: '20',
        position: 'topRight',
        close: true,
        displayMode: 2,
      });
      return;
    }
    updateTimer(diff);
  }, 1000);
};

btnEl.addEventListener('click', onBtnClick);

flatpickr('#datetime-picker', options);
