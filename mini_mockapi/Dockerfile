FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

COPY prisma ./prisma

RUN npm run build

EXPOSE 3000

CMD ["npx prisma migrate && npm run start"]
