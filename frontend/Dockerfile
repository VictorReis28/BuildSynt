# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# Production
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html

RUN addgroup -g 1001 buildsynt && \
    adduser -S buildsynt -u 1001 -G buildsynt && \
    chown -R buildsynt:buildsynt /usr/share/nginx/html /var/cache/nginx /var/log/nginx /var/run

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

USER buildsynt

CMD ["nginx", "-g", "daemon off;"]
