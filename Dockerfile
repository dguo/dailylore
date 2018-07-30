FROM node:10.7.0

WORKDIR /src

EXPOSE 8080

CMD ["npm", "run", "dev"]
