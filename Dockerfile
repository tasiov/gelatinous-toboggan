FROM node:4-onbuild

# Copy entire project
ADD / /

RUN npm install npm -g

EXPOSE 8000
