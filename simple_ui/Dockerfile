FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# stage 2: Nginx to serve frontend and proxy API
FROM nginx:latest
# Remove default nginx.html
RUN rm -rf /usr/share/nginx/html/*
# copy frontend build output
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx config will be mounted from host via docker-compose volumes
EXPOSE 5000

CMD [ "nginx", "-g", "daemon off;" ]