FROM mhart/alpine-node:16 as builder
WORKDIR /next/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
COPY prod_env ./.env
RUN yarn build

# production environment
FROM nginx:stable-alpine
COPY --from=builder /next/app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 
