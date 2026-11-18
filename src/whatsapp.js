const { whatsappToken, phoneNumberId, graphApiVersion } = require("./config");

async function sendTextMessage(to, body) {
  if (!whatsappToken || !phoneNumberId || !graphApiVersion || graphApiVersion === "vXX.X") throw new Error("WhatsApp API settings are missing. Check your .env file.");
  const url = "https://graph.facebook.com/" + graphApiVersion + "/" + phoneNumberId + "/messages";
  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: "Bearer " + whatsappToken, "Content-Type": "application/json" },
    body: JSON.stringify({ messaging_product: "whatsapp", recipient_type: "individual", to, type: "text", text: { preview_url: false, body } }),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error?.message || "WhatsApp API request failed with status " + response.status);
  return result;
}
module.exports = { sendTextMessage };
