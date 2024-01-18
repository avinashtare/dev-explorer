# Python Progress Bars

* Output:- Proggress: -------------------- 100%

```python
import time
proText = "-"
proLength = 20

def greenText(text):
    return (f"\033[92m{text}\033[0m")
    
for i in range(1,proLength+1):
    time.sleep(0.1)
    percentage = str(int(i/proLength*100))+"%"

    print('Proggress:',f'{greenText(proText)}'*i,end="")
    print(f" {percentage}",end="\r")
```

* Output:- [====================>] 100%
```python 
import time
proText = "-"
proLength = 20

def greenText(text):
    return (f"\033[92m{text}\033[0m")
    
for i in range(1,proLength+1):
    time.sleep(0.1)
    percentage = str(int(i/proLength*100))+"%"

    outputStr = greenText("[" + "="*i +  f">] {percentage}\r")
    
    print(outputStr,end="")
```

* Output: [================>....] 80%
```python
import time
proText = "-"
proLength = 20

def greenText(text):
    return (f"\033[92m{text}\033[0m")
    
for i in range(1,proLength+1):
    time.sleep(0.1)
    percentage = str(int(i/proLength*100))+"%"

    outputStr = greenText("[" + "="*i+ ">" + "."*(proLength-i) +  f"] {percentage}\r")
    
    print(outputStr,end="")
```

* Output:- [================>-----] 100%
```python
import time
proText = "-"
proLength = 20

def greenText(text):
    return (f"\033[92m{text}\033[0m")
    
for i in range(1,proLength+1):
    time.sleep(0.5)
    percentage = str(int(i/proLength*100))+"%"

    outputStr = greenText("[" + "="*i+ ">" + "-"*(proLength-i) +  f"] {percentage}\r")
    
    print(outputStr,end="")
```

* Output:- |████----------------| 20%
```python
import time
proText = "█"
proLength = 20

def greenText(text):
    return (f"\033[92m{text}\033[0m")
    
for i in range(1,proLength+1):
    time.sleep(0.1)
    percentage = int(i/proLength*100)
    if(percentage>20):break

    outputStr = greenText("|" + proText*i + "-"*(proLength-i) +  f"| {percentage}%\r")
    
    print(outputStr,end="")
```

* output:- [ 20% ] ████................

```python
import time
proText = "█"
proLength = 20

def greenText(text):
    return (f"\033[92m{text}\033[0m")
    
for i in range(1,proLength+1):
    time.sleep(0.1)
    percentage = int(i/proLength*100)
    if(percentage>20):break

    outputStr = greenText(f"[ {percentage}% ] " + proText*i + "."*(proLength-i) +  "\r")
    
    print(outputStr,end="")
```

* Output:- [ 20% ] |████                |
```python
import time
proText = "█"
proLength = 20

def greenText(text):
    return (f"\033[92m{text}\033[0m")
    
for i in range(1,proLength+1):
    time.sleep(0.1)
    percentage = int(i/proLength*100)
    if(percentage>20):break

    outputStr = greenText(f"[ {percentage}% ] |" + proText*i + " "*(proLength-i) +  "|\r")
    
    print(outputStr,end="")
```