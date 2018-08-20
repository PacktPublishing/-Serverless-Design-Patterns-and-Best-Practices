# Waylon URL Shortener

[![pipeline status](https://gitlab.neosperience.com/neosperience-cloud/nsp-card/nsp-card-services/badges/master/pipeline.svg)](https://gitlab.neosperience.com/neosperience-cloud/nsp-card/nsp-card-services/commits/master)

[![coverage report](https://gitlab.neosperience.com/neosperience-cloud/nsp-card/nsp-card-services/badges/master/coverage.svg)](https://gitlab.neosperience.com/neosperience-cloud/nsp-card/nsp-card-services/commits/master)

## Local dev environment

Before running Integration test execute
```bash
# start the docker machines and run them in demon mode
docker-compose -f deployment/docker-compose.yml up -d
# connect to the docker machine to execute shell script on it
docker-compose -f deployment/docker-compose.yml exec --user="node" node /bin/bash
```

To tear down the machines:
```bash
docker-compose -f deployment/docker-compose.yml down
```
