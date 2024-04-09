FROM node:16-alpine3.16
WORKDIR /app
COPY . .
RUN apk add --no-cache tzdata  sqlite-dev postgresql-dev mysql-dev 
#RUN yarn add npx global
RUN yarn add @types/express
RUN yarn add @types/cors
RUN yarn upgrade -y
ENV PORT 3000
EXPOSE ${PORT}
CMD ["sh","./tsrun.sh"]
