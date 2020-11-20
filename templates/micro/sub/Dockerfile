FROM nginx:1.17


COPY ./dist/ /var/www
COPY ./dist/ /var/www/manage/app-cms
COPY default.template /etc/nginx/conf.d/default.template

WORKDIR /var/www

CMD /bin/bash -c "envsubst '\$API_HOST \$API_PORT' < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
