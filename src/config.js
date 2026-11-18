require("dotenv").config();

const required = ["VERIFY_TOKEN", "WHATSAPP_TOKEN", "PHONE_NUMBER_ID", "GRAPH_API_VERSION"];
const missing = required.filter((key) => !process.env[key]);
if (missing.length) console.warn("Missing environment variables: " + missing.join(", ") + ". Copy .env.example to .env and fill it in.");

module.exports = {
  port: Number(process.env.PORT || 3000),
  verifyToken: process.env.VERIFY_TOKEN,
  whatsappToken: process.env.WHATSAPP_TOKEN,
  phoneNumberId: process.env.PHONE_NUMBER_ID,
  graphApiVersion: process.env.GRAPH_API_VERSION,
  businessTimezone: process.env.BUSINESS_TIMEZONE || "Asia/Karachi",
  businessHoursStart: process.env.BUSINESS_HOURS_START || "09:00",
  businessHoursEnd: process.env.BUSINESS_HOURS_END || "18:00",
};
