import sys, json


def run_calculations(numOne, numTwo):
    return {"status" : "Success", "result": int(numOne) + int(numTwo)}

if __name__ == '__main__':
    if (len(sys.argv) != 3):
        result = {"status": "Invalid Arguments", "result": [1,2,3,4]}
        print(json.dumps(result))
    else:   
        result = run_calculations(sys.argv[1], sys.argv[2])
        print(json.dumps(result))