#!/bin/bash
kill -TERM $(cat gunicorn.pid)
