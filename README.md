# Homework №10

1. Create a repository **`goit-js-hw-10`**.
2. Build the project using [**Vite**](https://vite.dev/). We have prepared a
   [ready-made template](https://github.com/goitacademy/vanilla-app-template)
   with all additional project settings and recommend using it.
3. Read the task and complete it in your code editor.
4. Make sure the code is formatted using **Prettier** and there are no errors or
   warnings in the console when opening the live page.
5. Submit your homework for review.

**Submission format:** The homework should include two links: to the source
files and to the live page on GitHub Pages.

---

## Project Structure

The folder and file structure in the `src` folder should look as follows:

![Project preview](assets/goit-09.png)

---

## Task 1 — Countdown Timer

Complete this task in the files `1-timer.html` and `1-timer.js`. Write a timer
script that counts down to a specific date.

This timer can be used in blogs, online stores, event registration pages,
maintenance pages, etc. Watch the demo video to see how the timer works.

## 🎥 Demo Video

https://github.com/user-attachments/assets/e85944a7-982a-41cc-897a-4c09071b0a3c

---

### Interface Elements

Add the timer markup to the HTML file, a date picker field, and a button that
starts the timer when clicked. Style the interface elements according to the
design.

```html
<input type="text" id="datetime-picker" />
<button type="button" data-start>Start</button>

<div class="timer">
  <div class="field">
    <span class="value" data-days>00</span>
    <span class="label">Days</span>
  </div>
  <div class="field">
    <span class="value" data-hours>00</span>
    <span class="label">Hours</span>
  </div>
  <div class="field">
    <span class="value" data-minutes>00</span>
    <span class="label">Minutes</span>
  </div>
  <div class="field">
    <span class="value" data-seconds>00</span>
    <span class="label">Seconds</span>
  </div>
</div>
```

### flatpickr Library

Use the [**flatpickr**](https://flatpickr.js.org/) library to allow the user to
cross-browser select the end date and time in a single interface element.

To connect the library’s CSS code to the project, you need to add one more
import in addition to the one described in the documentation:

```js
// Import described in the documentation
import flatpickr from 'flatpickr';

// Additional styles import
import 'flatpickr/dist/flatpickr.min.css';
```

The library expects to be initialized on an `input[type="text"]` element, so an
`input#datetime-picker` field is added to the HTML document:

```html
<input type="text" id="datetime-picker" />
```

### flatpickr Options Configuration

The second argument of the `flatpickr(selector, options)` function can be an
optional options object. We have prepared the object required to complete the
task.

Review what each property is responsible for in the **“Options”** section of the
documentation and use it in your code.

```js
const options = {
  enableTime: true, // Allows time selection along with the date
  time_24hr: true, // Uses 24-hour time format
  defaultDate: new Date(), // Sets the current date as the default value
  minuteIncrement: 1, // Step for selecting minutes
  onClose(selectedDates) {
    // Function called when the calendar is closed
    console.log(selectedDates[0]); // Logs the selected date to the console
  },
};
```

## Date Selection

The `onClose()` method from the options object is called every time the
interface element created by `flatpickr` is closed. This is where the date
selected by the user should be processed. The `selectedDates` parameter is an
array of selected dates, so we take the first element: `selectedDates[0]`.

You will need this selected date in your code outside the `onClose()` method as
well. Therefore, declare a `let` variable outside the method, for example
`userSelectedDate`, and after validating it as being in the past or in the
future inside the `onClose()` method, store the selected date in this variable.

- If the user selects a date in the past, show a `window.alert()` with the
  message `"Please choose a date in the future"` and disable the **Start**
  button.
- If the user selects a valid date (in the future), the **Start** button becomes
  enabled.
- The **Start** button must remain disabled until the user selects a date in the
  future. Note that if the user selects a valid date, then does not start the
  timer and later selects an invalid date, the button must become disabled again
  after being enabled.
- Clicking the **Start** button starts the countdown to the selected date from
  the moment the button is pressed.

## Time Countdown

When the **Start** button is clicked, the script should calculate once per
second how much time remains until the specified date and update the timer
interface, displaying four values: days, hours, minutes, and seconds in the
`xx:xx:xx:xx` format.

- The number of days may consist of more than two digits.
- The timer should stop when it reaches the end date, meaning the remaining time
  equals zero: `00:00:00:00`.

After the timer starts:

- The **Start** button and the input become disabled so the user cannot select a
  new date during the countdown.
- After the timer stops, the input becomes enabled so the user can select the
  next date. The button remains disabled.

To calculate the values, use the provided `convertMs` function, where `ms` is
the difference between the end date and the current date in milliseconds.

```js
function convertMs(ms) {
  // Number of milliseconds in each time unit
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
```

## Time Formatting

The `convertMs()` function returns an object with the calculated time remaining
until the target date. Note that it does not format the result. That means if
there are 4 minutes (or any other time unit) left, the function will return `4`,
not `04`.

In the timer interface, you must add a leading `0` if the value contains fewer
than two characters. Write a function, for example `addLeadingZero(value)`,
which uses the string method `padStart()` and formats the values before
rendering them in the interface.

## Notification Library

To display messages to the user, use the
[**iziToast**](https://marcelodolza.github.io/iziToast/) library instead of
`window.alert()`. To include the library’s CSS code in the project, you need to
add an additional import besides the one described in the documentation.

```js
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
```

## What the Mentor Will Pay Attention to During the Review

- The [**flatpickr**](https://flatpickr.js.org/) and
  [**iziToast**](https://marcelodolza.github.io/iziToast/) libraries are
  connected.
- When the page is first loaded, the **Start** button is disabled.
- Clicking on the input opens a calendar where a date can be selected.
- If a past date is selected, the **Start** button becomes disabled and a
  message with the text `"Please choose a date in the future"` appears.
- If a future date is selected, the **Start** button becomes enabled.
- When the **Start** button is clicked, it becomes disabled, the remaining time
  until the selected date is displayed on the page in the `xx:xx:xx:xx` format,
  and the countdown to the selected date starts.
- Every second, the interface is updated and shows the updated remaining time.
- The timer stops when it reaches the target date, that is, when the remaining
  time equals zero, and the interface looks like this: `00:00:00:00`.
- The time displayed in the interface is formatted, and if it contains fewer
  than two characters, a leading `0` is added.

---

## Task 2 — Promise Generator

Complete this task in the `2-snackbar.html` and `2-snackbar.js` files. Watch the
demo video of the promise generator.

## 🎥 Demo Video

https://github.com/user-attachments/assets/9385bf34-22ca-40d2-829b-caec8fafb5b1

Add the form markup to the HTML file. The form consists of an input field for
entering the delay value in milliseconds, two radio buttons that define the
promise state, and a **submit** button. When the button is clicked, a promise
should be created.

```html
<form class="form">
  <label>
    Delay (ms)
    <input type="number" name="delay" required />
  </label>

  <fieldset>
    <legend>State</legend>
    <label>
      <input type="radio" name="state" value="fulfilled" required />
      Fulfilled
    </label>
    <label>
      <input type="radio" name="state" value="rejected" required />
      Rejected
    </label>
  </fieldset>

  <button type="submit">Create notification</button>
</form>
```

Write a script that creates a **promise** after the form is submitted. Inside
the callback of this promise, after the number of milliseconds specified by the
user, the promise should be either **fulfilled** or **rejected**, depending on
the option selected in the radio buttons. The value of the promise that is
passed as an argument to the `resolve`/`reject` methods should be the delay
value in milliseconds.

The created promise must be handled using the appropriate methods for successful
or failed execution.

If the promise is fulfilled successfully, output the following message to the
console, where `delay` is the delay value of the promise call in milliseconds:

`✅ Fulfilled promise in ${delay}ms`

If the promise is rejected, output the following message to the console, where
`delay` is the delay value of the promise in milliseconds:

`❌ Rejected promise in ${delay}ms`

## Notification Library

To display notifications, use the **iziToast** library instead of
`console.log()`. In order to include the library’s CSS styles in the project,
you need to add one more import in addition to the one described in the
documentation.

```js
// Import described in the documentation
import iziToast from 'izitoast';
// Additional styles import
import 'izitoast/dist/css/iziToast.min.css';
```

## What the mentor will check during the review

- The **iziToast** library is connected.
- When a state is selected using the radio buttons and the **Create
  notification** button is clicked, a notification appears with a style
  corresponding to the selected state, after a delay equal to the number of
  milliseconds entered in the input.
- The displayed notification contains the selected state type and the number of
  milliseconds according to the template specified in the task.

---

**Live page: [GitHub Pages](https://akinaru72.github.io/goit-js-hw-10/)**
