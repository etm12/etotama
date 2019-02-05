#!/usr/bin/env bash
set -e

COMMIT=HEAD
NODE_PKG=$(cat package.json)

CUR_BRANCH=$(git rev-parse --abbrev-ref $COMMIT)
CUR_COMMIT=$(git rev-parse --short $COMMIT)
CUR_VERSION=$(jq '.version' <<< "$NODE_PKG" | tr -d "\"")
CUR_NAME=$(jq '.name' <<< "$NODE_PKG" | tr -d "\"")

INSTRING="name|version|branch|commit
$CUR_NAME|$CUR_VERSION|$CUR_BRANCH|$CUR_COMMIT"

{
   IFS='|' read -r -a keys # read first line into an array of strings

   ## read each subsequent line into an array named "values"
   while IFS='|' read -r -a values; do

    # setup: positional arguments to pass in literal variables, query with code
    jq_args=( )
    jq_query='.'

    # copy values into the arguments, reference them from the generated code
    for idx in "${!values[@]}"; do
        [[ ${keys[$idx]} ]] || continue # skip values with no corresponding key
        jq_args+=( --arg "key$idx"   "${keys[$idx]}"   )
        jq_args+=( --arg "value$idx" "${values[$idx]}" )
        jq_query+=" | .[\$key${idx}]=\$value${idx}"
    done

    # run the generated command
    jq "${jq_args[@]}" "$jq_query" <<<'{}'
  done
} <<< "$INSTRING"
