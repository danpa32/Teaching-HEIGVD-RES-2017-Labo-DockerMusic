# use latest node.js image
FROM node:latest

# the author
MAINTAINER Daniel Palumbo

# copy all javascript source
COPY src /opt/app

# install node.js dependancies
RUN cd /opt/app && npm install && npm install node-uuid

# starting point
ENTRYPOINT ["node", "/opt/app/musician.js"]
