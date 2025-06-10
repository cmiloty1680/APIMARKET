FROM node:18 AS build
WORKDIR / app

COPY . .
RUN npm install
RUN npm build

FROM nginx:apine
COPY --from=build /app/dist/usr/share/nginx/HTML

EXPOSE 80
CMD["nginx","-g","daemon off;"]
