ARG ENDPOINT="http://localhost:3000"

FROM node:22 AS builder
ARG ENDPOINT
ENV VITE_ENDPOINT=$ENDPOINT
WORKDIR /app
COPY --link package.json package-lock.json ./
RUN npm ci
COPY --link src ./src
# COPY --link public ./public
COPY --link index.html eslint.config.js tsconfig.app.json tsconfig.json tsconfig.node.json vite.config.ts vitest.config.ts ./
RUN <<EOS
    npm run build
    npm prune --production
EOS

FROM nginx:1.27
COPY --link nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --link --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80