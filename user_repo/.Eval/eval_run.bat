start /w "angular" CMD /c cmd.exe /c C:\Users\Public\Desktop\user_repo\.Eval\eval_run_angular.bat 
cd C:\Users\Public\Desktop\user_repo\CureWell\CureWellApp\src\app
del app.component.spec.ts
cd C:\Users\Public\Desktop\user_repo\CureWell\CureWellWebServices\bin\Debug\netcoreapp3.1
del CureWellWebServices.dll
cd C:\Users\Public\Desktop\user_repo\CureWell\CureWellWebServices
dotnet build
cd C:\Users\Public\Desktop\user_repo\.Eval\CureWellTest\CureWellTest
dotnet test > C:\Users\Public\Desktop\user_repo\.Eval\user_output_api.txt
cd C:\Users\Public\Desktop\user_repo\.Eval\ReadFile\ReadFile\bin\Debug\netcoreapp3.1
ReadFile.exe
python C:\Users\Public\Desktop\user_repo\.Eval\updateJson.py











