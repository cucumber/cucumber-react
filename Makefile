include default.mk

# Determine if we're on linux or osx (ignoring other OSes as we're not building on them)
OS := $(shell [[ "$$(uname)" == "Darwin" ]] && echo "darwin" || echo "linux")
# Determine if we're on 386 or amd64 (ignoring other processors as we're not building on them)
ARCH := $(shell [[ "$$(arch)" == "x86_64" ]] && echo "amd64" || echo "386")
GHERKIN_EXE = ../../gherkin/go/dist/gherkin-$(OS)-$(ARCH)

FEATURE_FILES = $(wildcard testdata/*.feature)
GHERKIN_DOCUMENT_JSON_FILES = $(patsubst testdata/%.feature,testdata/%.json,$(FEATURE_FILES))

.deps: .npm-linked

.npm-linked:
	# `npm link` does not work on CircleCI, so we're doing manual symlinking instead
	# rm -rf node_modules/cucumber-messages
	# ln -s "$$(pwd)/../../cucumber-messages/javascript" node_modules/cucumber-messages
	# rm -rf node_modules/c21e
	# ln -s "$$(pwd)/../../c21e/javascript" node_modules/c21e
	# rm -rf node_modules/gherkin
	# ln -s "$$(pwd)/../../gherkin/javascript" node_modules/gherkin
	npm link cucumber-messages
	npm link c21e
	npm link gherkin

	touch $@

gherkin_document_json_files: $(GHERKIN_DOCUMENT_JSON_FILES)

testdata/%.json: testdata/%.feature
	$(GHERKIN_EXE) --no-pickles --no-source --json $< > $@
	