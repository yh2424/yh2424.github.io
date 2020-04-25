import pandas as pd
import os
import sys


# print (os.path.join(sys.path[0], "my_file.txt"))
df = pd.read_excel(r"C:\Users\kim96\PycharmProjects\yh2424.github.io\_mydata\Patent\20200425171408004.xls")


for i in range(len(df)):
    # print (i)
    print ('- %s%s, %s, %s [[Link]]()' %(df['국가'][i], df['공보번호'][i]), df['발명의 명칭'], df['DOP'])