#!/usr/bin/env python
 
import simplejson
import sys
import yaml
 
print yaml.dump(simplejson.loads(str(sys.stdin.read())), default_flow_style=False)
