# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Copy build output and app files
COPY --from=build /app/dist ./dist
COPY server.js ./
COPY package*.json ./

# Install only production dependencies (express)
RUN npm install --only=production

EXPOSE 3000
CMD ["node", "server.js"]
