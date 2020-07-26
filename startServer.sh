#!/bin/bash
nohup http-server extension -p 8092 --cors=*&
nohup node api/app.js&
