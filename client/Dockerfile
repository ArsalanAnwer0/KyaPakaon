# step 1: pulling base image
FROM node:20-alpine AS builder

# step 2: creating a working directory
WORKDIR /app 

# step 3: copy the package.. 
COPY package*.json ./

# step 4: install the dependencies
RUN npm install 

# step 5: copy the code 
COPY . .

# step 6: we create build files
RUN npm run build 

# step 7:
FROM nginx:alpine  

COPY --from=builder /app/dist /usr/share/nginx/html 

EXPOSE 80

CMD ["nginx","-g","daemon off;"]

