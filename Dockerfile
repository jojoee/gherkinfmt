# Build stage
FROM node:24-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY tsconfig.json ./
COPY src/ ./src/

# Build the application
RUN npm run build && npm run build:cli

# Production stage
FROM node:24-alpine

WORKDIR /app

# Copy built files
COPY --from=builder /app/dist/ ./dist/
COPY --from=builder /app/bin/ ./bin/
COPY --from=builder /app/package.json ./

# Set non-root user for security
RUN addgroup -g 1001 -S gherkinfmt && \
    adduser -S gherkinfmt -u 1001 -G gherkinfmt && \
    chown -R gherkinfmt:gherkinfmt /app

USER gherkinfmt

# Set entrypoint
ENTRYPOINT ["node", "bin/gherkinfmt.js"]

# Default command shows help
CMD ["--help"]
