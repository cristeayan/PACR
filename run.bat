@echo off

REM Move one folder back
cd ..

REM Activate the virtual environment
call env\Scripts\activate

REM Start the Django backend
echo Starting DRF Backend...
cd D:\PACR\apiv2
start cmd /k "python manage.py runserver"

REM Start the Next.js frontend
echo Starting Next.js Frontend...
cd D:\PACR\pacrfrontend
npm run dev
	