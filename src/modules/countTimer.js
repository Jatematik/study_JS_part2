function countTimer(deadLine) {
    const timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
        const dateStop = new Date(deadLine).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);
        return { timeRemaining, hours, minutes, seconds };
    }

    function updateClock() {
        const timer = getTimeRemaining();

        timerHours.textContent = timer.hours;
        timerMinutes.textContent = ('0' + timer.minutes).slice(-2);
        timerSeconds.textContent = ('0' + timer.seconds).slice(-2);

        if (timer.hours.toString().length < 2) {
            timerHours.textContent = ('0' + timer.hours).slice(-2);
        }

        if (timer.timeRemaining < 1) {
            clearInterval(stopTimer);
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
        }
    }

    const stopTimer = setInterval(updateClock, 1000);
    updateClock();
}

export default countTimer;