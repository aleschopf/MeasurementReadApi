FROM node:22.6.0

WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . .
RUN mkdir -p /app/dist/uploads/
RUN npm run build

EXPOSE 80

CMD ["npm", "start"]