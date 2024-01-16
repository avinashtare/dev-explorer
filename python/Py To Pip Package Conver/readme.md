# Python To Pypi(PIP) package converter And Publish

#### 1. File Structure
```txt
root folder/
|---- magic_print/
|     |-- __init__.py
|     |-- helper.py
|---- setup.py
|---- README.md <- optional
|---- LICENCE   <- optional
```

#### 2. Install Dependencies
*  reating binary distributions (wheels).
```shell
$ pip install bdist_wheel
```
* sdist command stands for "source distribution," and it is used to create a source distribution package for a Python project.
```shell
$ pip install sdist
```
* This allows you to perform various operations on paths using methods and properties.
```shell
$ pip install pathlib
```

it's use for publish our package.
```shell
$ pip install twine
```
#### Write Package Files
* create root folder/pacagefolder/__init__.py
```shell
from helper import magic_console

```
* create **root folder/pacagefolder/helper.py**
```shell
def magic_console(msg):
    print("Thare Is Not Magic:- ",msg)
```

* Note:- README.md & LICENCE are optional.

* create **root folder/setup.py**
```py
from setuptools import setup
import pathlib

# Read the contents of your README.md file and license file 
readme_path = pathlib.Path(__file__).parent / 'README.md'
license_path = pathlib.Path(__file__).parent / 'LICENSE'
# read and store in variable
long_description = readme_path.read_text(encoding='utf-8')
license_data = license_path.read_text(encoding='utf-8')


setup(
    name='Package_Name', 
    version="0.0.1", # <-- add version
    install_requires=[], # <--  pacages require to run you project i.e numpy
    python_requires='>=3.1', # <--- python supported
    packages= ["My_PKG"], #<-- pacage path
    package_data={'': ['./**']}, #<-- include all the file inside pacages
    author_email="xyz@example.com",
    url="https://example.com/",
    author="Avinash Tare",
    description="This is My short Descriptoin",
    long_description_content_type='text/markdown', # (optinal)
    long_description=long_description, # <- md fil you cane append licence data you can add direct text also .(optinal)
    license=license_data, # <- append licence data you can add direct text also (optinal)
    project_urls={
        'Documentation': 'https://example.com/',
        'Source': 'https://github.com/avinashtare/express-server-python',
    }, # <-- all urls like github lindin donation (optinal)
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Programming Language :: Python :: 3',
        'Topic :: Internet :: WWW/HTTP :: Dynamic Content :: CGI Tools/Libraries',
        'Topic :: Software Development :: Libraries',
        'License :: OSI Approved :: MIT License',
    ], # using this pypi categoryize you package it's (optinal)
    keywords='express, python-express, express-python, express-server, server-express', #<-- add keywords
    include_package_data=True, #<-- (optinal)

    # if yo add cli you can use this command
    #  entry_points={
    #     'console_scripts': [
    #         'your_command = your_project.module:main_function',
    #     ],
    # },
)
```

#### Create Destribution
* using this create destribution of you library
```shell
python setup.py sdist bdist_wheel 
```
* Your Can See /dist  & build folder in you library

#### Install Locally
install 
```shell
pip install dis/youpakage-version.whl
pip install dis/youpakage-version.gz
```
* Congratulations you pacage created you can use any whare

#### Publish Your Package Publiclly

* Got to [pypi](https://pypi.org/) And Register.
* Run This Command In You Root Folder
```shell
twine upload dist/*
```
