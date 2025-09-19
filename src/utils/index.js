export function formatTimestampToTime(timestamp) {
  // Millisekundga o‘tkazamiz
  if (!timestamp) return "";

  const millis =
    timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1e6);

  // Date obyektiga o‘giramiz
  const date = new Date(millis);

  // Soat va minutni ajratib olish
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}
