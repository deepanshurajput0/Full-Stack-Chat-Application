# High Level Diagram of Chat App

<img width="1570" height="741" alt="Screenshot 2025-08-20 205711" src="https://github.com/user-attachments/assets/a8d845e2-13d1-4976-9b7c-9d835d8c5a56" />



## 3. Install Prisma CLI (dev) and client (runtime)
npm install prisma --save-dev
npm install @prisma/client

## 4. Initialize Prisma (creates schema.prisma + .env)
npx prisma init

## 5. Generate client in default location node_modules/@prisma/client
npx prisma generate


## Data modeling of Chat App

<img width="1118" height="733" alt="Screenshot 2025-08-21 140954" src="https://github.com/user-attachments/assets/fce2bab7-c39f-4c75-8434-ab617b1ae4f3" />

## Flow of Realtime Messaging
How User A sends message to User B

<img width="1582" height="778" alt="Screenshot 2025-08-23 131259" src="https://github.com/user-attachments/assets/25ad2745-039c-40bc-b59c-a9b17a8555bd" />
