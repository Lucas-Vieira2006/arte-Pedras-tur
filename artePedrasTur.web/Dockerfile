# Estágio 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Default de build para producao: o front fala com a API via mesmo
# dominio/HTTPS, roteado pelo Caddy (ver Caddyfile). Sem isso, o build
# rodando num ambiente sem o .env local (ex.: runner do GitHub Actions,
# que nao tem o .env — esta no .gitignore) deixava VITE_API_URL undefined
# e todo fetch ia pra uma URL relativa errada, quebrando o site inteiro.
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# Estágio 2: Servidor Web + TLS (Caddy obtém e renova o certificado
# Let's Encrypt sozinho, sem cron nem passo manual de renovação)
FROM caddy:alpine
COPY --from=builder /app/dist /srv
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80 443