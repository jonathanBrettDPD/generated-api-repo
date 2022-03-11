#!/bin/bash

# Copy app.sample.yaml and replace all env variables with the variables above
( echo "cat <<EOF >app.yaml";
  cat app.sample.yaml;
  echo "EOF";
) >temp.yml
. temp.yml

rm temp.yml

cat app.yaml

gcloud app deploy --project $GCP_PROJECT_ID --promote