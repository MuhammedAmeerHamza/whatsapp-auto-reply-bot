const { businessTimezone, businessHoursStart, businessHoursEnd } = require("./config");

function isWithinBusinessHours(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: businessTimezone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(date);
  const hour = Number(parts.find((p) => p.type === "hour").value);
  const minute = Number(parts.find((p) => p.type === "minute").value);
  const current = hour * 60 + minute;
  const [sh, sm] = businessHoursStart.split(":").map(Number);
  const [eh, em] = businessHoursEnd.split(":").map(Number);
  return current >= sh * 60 + sm && current < eh * 60 + em;
}

function getAutoReply(message) {
  const text = String(message || "").trim().toLowerCase();
  if (/^(hi|hello|hey|salam|assalam ?o ?alaikum)\\b/.test(text)) return "Hello! 👋 Thanks for contacting us. How can we help you today?";
  if (/\\b(hours|opening|open|closing|timing|time)\\b/.test(text)) return "Our business hours are " + businessHoursStart + "–" + businessHoursEnd + " (" + businessTimezone + ").";
  if (/\\b(price|prices|pricing|cost|rate)\\b/.test(text)) return "Thanks for your interest! Which product or service would you like a price for?";
  if (/\\b(location|address|where are you)\\b/.test(text)) return "Please contact our team for our current business location and directions.";
  if (/\\b(thanks|thank you|thx)\\b/.test(text)) return "You're welcome! 😊 Let us know if there's anything else we can help with.";
  if (!isWithinBusinessHours()) return "Thanks for messaging us. We are outside business hours (" + businessHoursStart + "–" + businessHoursEnd + ", " + businessTimezone + "). We will get back to you as soon as possible.";
  return "Thanks for your message! 😊 We have received it. Please tell us a little more about how we can help.";
}
module.exports = { getAutoReply, isWithinBusinessHours };
