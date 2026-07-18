export function formatPerfectDateTime(dateInput: string | Date): string {
  const date = new Date(dateInput);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;
  const hoursStr = hours.toString().padStart(2, "0");

  return `${day} ${month}, ${year} - ${hoursStr}.${minutes} ${ampm}`;
}

// Example
console.log(formatPerfectDateTime("2026-07-11T11:41:11.088250+06:00"));
// -> "11 July, 2026 - 11.41 AM"
