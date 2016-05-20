cp /var/opt/config.json disco.json
cp config_template.js config.js

jq -r '.[]|.api|.[]|.ServiceAddress' disco.json | xargs -I '{}' sed -i 's/SERVICE_ADDRESS/{}/' config.js
jq -r '.[]|.api|.[]|.ServicePort' disco.json | xargs -I '{}' sed -i 's/SERVICE_PORT/{}/' config.js
