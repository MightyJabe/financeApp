FROM node:18

WORKDIR /app

# Copy only package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project
COPY . .

# Run Next.js in development mode
CMD ["npm", "run", "dev"]
