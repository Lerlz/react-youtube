# Use the official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other files to the container
COPY . .

# Expose the port that the backend will listen on
EXPOSE 5000

# Command to start the backend
CMD ["npm", "start"]
