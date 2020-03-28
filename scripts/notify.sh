#!/usr/bin/env bash
MESSAGE="$(jo \
  channel=automation-firehose \
  username=travis-ci \
  icon_url=https://travis-ci.com/images/logos/TravisCI-Mascot-1.png \
  text="$1")"

curl -i -X POST -H 'Content-Type: application/json' \
  -d "${MESSAGE}" \
  "${MATTERMOST_WEBHOOK_URL}"
