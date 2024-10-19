@echo off
set folder=%1
set withResolver=%2

REM Debugging outputs
echo Folder: %folder%
echo With Resolver: %withResolver%

echo Generating module, controller, and service for %folder%...

call nest g module %folder%
call nest g controller %folder%
call nest g service %folder%

REM Normalize withResolver variable by removing surrounding quotes and trimming spaces
set withResolver=%withResolver:"=%
set withResolver=%withResolver: =%

REM Debugging output to see the normalized value
echo Normalized With Resolver: "%withResolver%"

if /I "%withResolver%"=="true" (
    echo Generating resolver for %folder%...
    call nest g resolver %folder%
) else (
    echo Skipping resolver generation.
)

echo All done!
pause
