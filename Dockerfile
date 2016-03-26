FROM ubuntu:14.04

# Install Nodejs

RUN apt-get update
RUN apt-get install -y nodejs

# Copy entire project
ADD / /
