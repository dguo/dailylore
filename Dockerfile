FROM node:8.2.1

# https://github.com/nodejs/docker-node#dockerfile
ENV NPM_CONFIG_LOGLEVEL warn

WORKDIR /src

EXPOSE 8080

CMD ["npm", "run", "dev"]
