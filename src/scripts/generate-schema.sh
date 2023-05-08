npx @databases/mysql-schema-cli \
  --database ${DATABASE_URL} \
  --schemaName ${DATABASE_NAME} \
  --directory src/__generated__

# Path: src/scripts/generate-schema.sh
