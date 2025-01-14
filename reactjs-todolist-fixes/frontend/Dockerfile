# Use the official Node.js image as a base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if they exist)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the React app
RUN npm run build

# Expose the port (optional, depending on the app configuration)
EXPOSE 3000

# Command to run the React app
CMD ["npm", "start", "build"]
