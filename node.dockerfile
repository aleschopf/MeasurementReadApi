FROM node:22.6.0

WORKDIR /app

RUN apt-get update && apt-get install -y default-mysql-client

COPY package*.json ./

RUN npm install
COPY . .
RUN mkdir -p /app/dist/uploads/
RUN npm run build

COPY wait-for-mysql.sh /usr/src/app/wait-for-mysql.sh
RUN chmod +x /usr/src/app/wait-for-mysql.sh

EXPOSE 80

CMD ["./wait-for-mysql.sh", "npm", "start"]