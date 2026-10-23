THE LEGENDS — LIVE VOICE EDITION

This version adds a Discord-style live voice room (join, mute/unmute, leave) using WebRTC + Socket.IO signaling.

IMPORTANT: This is a Node.js web app, not a standalone HTML file. The live voice room works only when the whole project is running on a server. The included STUN server helps with many connections, but friends on strict networks may require a TURN relay service. Do not share private information in public rooms.

RUN ON YOUR LAPTOP (Windows):
1. Install Node.js LTS from https://nodejs.org/
2. Extract this ZIP into a folder.
3. Open that folder in File Explorer, click the address bar, type cmd, press Enter.
4. Run: npm install
5. Run: npm start
6. Open http://localhost:3000 in Chrome.

For friends to join from different devices, deploy this Node.js project to a Node hosting provider with HTTPS. Share the hosted URL; everyone must use the same URL. The voice room is shared, but the older text chat/polls still use browser-local storage and do not sync between devices.

CONTROLS:
• Join voice — requests microphone permission and joins The Legends Lounge.
• Mute mic / Unmute mic — controls your microphone.
• Leave — exits the voice room and stops your microphone.

MICROPHONE: Allow browser microphone permission. HTTPS is required for remote hosting (localhost is allowed for testing).
