import PIL
from PIL import Image
import sys

try:
    basewidth = 75
    img = Image.open(sys.argv[1])
    wpercent = (basewidth / float(img.size[0]))
    hsize = int((float(img.size[1]) * float(wpercent)))
    img = img.resize((basewidth, hsize), PIL.Image.ANTIALIAS)
    img.save(sys.argv[1])
except:
    print sys.argv[1]