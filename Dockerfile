FROM node:6.11.1

# https://github.com/nodejs/docker-node#dockerfile
ENV NPM_CONFIG_LOGLEVEL warn

WORKDIR /src

EXPOSE 8080

CMD ["npm", "run", "dev"]
