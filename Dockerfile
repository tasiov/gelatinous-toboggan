FROM node:4-onbuild

# Copy entire project
ADD / /
WORKDIR /app
RUN npm install
WORKDIR ../server
RUN npm install
EXPOSE 8000
CMD [ "npm", "start" ]
