import json;

with open("C:\\Users\\Public\\Desktop\\user_repo\\.Eval\\results.txt","r") as infile:
    data={}
    data["modules"] = [{
        "moduleName":"Module1",
        "totalNoOfTestCases": -1,
        "noOfTestCasesPassed":-1,
        "noOfTestCasesFailed":-1
        }]
    temp=infile.read()
    print(temp)
    listNum=temp.split(' ')
    print(listNum[0])
    print(listNum[2])
    print(listNum[4])
    if(listNum[2]=="0" and listNum[4]=="1"):
        data["modules"] = [{
            "moduleName":"Build failed",
            "totalNoOfTestCases": 1,
            "noOfTestCasesPassed":0,
            "noOfTestCasesFailed":1
            }]
    else:
        if(listNum[0]==listNum[2][:2]):
            if(len(listNum)==2):
                listNum.append(0)
            else:
                listNum[4]=0
        data["modules"] = [{
            "moduleName":"Module1",
            "totalNoOfTestCases": listNum[0],
            "noOfTestCasesPassed":listNum[2],
            "noOfTestCasesFailed": listNum[4]
            }]
        print(data)

with open("C:\\Users\\Public\\Desktop\\user_repo\\user_output.json", "w+") as jsonFile:
    json.dump(data, jsonFile)
