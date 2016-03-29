__author__ = 'tanggaolin'

import os
import shutil
import fnmatch
import re


ori_widget_path = '/mnt/nas/themebuild/widgets_abc/'
# dst_widget_path = '/mnt/nas2/themebuild/diywidgets/'
dst_widget_path = '/mnt/nas/themebuild/diywidgets/'

ori_fonts_path = '/opt/lampp/htdocs/themebuild/Widgets/theme/assets/fonts/'

preview1_path = '/res/drawable-xhdpi/widget_preview.png'
preview2_path = '/res/drawable-xhdpi/widget_preview_2.png'
preview3_path = '/res/drawable-xhdpi/widget_preview_3.png'

image_res1 = '/res/drawable-xhdpi/'
image_res2 = '/res/drawable-xxhdpi/'

log_file = 'logs/error.log'

def printLog(msg):
    try:
        with open(log_file, 'a') as logs:
            logs.write(msg+'\n')
    except:
        pass
    print(msg)


def getWidgetName():

    themes = []
    list = os.listdir(ori_widget_path)
    for item in list:
        if '-' in item or '_' in item:
            themes.append(item)

    return themes



def mkdirForDiyWidgets(widget_dir):
    print 'mkdir for widget:'+widget_dir

    fonts = widget_dir+'/'+'fonts'
    icons = widget_dir+'/'+'icons'

    if os.path.isdir(widget_dir) is False:
        os.mkdir(widget_dir)

    if os.path.isdir(fonts) is False:
        os.mkdir(fonts)

    if os.path.isdir(icons) is False:
        os.mkdir(icons)


def getBatteryName(img):

    try:
        num = re.search(r'\d+', img).group()
    except:
        return img

    return 'battery_'+num+'.png'

def getImageRes(theme):

    print 'get ' + theme + ' image res '
    res1 = ori_widget_path + theme + image_res1
    res2 = ori_widget_path + theme + image_res2

    theme_dir = dst_widget_path + theme

    img_list1 = os.listdir(res1)
    for img in img_list1:
        if fnmatch.fnmatch(img, 'w*d.png'):
            shutil.copy(res1+img, theme_dir + '/icons/' + img)
            print img
        if fnmatch.fnmatch(img, 'w*_na.png'):
            shutil.copy(res1+img, theme_dir + '/icons/' + img)
            print img

    img_list2 = os.listdir(res2)
    for img in img_list2:
        if fnmatch.fnmatch(img, 'w*d.png'):
            shutil.copy(res2+img, theme_dir + '/icons/' + img)
            print img
        if fnmatch.fnmatch(img, 'widget*.png'):
            shutil.copy(res2+img, theme_dir + '/icons/' + img)
            print img
        if fnmatch.fnmatch(img, 'bat*.png'):
            shutil.copy(res2+img, theme_dir + '/icons/' + getBatteryName(img))
            print img


def newDiyWidget(theme):

    theme_dir = dst_widget_path + theme
    widget_dir1 = theme_dir + '/' + theme + '_1'
    widget_dir2 = theme_dir + '/' + theme + '_2'
    widget_dir3 = theme_dir + '/' + theme + '_3'
    fonts = theme_dir + '/fonts'
    icons = theme_dir + '/icons'

    print 'start sort theme: ' + theme + ' ......'
    if os.path.isdir(theme_dir) is False:
        os.mkdir(theme_dir)

    if os.path.isdir(fonts) is False:
        os.mkdir(fonts)

    if os.path.isdir(icons) is False:
        os.mkdir(icons)

    getFontRes(theme)
    getImageRes(theme)

    mkdirForDiyWidgets(widget_dir1)
    shutil.copy(ori_widget_path + theme + preview1_path, widget_dir1 + '.png')

    mkdirForDiyWidgets(widget_dir2)
    shutil.copy(ori_widget_path + theme + preview2_path, widget_dir2 + '.png')

    mkdirForDiyWidgets(widget_dir3)
    shutil.copy(ori_widget_path + theme + preview3_path, widget_dir3 + '.png')

def getFontRes(theme):

    print 'get ' + theme + ' fonts res '
    fonts_path = ori_fonts_path.replace('theme', theme)
    for font in fonts_path:
        shutil.copy(fonts_path+font, dst_widget_path + theme + '/fonts/'+font.lower())
        print font.lower()


def sortWidgetResMain():

    themes = getWidgetName()
    for item in themes:
        try:
            newDiyWidget(item)
        except:
            printLog('sort error:' + item)



if __name__ == "__main__":

    sortWidgetResMain()

