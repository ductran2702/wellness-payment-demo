brew install ngrok

enter command: ngrok http 3000

copy the url and paste into the constant named 'ngrokHost' inside

/BE/src/packages/api/resources/orders/constants.ts

leave ngrok open

start BE
-docker compose up
-npm install
-npm run migration:run
-npm run db:seed
-npm run dev

start FE
-npm run install
-npm run dev

=> visit localhost:3001
