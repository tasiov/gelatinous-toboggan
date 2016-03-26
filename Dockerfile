FROM debian

# Install Nodejs
RUN curl -sL https://deb.nodesource.com/setup | sudo bash - && \
apt-get install -yq nodejs build-essential
RUN npm install -g npm

# Copy entire project
ADD / /
