FROM ubuntu:14.04

# Install Nodejs and npm

RUN apt-get update
RUN apt-get install -y nodejs npm

# Copy entire project
ADD / /

RUN cd app
RUN npm install
