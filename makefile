CHROME_DST = ./expbox-chrome.zip
FIREFOX_DST = ./expbox-firefox.zip

build: buildc buildf

buildc:
	rm -f $(CHROME_DST)
	zip -r $(CHROME_DST) *.html *.js *.css manifest.json

buildf:
	rm -f $(FIREFOX_DST)
	zip -r $(FIREFOX_DST) *.html *.js *.css manifest.json
