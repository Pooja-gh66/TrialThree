FROM node:16

WORKDIR /app

# Install JSON Server globally
RUN npm install -g json-server

# Copy the JSON file into the container
COPY db.json .

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
