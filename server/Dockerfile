# Use an official Node.js image as the base image
FROM node:18.16.0-alpine3.17

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install npm dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which the Node.js application will run
EXPOSE 3080

# Command to start the Node.js application
CMD ["npm", "start"]