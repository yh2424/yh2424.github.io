#
# This code generates cv_print.md
# 1. Only update cv.md and publication.md
# 2. Run this code
# 3. Check cv_print.md
#

import os

def read_contents(filename):
    # rootfolder = r'../yh2424.github.io'
    rootfolder = r'C:\Users\kim96\PycharmProjects\yh2424.github.io'
    path = rootfolder + os.sep + filename

    try:
        with open(path) as data:
            contents = data.read()
    except:
        with open(path, encoding='UTF-8') as data:
            contents = data.read()

    return contents

cont = read_contents('cv.md')
cont += read_contents('publication.md')


## Write cv_print.md
f = open(r"C:\Users\kim96\PycharmProjects\yh2424.github.io\cv_print.md", 'w', encoding='UTF-8')
f.write(cont)
f.close()

print ('\n'+r"Saved C:\Users\kim96\PycharmProjects\yh2424.github.io\cv_print.md")
