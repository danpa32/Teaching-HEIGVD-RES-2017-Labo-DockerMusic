# use latest node.js image
FROM node:latest

# the author
MAINTAINER Daniel Palumbo

# copy all javascript source
COPY musician /opt/app

# install node.js dependancies
RUN cd /opt/app

# starting point
ENTRYPOINT ["node", "/opt/app/musicians.js"]
