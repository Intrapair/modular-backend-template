FROM node:18-alpine
# create and set working directory
WORKDIR /usr/app
# copy package.json
COPY package.json ./
# install dependencies
RUN yarn install
# copy source code
COPY . .
# expose port 3000
# EXPOSE 3000
# start app
CMD [ "yarn", "dev" ]