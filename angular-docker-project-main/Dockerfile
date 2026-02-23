# Stage 1: Build the Angular app using Node
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine
# Replace 'my-angular-app' with your actual project name found in the 'dist' folder
COPY --from=build /app/dist/my-angular-app/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
