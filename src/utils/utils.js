const calculateRemainingTime = (date_ends, setRemainingTime) => {
  let timeLeft = new Date(date_ends).getTime() - new Date().getTime();

  var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  setRemainingTime(
    days.toString() +
      " days, " +
      hours.toString() +
      " hours, " +
      minutes.toString() +
      " minutes, " +
      seconds.toString() +
      " seconds"
  );
};

export default calculateRemainingTime;
