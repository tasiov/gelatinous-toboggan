FROM ubuntu:14.04

# Install Nodejs and npm

RUN apt-get update
RUN apt-get install -y nodejs npm

# Copy entire project
ADD / /

WORKDIR /app
RUN npm install

WORKDIR ../server
RUN npm install
