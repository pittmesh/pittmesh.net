DOCKER_TAG := pittmeshwww:latest
SRC_DIR := src/
BUILD_DIR := build
SITE_FILES := $(shell find -L $(SRC_DIR) \! \( \( -regex '.*/\.\(gitignore\)' -o -regex '.*\.\(inc\|swp\|orig\|git\)' -o -regex '.*/modules' \) -prune \) -type f )

BUILT_GEOJSON := $(BUILD_DIR)/node-data/nodes.geojson
BUILT_SITE_FILES := $(patsubst $(SRC_DIR)%,$(BUILD_DIR)/%,$(SITE_FILES)) $(BUILT_GEOJSON)

all: $(BUILT_SITE_FILES)

files:
	@echo $(BUILT_SITE_FILES)

$(BUILD_DIR)/%: $(SRC_DIR)%
	@test -d "$(dir $@)" || mkdir -p "$(dir $@)"
	cp -r $< $@

$(BUILT_GEOJSON): $(SRC_DIR)/node-data/nodes.json
	scripts/pittmesh_nodes_to_geojson.sh "$<" > "$@"

.phony: docker-build
docker-build:
	docker build -t $(DOCKER_TAG) .

.phony: docker-tag
docker-tag:
	@echo $(DOCKER_TAG)

.phone: clean
clean:
	rm -rf $(BUILD_DIR)
