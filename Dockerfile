# Use the official Node.js image as a base
FROM node:16

# Set the working directory
WORKDIR /app

# Install JSON Server globally
RUN npm install -g json-server

# Copy package.json and package-lock.json
COPY package*.json ./

# Install React app dependencies
RUN npm install

# Copy the rest of the React application code
COPY . .

# Build the React app
RUN npm run build

# Copy the JSON file into the container
COPY db.json .

# Expose ports for both JSON Server and React app
EXPOSE 3000
EXPOSE 3001

# Start JSON Server and React app concurrently
CMD ["sh", "-c", "json-server --watch db.json --port 3001 & npm start"]
