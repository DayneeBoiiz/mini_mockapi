FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

COPY prisma ./prisma

RUN npx prisma generate

EXPOSE 3000
