# use latest node.js image
FROM node:latest

# the author
MAINTAINER Daniel Palumbo

# the port for connection requests
EXPOSE 2205

# copy all javascript source
COPY auditor /opt/app

# install node.js dependancies
RUN cd /opt/app

# Starting point
ENTRYPOINT ["node", "/opt/app/auditor.js"]
