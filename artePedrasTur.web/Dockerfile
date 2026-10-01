# Estágio 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# Estágio 2: Servidor Web + TLS (Caddy obtém e renova o certificado
# Let's Encrypt sozinho, sem cron nem passo manual de renovação)
FROM caddy:alpine
COPY --from=builder /app/dist /srv
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80 443