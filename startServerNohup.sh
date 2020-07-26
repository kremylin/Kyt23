#!/bin/bash
nohup http-server extension -p 8092 --cors=* -S&
nohup node api/app.js&
