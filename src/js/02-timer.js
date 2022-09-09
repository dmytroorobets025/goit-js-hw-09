import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const datetimePicker = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

let selectedTime = 0;

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
    if (Date.now() > selectedDates[0]) {
      return Notiflix.Notify.warning('Please choose a date in the future');
    }
    selectedTime = new Date(selectedDates[0]).getTime();
    btnStart.disabled = false;
  },
};

flatpickr(datetimePicker, options);

const startTimer = () => {
  btnStart.disabled = true;
  datetimePicker.disabled = true;

  const timerId = setInterval(() => {
    const date = Date.now();
    const timeToShow = selectedTime - date;
    if (timeToShow <= 0) {
      btnStart.disabled = false;
      datetimePicker.disabled = false;
      clearInterval(timerId);
      return Notiflix.Notify.success('Time is over!');
    }
    const timeForTimer = convertMs(timeToShow);
    timeToDisplay(timeForTimer);
  }, 1000);
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function timeToDisplay({ days, hours, minutes, seconds }) {
  timerDays.textContent = days;
  timerHours.textContent = hours;
  timerMinutes.textContent = minutes;
  timerSeconds.textContent = seconds;
}

btnStart.addEventListener('click', startTimer);