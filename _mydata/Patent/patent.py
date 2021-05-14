import pandas as pd
import os
import sys


# http://abpat.kipris.or.kr/
# younghyun*takenaka
# (young hyun)*takeya
# http://www.freepatentsonline.com/


# import patent list file
df = pd.read_excel(r"C:\Users\kim96\PycharmProjects\yh2424.github.io\_mydata\Patent\patent_list_YK.xls")
for i in range(len(df)):
    # print (i)

    opt = 'B2' if df['등록번호'][i] > 0 else 'A1'
    filename = str(df['국가'][i])+str(df['공보번호'][i])+ opt
    link = 'https://github.com/yh2424/yh2424.github.io/blob/master/_mydata/Patent/pdf/'
    print ('- %s, %s, %s [[Link]](https://github.com/yh2424/yh2424.github.io/raw/master/_mydata/Patent/pdf/%s.pdf)    ' %(filename, df['발명의 명칭'][i], df['DOP'][i], filename))

