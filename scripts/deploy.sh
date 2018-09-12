#!/usr/bin/env bash
set -e
#DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
docker save $(make docker-tag)| \
  pv -cN bzip | \
  bzip2 | \
  pv -cN ssh | \
  ssh -i "${SSH_IDENTITY_FILE}" \
    -p "${SSH_PORT}" "${SSH_USER}@${SSH_HOST}" \
    "bunzip2 | docker load && docker stop pittmeshwww && docker rm pittmeshwww;
     echo 'Running';
     docker run --detach --publish '9080:80' --name pittmeshwww $(make docker-tag);
     docker ps"

