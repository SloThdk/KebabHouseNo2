@echo off
echo.
echo ================================================================
echo    🍕 Opening Kebab House no.2 - Published Website
echo ================================================================
echo.
echo Opening your LIVE website...
echo No local server needed - this opens your published site!
echo.

REM Replace this URL once deployed to Vercel/Netlify
start https://kebab-house-no2.vercel.app

echo.
echo Your live website is now open in your browser!
echo This console will close automatically in 3 seconds...
echo.

timeout /t 3 /nobreak >nul
exit
