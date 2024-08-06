<BrowserRouter basename={process.env.PUBLIC_URL}></BrowserRouter>

FROM node:20-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]


import { format, utcToZonedTime } from 'date-fns-tz';

const now = new Date();
const estDate = utcToZonedTime(now, 'America/New_York');
const estDateString = format(estDate, "yyyy-MM-dd'T'HH:mm:ssXXX", { timeZone: 'America/New_York' });

console.log(estDateString); // This will show the date in EST/EDT
