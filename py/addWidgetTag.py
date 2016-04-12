__author__ = 'tanggaolin'
import pymysql
import os

Host = 's1.cobo'
User = 'cobo'
Pwd = 'cobocobo'
db = 'diy_widgets'
sql_port = 3306
conn = pymysql.connect(host=Host, user=User, passwd=Pwd, db=db, port=sql_port, charset='utf8', cursorclass=pymysql.cursors.DictCursor)
cursor = conn.cursor()

cool_widget = '/home/tanggaolin/cool_widget/'
fresh_widget = '/home/tanggaolin/fresh_widget/'


def saveDB(name, tag):

    sql = 'insert into widget_tag set ori_theme = "%s", tag = "%s"' % (name, tag)
    print sql
    cursor.execute(sql)
    pass


def getThemeName():

    cool_widgets = os.listdir(cool_widget)
    for item in cool_widgets:
        name, ext = os.path.splitext(item)
        if ext == '.jpg':
            saveDB(name, 'cool')

    fresh_widgets = os.listdir(fresh_widget)
    for item in fresh_widgets:
        name, ext = os.path.splitext(item)
        if ext == '.jpg':
            saveDB(name, 'fresh')



if __name__ == '__main__':
    getThemeName()

    conn.commit()
    cursor.close()
    conn.close()

