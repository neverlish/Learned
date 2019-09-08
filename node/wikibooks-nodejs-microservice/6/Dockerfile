FROM node:10
MAINTAINER neverlish

ADD imagini/imagini.js /opt/app/imagini.js
ADD imagini/package.json /opt/app/package.json
ADD imagini/settings.json /opt/app/settings.json

WORKDIR /opt/app
RUN npm i

CMD ["node", "/opt/app/imagini"]