FROM node:16-alpine As development

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY yarn.lock ./

# Install app dependencies
RUN yarn install 

# Bundle app source
COPY . .

RUN npm run build

CMD ["npm", "start"]
