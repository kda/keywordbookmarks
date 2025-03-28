VERSION_NAME := $(shell grep '"version"' manifest.json | sed -r 's/.*"([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+.*)".*/\1/g')
ZIPFILE_NAME = keyword_bookmarks_v$(VERSION_NAME).zip

ZIPFILE_CONTENTS = \
									 LICENSE \
									 images/kwbm128.png \
									 images/kwbm16.png \
									 images/kwbm48.png \
									 manifest.json \
									 scripts/background.js \

# UNUSED = \
#									 html/options.html \
#									 scripts/options.js \
#									 scripts/storage.js \


all: $(ZIPFILE_NAME)

$(ZIPFILE_NAME): $(ZIPFILE_CONTENTS)
	zip -9 $@ $^

.PHONY: clean
clean:
	rm -f *.zip
