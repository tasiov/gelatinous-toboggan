FROM ubuntu:15.04

# Install Nodejs, npm, git and ffmpeg

RUN apt-get update
RUN apt-get install -y nodejs npm git ffmpeg
RUN apt-get upgrade

# manually create a symlink /usr/bin/node
RUN ln -s `which nodejs` /usr/bin/node

# Copy entire project
ADD / /

WORKDIR /app
RUN npm install
