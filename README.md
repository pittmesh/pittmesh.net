PittMesh.net
============

[![Build Status](https://travis-ci.org/pittmesh/pittmesh.net.svg)](https://travis-ci.org/pittmesh/pittmesh.net)

This is the code that powers [pittmesh.net](http://www.pittmesh.net).

Contributing
------------

Found a bug in the site? Please file an issue and consider submitting a pull
request.

Need to add more nodes? Add it yourself and submit the pull request, or file an
issue. Ensure that you have permission from the node host to put the point on
the map, especially when using their name. It's probably better to use letters
from the [NATO phonetic
alphabet](https://en.wikipedia.org/wiki/NATO_phonetic_alphabet) if you're
unsure.

To update the nodes, submit a pull request for your changes to
`node-data/nodes.json`. The information there is pretty obvious.

To update links, submit a pull request with your changes to
`node-data/links.json`. The text to put in the field is the name field from
`nodes.json`. **If the names do not match exactly, the link will not show.**
Check the browser console log for hints.

**All additions must be submitted via pull request.**

Deploying
---------

We use Heroku for hosting. Travis is configured to push to Heroku from master
each time a branch is merged. `master` is a protected branch on this repository.

### Buildpacks

    heroku/ruby
    https://github.com/chrismytton/heroku-buildpack-jq.git

License
-------

This software is (c) 2012-2015 Meta Mesh, LLC. and 2016-2017 Meta Mesh Wireless Communities.

All original code is licensed under the terms of the Affero General Public License.

All artwork is licensed under the terms of the Creative Commons 3.0 BY-SA license,
unless otherwise specified.

Includes code from [Modest Maps](http://modestmaps.com/) under BSD license.

Map pin image is public domain, but drawn by
[netalloy](https://openclipart.org/detail/169839/map-pin-by-netalloy).
