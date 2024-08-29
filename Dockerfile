FROM node:22.6.0

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

RUN npm install sqlite3 --build-from-source

RUN touch /app/shopper.sqlite && chown node:node /app/shopper.sqlite

RUN mkdir -p /app/dist/uploads/

COPY . .

RUN npm run build

EXPOSE 80

CMD ["npm", "start"]