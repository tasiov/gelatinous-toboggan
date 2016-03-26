FROM ubuntu

# Install Nodejs, npm, git and ffmpeg

RUN apt-get update
RUN apt-get install -y nodejs npm git avconv
RUN apt-get upgrade

# Copy entire project
ADD / /

WORKDIR /app
RUN npm install
