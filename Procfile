#web:	jekyll --server $PORT
release: _script/pittmesh_nodes_to_geojson.sh node-data/nodes.json > node-data/nodes.geojson
web: bundle exec rackup config.ru -p $PORT
