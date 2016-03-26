FROM debian

# Copy entire project
ADD / /

RUN sudo npm install npm -g
