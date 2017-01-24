FROM node:6.7.0

# https://github.com/nodejs/docker-node#dockerfile
ENV NPM_CONFIG_LOGLEVEL warn

WORKDIR /src

EXPOSE 8080

CMD ["npm", "run", "dev"]
