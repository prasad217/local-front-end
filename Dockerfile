# Stage 1: Build React Application
FROM node:16-alpine as build

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the code and build the React app
COPY . ./
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port Nginx will serve on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
