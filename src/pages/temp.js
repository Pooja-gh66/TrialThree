<BrowserRouter basename={process.env.PUBLIC_URL}></BrowserRouter>

FROM node:20-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
