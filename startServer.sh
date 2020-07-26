#!/bin/bash
http-server extension -p 8092 --cors=* -S&
node api/app.js&
