#!/bin/bash
run()
{
    cd /webapps/affect-nexus/
    nohup npm start >logfile.txt 2>&1 </dev/null &
    return 0
}

run
echo end script
