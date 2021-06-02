#!/bin/bash
set -e

rm -f /usr/src/app/tmp/pids/server.pid

touch log/production.log
chmod 0664 log/production.log

export RAILS_ENV=production
bundle exec rails s -p 3000 -b '0.0.0.0'
