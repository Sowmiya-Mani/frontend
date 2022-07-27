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

const prettyDate = (date) => {
  const dateObject = new Date(date);
  const timeDifference = Date.now() - dateObject.getTime();
  if (timeDifference < 1000) {
    return "Moments ago";
  } else if (timeDifference < 1000 * 60) {
    return Math.floor(timeDifference / 1000) > 1
      ? Math.floor(timeDifference / 1000) + " seconds ago"
      : "1 second ago";
  } else if (timeDifference < 1000 * 60 * 60) {
    return Math.floor(timeDifference / (1000 * 60)) > 1
      ? Math.floor(timeDifference / (1000 * 60)) + " minutes ago"
      : "1 minute ago";
  } else if (timeDifference < 1000 * 60 * 60 * 24) {
    return Math.floor(timeDifference / (1000 * 60 * 60)) > 1
      ? Math.floor(timeDifference / (1000 * 60 * 60)) + " hours ago"
      : "1 hour ago";
  } else if (timeDifference < 1000 * 60 * 60 * 24 * 7) {
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24)) > 1
      ? Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + " days ago"
      : "1 day ago";
  } else if (timeDifference < 1000 * 60 * 60 * 24 * 31) {
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7)) > 1
      ? Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7)) + " weeks ago"
      : "1 week ago";
  } else {
    return (
      dateObject.getUTCDate().toLocaleString() +
      "-" +
      dateObject.getUTCMonth().toLocaleString() +
      "-" +
      dateObject.getUTCFullYear().toString()
    );
  }
};

export { calculateRemainingTime, prettyDate };
