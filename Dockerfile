FROM ubuntu:14.04

# Install Nodejs
RUN apt-get update; apt-get install curl
RUN curl -sL https://deb.nodesource.com/setup | bash - && \
apt-get install -yq nodejs build-essential
RUN npm install -g npm

# Copy entire project
ADD / /
