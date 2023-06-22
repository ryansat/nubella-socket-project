# Build stage
FROM node:alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Final stage
FROM node:alpine
WORKDIR /app
COPY --from=build /app .
CMD ["node", "app.js", "/var/run/dev-test/sock"]
