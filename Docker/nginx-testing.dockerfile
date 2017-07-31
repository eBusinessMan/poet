FROM library/nginx

COPY ./Docker/nginx/testing.conf /etc/nginx/nginx.conf

VOLUME /static

VOLUME /etc/letsencrypt
