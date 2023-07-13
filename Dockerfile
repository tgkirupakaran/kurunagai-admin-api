FROM node:18

# Create app directory
WORKDIR /usr/src/app

ENV PORT 80
# etc.
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN mkdir -p ./storage/uploads

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

EXPOSE ${PORT}
CMD [ "npm", "start" ]
