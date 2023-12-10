import ctypes

# Define constants for console colors
FOREGROUND_RED = 0x0C  # Red text
FOREGROUND_GREEN = 0x0A  # Green text
FOREGROUND_BLUE = 0x09  # Blue text
FOREGROUND_WHITE = 0x0F  # White text

# Function to set console text color
def set_color(color):
    std_handle = ctypes.windll.kernel32.GetStdHandle(-11)
    ctypes.windll.kernel32.SetConsoleTextAttribute(std_handle, color)

# Function to reset console text color
def reset_color():
    set_color(FOREGROUND_WHITE)

# Example usage
set_color(FOREGROUND_RED)
print("This is red text.")
reset_color()

set_color(FOREGROUND_GREEN)
print("This is green text.")
reset_color()

set_color(FOREGROUND_BLUE)
print("This is blue text.")
reset_color()

set_color(FOREGROUND_WHITE)
print("This is white text.")
reset_color()
