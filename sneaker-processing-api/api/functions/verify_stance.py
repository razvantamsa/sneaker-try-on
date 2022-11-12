from PIL import Image
import numpy as np
import cv2

def verify_stance(image):
    nparr = np.fromstring(image, np.uint8)
    decoded_image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    gray = cv2.cvtColor(decoded_image, cv2.COLOR_BGR2GRAY)
    return gray