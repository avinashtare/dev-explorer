import os
import win32com.client
import platform
import time
import logging
import time
import sys
from datetime import datetime

global fullPath,mypath
# when your want's things from exe file 
if getattr(sys, 'frozen', False):  
    fullPath = os.path.abspath(sys.executable)
    mypath = os.path.dirname(fullPath)
else:
    # if user want this things when code not in exe 
    fullPath = os.path.abspath(__file__)
    mypath = os.path.dirname(fullPath)


logging.basicConfig(
    filename= f"{mypath}\/text.log",
    level=logging.DEBUG      
)


def get_startup_folder():
    system_platform = platform.system()
    if system_platform == "Windows":
        startup_folder = os.path.join(os.getenv("APPDATA"), "Microsoft", "Windows", "Start Menu", "Programs", "Startup")
        return startup_folder
    else:
        raise OSError("Unsupported platform")


def create_shortcut(target_path, shortcut_path, icon_path=None):
    shell = win32com.client.Dispatch("WScript.Shell")
    shortcut = shell.CreateShortcut(shortcut_path)
    shortcut.TargetPath = target_path

    if icon_path:
        shortcut.IconLocation = icon_path

    shortcut.Save()


def createLogs():
    custom_info = "Log:"
    print(fullPath)
    print(mypath)
    while True:
        current_datetime = datetime.now()

        logging.debug(f'{custom_info} - {current_datetime}')
        print(current_datetime)
        time.sleep(1)

# first executable 
def main():
    # Find the startup folder
    startup_folder = get_startup_folder()

    # Get information about the current script
    target_file_path = fullPath
    file_name = os.path.splitext(os.path.basename(fullPath))[0]

    # Create the shortcut path
    shortcut_path = os.path.join(startup_folder, f"{file_name}.lnk")
    # my orignal folder locations

    # Create the shortcut
    create_shortcut(target_file_path, shortcut_path, icon_path=None)

    # create log file in seconds 
    createLogs()

if __name__ == "__main__":
    main()