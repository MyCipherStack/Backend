




FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


RUN ls -la /app/dist


EXPOSE 5000



CMD ["npm","run","start"]