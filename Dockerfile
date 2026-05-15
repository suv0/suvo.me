# syntax=docker/dockerfile:1

FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
# libc6-compat: native deps (e.g. sharp) during `next build`
# ca-certificates: HTTPS to Google Fonts + registry during build
RUN apk add --no-cache libc6-compat ca-certificates
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Inlined at build for static metadata; pass: docker build --build-arg NEXT_PUBLIC_FB_APP_ID=1234567890
ARG NEXT_PUBLIC_FB_APP_ID=
ENV NEXT_PUBLIC_FB_APP_ID=$NEXT_PUBLIC_FB_APP_ID
# Avoid OOM on low-memory Docker Desktop during Turbopack + static generation
ENV NODE_OPTIONS=--max-old-space-size=6144
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=5050
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 5050

# Lets `docker compose ps` / orchestrators know when traffic is safe to send.
HEALTHCHECK --interval=10s --timeout=5s --start-period=25s --retries=4 \
  CMD node -e "fetch('http://127.0.0.1:5050/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
