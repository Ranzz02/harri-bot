# Use the official Node.js image as the base
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

ENV BOT_TOKEN=${BOT_TOKEN}
ENV GUILD_ID=${GUILD_ID}

# Start the bot
CMD ["node", "./src/index.js"]