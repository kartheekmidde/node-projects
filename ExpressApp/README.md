- Set an environment variable `export PORT=5001`
- When using `config` package for different envionments, the secrets can be set using `export app_password=1234`. They can then be mapped to the config/`custom-environment-variables.json` file. The name of the file should be exact
- When using `debug` package for debugging, we can choose the name space where the logs should be available. We can set the environment variable using the namespace `export DEBUG=namespace` and then see only the debug messages related to that namespace. When we set the environment varible as nothing as in `export DEBUG=`, there won't be any debugging. We can also set muliple namespaces `export DEBUG=namespace1,namespace2` to see logs across namespaces or `export DEBUG=*` for all namespaces

- Hit `node index.js` to run the express server
