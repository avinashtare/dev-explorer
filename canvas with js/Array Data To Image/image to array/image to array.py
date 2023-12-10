import numpy as np
from PIL import Image

# Open the image and convert it to RGBA
img = Image.open('demo.png').convert('RGBA')

# Convert the image to a NumPy array
img_array = np.array(img)

# Convert the NumPy array to a Python list
img_list = img_array.tolist()

with open('output.js', 'w') as js_file:
    js_file.write(f"const imageData = {str(img_list)}")