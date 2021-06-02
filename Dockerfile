FROM ruby:2.7.3
ENV LANG C.UTF-8

EXPOSE 3000

RUN apt-get update -qq && apt-get install -y nodejs build-essential libpq-dev postgresql-client apt-utils apt-transport-https --no-install-recommends cron gawk sed && rm -rf /var/lib/apt/lists/*
RUN apt-get install openssl
RUN apt-cache policy openssl libssl1.1
# RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
#   echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
#   apt-get update && apt-get install -y yarn
# RUN yarn install --check-files --cache-folder .ycache && rm -rf .ycache

# Обновление Nodejs
RUN curl -sL https://deb.nodesource.com/setup_15.x | bash - \
        && apt-get install -y nodejs
RUN npm install -g yarn

RUN mkdir -p /usr/src/app
RUN chmod 755 /usr/src/app
RUN mkdir -p /var/run/postgresql

WORKDIR /usr/src/app

COPY ./Gemfile /usr/src/app/Gemfile
COPY ./Gemfile.lock /usr/src/app/Gemfile.lock

RUN gem pristine --all
