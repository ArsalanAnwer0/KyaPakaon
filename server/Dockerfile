# step 1
FROM node:20-alpine 

# step 2 -> setting up a wrking directory for our project
WORKDIR /app 


# step 3 -> we are copying package files to the container 
COPY package*.json ./

# step 4 -> install dependencies 
RUN npm install 

# step 5 -> we are copying code to the container
COPY . .

# step 6 -> build typescript
RUN npm run build

# step 7 -> expose port
EXPOSE 5001 

# step 8 -> start command
CMD [ "npm","start" ]

