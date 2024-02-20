FROM node:16.17.0
WORKDIR /
COPY package.json /
COPY package-lock.json /
RUN npm ci
COPY . /
EXPOSE 3000
CMD ["npm", "start"]