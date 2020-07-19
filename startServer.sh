#!/bin/bash
nohup http-server . -p 8092 --cors=*&
nohup node api/app.js&
