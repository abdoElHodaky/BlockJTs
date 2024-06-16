FROM node:18-alpine
WORKDIR /app
COPY . .
RUN apk add --no-cache tzdata  sqlite-dev postgresql-dev mysql-dev 
#RUN yarn add npx global
RUN yarn add @types/express @types/cors swagger-themes request
RUN yarn upgrade -y
ENV PORT 3000
EXPOSE ${PORT}
CMD ["sh","./tsrun.sh"]
