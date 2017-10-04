#/bin/bash
/root/redscraper/venv/bin/python /root/redscraper/venv/bin/gunicorn server:app \
 	-p gunicorn.pid -b 127.0.0.1:8000 --error-logfile=/root/redscraper/log/error.harvester.log \
       	--access-logfile=/root/redscraper/log/access.harvester.log \
	--capture-output --log-level=debug  --preload -D 
