FROM node:18-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm db:generate && pnpm db:push && pnpm build

EXPOSE 3000
CMD ["node", "build"]
