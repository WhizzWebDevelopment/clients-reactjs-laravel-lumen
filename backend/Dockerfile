FROM composer:2.0 as vendor

COPY database/ database/
COPY composer.json composer.json
COPY composer.lock composer.lock

RUN composer install \
    --ignore-platform-reqs \
    --no-interaction \
    --no-plugins \
    --no-scripts \
    --prefer-dist

FROM php:8.0-fpm

WORKDIR /var/www

RUN apt-get update && apt-get install -y \
    default-mysql-client \
    libpng-dev \
    libonig-dev \
    && docker-php-ext-install pdo_mysql mbstring \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY . /var/www
COPY --from=vendor /app/vendor/ /var/www/vendor/

RUN chown -R www-data:www-data /var/www/storage

EXPOSE 9000
CMD ["php-fpm"]
