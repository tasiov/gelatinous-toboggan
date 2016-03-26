FROM ubuntu:14.04

# Install Nodejs, npm and git

RUN apt-get update
RUN apt-get install -y nodejs npm git

# Copy entire project
ADD / /

WORKDIR /server
RUN npm install

WORKDIR ../app
RUN npm install
