@echo off
cls
ECHO CREANDO DOCUMENTACION - JSDOC3
jsdoc docs\jsdoc\.jsdoc.js -c docs\jsdoc\config.json
ECHO PROCESO TERMINADO
@echo on