call npx @apidevtools/swagger-cli bundle openapi.yaml --outfile ./build/merged.yaml --type yaml  --enable-post-process-file 
call npx @openapitools/openapi-generator-cli generate -i ./build/merged.yaml -g typescript-fetch -o ../frontend
call npx @openapitools/openapi-generator-cli generate -i ./build/merged.yaml -g python-fastapi -o ../backend