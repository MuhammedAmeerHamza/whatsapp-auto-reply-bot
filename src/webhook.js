const express = require("express");
const { verifyToken } = require("./config");
const { sendTextMessage } = require("./whatsapp");
const { getAutoReply } = require("./autoReply");
const router = express.Router();

router.get("/", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];
  if (mode === "subscribe" && token && token === verifyToken) return res.status(200).send(challenge);
  return res.sendStatus(403);
});

router.post("/", (req, res) => {
  res.sendStatus(200);
  (async () => {
    for (const entry of req.body?.entry || []) {
      for (const change of entry.changes || []) {
        for (const message of change.value?.messages || []) {
          if (message.type !== "text" || !message.from || !message.text?.body) continue;
          try {
            await sendTextMessage(message.from, getAutoReply(message.text.body));
            console.log("Reply sent for incoming WhatsApp message.");
          } catch (error) {
            console.error("Could not send WhatsApp reply:", error.message);
          }
        }
      }
    }
  })().catch((error) => console.error("Webhook processing error:", error.message));
});
module.exports = router;
