// references
const timeInput = document.getElementById('time-input');
const startButton = document.getElementById('start-btn');
const countdownDisplay = document.getElementById('countdown-display');
const motivationalText = document.getElementById('motivational-text');

// Format automatically
timeInput.addEventListener('input', (event) => {
  const value = event.target.value.replace(/[^0-9]/g, '');
  const formatted = value.replace(/(\d{2})(\d{2})?(\d{2})?/, (match, h, m, s) => {
    return `${h || ''}${m ? ':' + m : ''}${s ? ':' + s : ''}`;
  });
  event.target.value = formatted;
});

// countdown
startButton.addEventListener('click', () => {
  const timeParts = timeInput.value.split(':').map(Number);
  if (timeParts.length !== 3) {
    alert('Please enter time in HH:MM:SS format');
    return;
  }

  let [hours, minutes, seconds] = timeParts;
  let totalSeconds = hours * 3600 + minutes * 60 + seconds;

  if (isNaN(totalSeconds) || totalSeconds <= 0) {
    alert('Please enter a valid time greater than 00:00:00');
    return;
  }

  startCountdown(totalSeconds);
});

//
function startCountdown(totalSeconds) {
  motivationalText.textContent = "Stay focused! You got this!";
  const interval = setInterval(() => {
    if (totalSeconds > 0) {
      const hrs = Math.floor(totalSeconds / 3600);
      const mins = Math.floor((totalSeconds % 3600) / 60);
      const secs = totalSeconds % 60;
      countdownDisplay.textContent = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      totalSeconds--;
    } else {
      clearInterval(interval);
      motivationalText.textContent = "Time for a break!";
      countdownDisplay.textContent = "00:00:00";
      alert("Break time!");
    }
  }, 1000);
}
