export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  // Add the appropriate suffix to the day
  let daySuffix = "th";
  if (day === 1 || day === 21 || day === 31) {
    daySuffix = "st";
  } else if (day === 2 || day === 22) {
    daySuffix = "nd";
  } else if (day === 3 || day === 23) {
    daySuffix = "rd";
  }

  const formattedDate = `${day}${daySuffix} ${month} ${year}`;
  return formattedDate;
};

export const getFormattedTime = (dateTime) => {
  const date = new Date(dateTime);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
  return formattedTime;
};

export const getDuration = (startDateTime, endDateTime) => {
  const startDate = new Date(startDateTime);
  const endDate = new Date(endDateTime);

  const duration = endDate - startDate;

  // Calculate hours and minutes
  const hours = Math.floor(duration / (1000 * 60 * 60));
  const minutes = Math.floor((duration / (1000 * 60)) % 60);

  return { hours, minutes };
};
export const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);
  const currentDate = new Date();

  const day = date.getDate();
  const month = date.getMonth() + 1; // Month is zero-based, so add 1
  const year = date.getFullYear();
  const formattedDate = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year.toString()}`;

  if (date.toDateString() === currentDate.toDateString()) {
    // Display the time if it's the same day as the current date
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    return formattedTime;
  }

  return formattedDate;
};

export const formatDateTimeMessages = (dateTime) => {
  const date = new Date(dateTime);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Check if the date is today
  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return "Today";
  }

  // Check if the date is yesterday
  if (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  ) {
    return "Yesterday";
  }

  // Return the formatted date (dd/mm/yyyy)
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year.toString()}`;
};
