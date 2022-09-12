import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const datetimePicker = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');
const INTERVAL__TIME = 1000;
let selectedTime = null;
let selectedDate = Date.now();

Notiflix.Notify.init({
  position: 'center-top',
  useIcon: true,
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedDate = selectedDates[0];
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.warning('Please choose a date in the future');
      btnStart.setAttribute('disabled', true);
    } else {
      btnStart.removeAttribute('disabled', '');
    }
  },
};
flatpickr('input#datetime-picker', options);
btnStart.addEventListener('click', startCountdown);

function startCountdown() {
  btnStart.setAttribute('disabled', '');
  datetimePicker.setAttribute('disabled', '');
  selectedTime = setInterval(timeOut, INTERVAL__TIME);
}

function timeOut() {
  const getTimeComponents = selectedDate - new Date();

  if (getTimeComponents <= 0) {
    Notiflix.Notify.success('Timer is Over!');
    clearInterval(selectedTime);
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(getTimeComponents);

  timerDays.textContent = pad(days);
  timerHours.textContent = pad(hours);
  timerMinutes.textContent = pad(minutes);
  timerSeconds.textContent = pad(seconds);
}

function pad(value) {
  return String(value).padStart(2, 0);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}