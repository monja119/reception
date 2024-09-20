FROM laravelsail/php83-composer

WORKDIR /var/www/html

# Installer les dépendances du projet
COPY composer.json composer.lock ./
RUN composer install --no-scripts

# Installer les extensions SQL Server et leurs dépendances
# Installer les extensions SQL Server et leurs dépendances
RUN apt-get update \
    && apt-get install -y gnupg2 unixodbc-dev curl lsb-release wget software-properties-common \
    && wget -qO- https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
    && echo "deb [arch=amd64] https://packages.microsoft.com/debian/12/prod bookworm main" > /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update \
    && ACCEPT_EULA=Y apt-get install -y msodbcsql17 \
    && pecl install sqlsrv \
    && pecl install pdo_sqlsrv \
    && docker-php-ext-enable sqlsrv \
    && docker-php-ext-enable pdo_sqlsrv \
    && curl -fsSL https://bun.sh/install | bash

# Set environment variable for PATH
#ENV PATH="/root/.bun/bin:${PATH}"
## Verify Bun Installation
#RUN ls -la /root/.bun/bin \
#    && bun --version


COPY . .

# RUN bun install
RUN composer install

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

EXPOSE 80 5173 1433
