FROM node:22.11.0

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

CMD ["npx", "next", "dev", "-H", "0.0.0.0"]
