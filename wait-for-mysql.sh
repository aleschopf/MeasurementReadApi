#!/bin/bash
# Espera até o MySQL estar disponível
until mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" -e 'SELECT 1' "$DB_NAME"; do
  >&2 echo "MySQL ainda não está disponível - aguardando..."
  sleep 3
done

# Inicia o aplicativo Node.js
>&2 echo "MySQL está rodando - iniciando o aplicativo"
exec "$@"