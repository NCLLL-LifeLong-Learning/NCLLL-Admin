# Step 1: Use a Node image to build the Vue app
FROM node:18 AS build-stage

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Step 2: Use an Nginx image to serve the Vue app
FROM nginx:1.23 AS production-stage

# Copy the built files from the previous stage to Nginx's default html directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80 for the container
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
