FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --silent && npm install vite --save-dev && npm install typescript --save-dev && npm install -g serve && mv node_modules ../
COPY . .
RUN chown -R node /usr/src/app && npm run build
USER node
CMD ["serve", "-s", "dist"]