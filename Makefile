install:
	npm ci
lint:
	npx eslint .
test:
	npm test
test-coverage:
	npm test -- --coverage
make link:
	sudo npm link