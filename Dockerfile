FROM alpine:latest AS json
RUN apk --no-cache add python3
RUN mkdir -p build/node-data
RUN cat src/node-data/links.yaml | python3 scripts/yaml2json.py > build/node-data/links.json
RUN cat src/node-data/nodes.yaml | python3 scripts/yaml2json.py > build/node-data/nodes.json


FROM gists/lighttpd:latest
COPY build /var/www
