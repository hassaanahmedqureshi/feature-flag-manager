# Step 1: Build the Angular app
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration=production

# Step 2: Serve with Nginx
FROM nginx:stable-alpine
# For Angular 17+, the output is usually in dist/[project-name]/browser
# If your project name is 'featureflag-ui', use: /app/dist/featureflag-ui/browser
# If you're unsure, /app/dist/ is a safe starting point to check
COPY --from=build /app/dist/ /usr/share/nginx/html
# Copy a custom nginx config if you need to handle Angular routing (see below)
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
