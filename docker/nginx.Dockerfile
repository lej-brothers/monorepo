FROM nginx:1.21.1-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY /configs/nginx.conf /etc/nginx/conf.d