FROM node:14-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run ng -- build --base-href / --prod

FROM nginx:1.21.1-alpine
COPY --from=build /usr/src/app/dist/front /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
