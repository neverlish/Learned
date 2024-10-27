V_DATA = "C,C,A,A,A,B,C,C,B,B,B,C,B,C,B,A,C,C,B,C,C,C"

c_dic = {"A": 0, "B": 0, "C": 0}

for w in V_DATA.split(","):
    c_dic[w] += 1

for key in ["A", "B", "C"]:
    print("{}: {:2d}".format(key, c_dic[key]))
