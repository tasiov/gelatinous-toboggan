FROM ubuntu:14.04

# Install Nodejs, npm, git and ffmpeg

RUN apt-get update
RUN apt-get install -g nodejs npm git ffmpeg

# Copy entire project
ADD / /

WORKDIR /app
RUN npm install
