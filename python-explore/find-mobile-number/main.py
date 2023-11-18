def findVal(target):
  for digit1 in range(1,10):
      for digit2 in range(10):
          for digit3 in range(10):
              for digit4 in range(10):
                  for digit5 in range(10):
                      for digit6 in range(10):
                          for digit7 in range(10):
                              for digit8 in range(10):
                                  for digit9 in range(10):
                                      for digit10 in range(10):
                                          value = (f"{digit1}{digit2}{digit3}{digit4}{digit5}{digit6}{digit7}{digit8}{digit9}{digit10}")
                                          print(value,end="\r")
                                          if(target == value):
                                              print(value)
                                              return
value = str(input("Enter a value"))
findVal(value)