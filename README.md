# WhatsApp Auto Reply Bot

A beginner-friendly WhatsApp Business auto-reply starter built with **Node.js**, **Express**, and the official **Meta WhatsApp Business Cloud API**.

## Features

- Meta webhook verification
- Receives incoming text messages
- Keyword-based replies for greetings, business hours, pricing, location, and thanks
- Outside-business-hours response
- Sends replies through the official WhatsApp Cloud API
- Environment-variable configuration
- Basic error handling without printing access tokens or message contents

## Requirements

- Node.js 20 or newer
- A Meta developer account
- A WhatsApp Business Platform app/phone number configured in Meta
- A public HTTPS URL for your webhook when connecting it to Meta

## 1. Install

Clone this repository and enter its folder:

```bash
git clone https://github.com/MuhammedAmeerHamza/whatsapp-auto-reply-bot.git
cd whatsapp-auto-reply-bot
npm install
```

## 2. Configure environment variables

Copy `.env.example` to a new file named `.env`:

- Windows PowerShell: `Copy-Item .env.example .env`
- macOS/Linux: `cp .env.example .env`

Open `.env` and enter the values from your Meta WhatsApp app:

| Variable | Meaning |
| --- | --- |
| `PORT` | Local server port (default: 3000) |
| `VERIFY_TOKEN` | A secret phrase you create; use the same value in Meta webhook settings |
| `WHATSAPP_TOKEN` | Your Meta WhatsApp access token |
| `PHONE_NUMBER_ID` | The WhatsApp phone number ID shown in Meta |
| `GRAPH_API_VERSION` | A currently supported Graph API version shown in your Meta app/docs |
| `BUSINESS_TIMEZONE` | Business timezone (default: Asia/Karachi) |
| `BUSINESS_HOURS_START` | Opening time in 24-hour format (default: 09:00) |
| `BUSINESS_HOURS_END` | Closing time in 24-hour format (default: 18:00) |

**Never share your access token or commit your `.env` file.** The repository ignores `.env` by default.

## 3. Start the server

Development mode:

```bash
npm run dev
```

Or normal mode:

```bash
npm start
```

Open `http://localhost:3000` to check the health response.

## 4. Connect the Meta webhook

1. In Meta for Developers, open your app and configure the WhatsApp product.
2. Make your local server available through a secure public HTTPS tunnel while testing, or deploy it to a hosting provider.
3. Set the webhook callback URL to `https://YOUR-PUBLIC-DOMAIN/webhook`.
4. Enter the exact same secret phrase used for `VERIFY_TOKEN` as the webhook verify token.
5. Complete verification and subscribe the WhatsApp webhook to the `messages` field.
6. Confirm your WhatsApp access token and phone number ID are configured correctly.

Meta's dashboard and official documentation are the source of truth for current setup steps and supported Graph API versions.

## 5. Customize replies

Edit `src/autoReply.js`. Add or change keyword checks inside `getAutoReply(message)`.

Business hours use the timezone and opening/closing values from your `.env` file. The current starter treats the configured hours as the same every day.

## Important notes before production

- This starter replies to text messages only. Media, interactive messages, and other message types are ignored.
- The example does not store customer conversations or maintain a persistent list of first-time contacts. A true one-time welcome message needs a database or another persistent store.
- For production, add webhook signature validation using your Meta app secret, persistent duplicate-event/idempotency handling, a database, rate limiting, monitoring, and secure secret management.
- WhatsApp messaging rules, templates, customer opt-in, and the applicable messaging window still apply. Follow Meta's current WhatsApp Business Platform policies.
- Test with your own approved test number before connecting real customers.

## Project structure

```text
whatsapp-auto-reply-bot/
├── src/
│   ├── server.js
│   ├── webhook.js
│   ├── whatsapp.js
│   ├── autoReply.js
│   └── config.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── LICENSE
```

## License

MIT. See [LICENSE](LICENSE).
