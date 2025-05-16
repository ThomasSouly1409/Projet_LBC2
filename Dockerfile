FROM sitespeedio/node:ubuntu-22-04-nodejs-20.10.0

# Set application working directory 
WORKDIR /usr/src/app

## Prepare sources
#RUN mkdir /usr/src/app/bin
#RUN mkdir /usr/src/app/src
#RUN mkdir /usr/src/app/lib
#RUN mkdir /usr/src/app/migrate

# Copy files
COPY . .

# install package
#RUN npm run global
RUN npm install

# Run application
EXPOSE 80

# CMD npm start
CMD /bin/bash
