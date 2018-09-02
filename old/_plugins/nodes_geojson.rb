Jekyll::Hooks.register :site, :post_write do |site|
  src = [site.config["source"], "node-data", "nodes.json"].join File::Separator
  dest = [site.config["destination"], "node-data", "nodes.geojson"].join File::Separator
  puts "Rendering #{src} to #{dest}"
  `_script/pittmesh_nodes_to_geojson.sh #{src} > #{dest}`
end
