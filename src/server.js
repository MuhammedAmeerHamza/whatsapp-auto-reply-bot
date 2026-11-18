const express = require("express");
const webhookRouter = require("./webhook");
const { port } = require("./config");
const app = express();
app.use(express.json({ limit: "1mb" }));
app.get("/", (_req, res) => res.status(200).json({ name: "WhatsApp Auto Reply Bot", status: "running", webhook: "/webhook" }));
app.use("/webhook", webhookRouter);
app.listen(port, () => console.log("WhatsApp Auto Reply Bot listening on port " + port));
