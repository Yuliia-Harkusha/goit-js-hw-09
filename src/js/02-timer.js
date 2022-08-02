import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    timePicker: document.querySelector("#datetime-picker"),
    startBtn: document.querySelector("button[data-start]"),
    daysElement: document.querySelector("span[data-days]"),
    hoursElement: document.querySelector("span[data-hours]"),
    minutesElement: document.querySelector("span[data-minutes]"),
    secondsElement: document.querySelector("span[data-seconds]"),
};

refs.startBtn.disabled = true;
let selectedTime = null;
let timerId;
let deltaTime;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
          Notify.failure('Please choose a date in the future');
        } else {
            refs.startBtn.disabled = false;
            selectedTime = selectedDates[0];
        };
  },
};

flatpickr(refs.timePicker, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    
  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    return String(value).padStart(2, 0);
};

function convertTimeElements({ days, hours, minutes, seconds }) {
    refs.daysElement.textContent = days;
    refs.hoursElement.textContent = hours;
    refs.minutesElement.textContent = minutes;
    refs.secondsElement.textContent = seconds;
};

refs.startBtn.addEventListener('click', () => {
    timerId = setInterval(() => {
    const deadLine = selectedTime;
    deltaTime = deadLine - Date.now();
    let timeElements = convertMs(deltaTime);
        convertTimeElements(timeElements);
    if(Math.floor(deltaTime/1000) <= 0) {
        clearInterval(timerId);
        };

    refs.startBtn.disabled = true;
    refs.timePicker.disabled = true;
    }, 1000);
});





