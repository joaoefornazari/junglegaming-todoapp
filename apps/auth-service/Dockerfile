FROM node:20-alpine AS base
WORKDIR /app
ENV PATH=/app/node_modules/.bin:$PATH

# instsall build tools
RUN apk add --no-cache python3 make g++ bash

# copying files
COPY package*.json ./
COPY apps/auth-service/package*.json apps/auth-service/

# install dependencies
RUN npm ci

# remove build tools, making image lighter
RUN apk del make g++ || true

# ========== Development image ==========
FROM base AS development
ENV NODE_ENV=development
WORKDIR /app/apps/auth-service

# Copy full source (docker-compose typically mounts volumes over this in dev)
COPY . .

EXPOSE 3002

# Default dev command; adjust if your script name differs (e.g. start:dev)
CMD ["npm", "run", "dev"]

# ========== Production image ==========
FROM base AS production
ENV NODE_ENV=production
WORKDIR /app/apps/auth-service

COPY . .

# Build app (tries workspace-aware command, falls back to running inside package)
RUN npm run --workspace=apps/auth-service build || (cd apps/auth-service && npm run build)

# Remove dev dependencies
RUN npm prune --production

EXPOSE 3002
# Adjust the run command to your production entry (e.g. dist/index.js)
CMD ["node", "dist/index.js"]