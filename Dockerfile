# Stage 1
FROM --platform=linux/amd64 node:hydrogen-alpine3.19 as node
WORKDIR /app
COPY . .
RUN npm install -g @angular/cli
RUN npm install
RUN node --max_old_space_size=8192 ./node_modules/@angular/cli/bin/ng build
# Stage 2
FROM --platform=linux/amd64 nginx:alpine3.18
COPY --from=node /app/dist/ultimate-price-tracker-ui/browser /usr/share/nginx/html
