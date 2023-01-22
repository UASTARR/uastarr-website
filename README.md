# uastarr-website
The website for STARR, including the backend code as well.

([Design requirements can be found here.](https://docs.google.com/document/d/1wyA5_0MdTWBddKzDoEbnnDcIFpzjJVFhrQTrca2kE6k/edit?usp=sharing))

Tentatively, the project structure should look like the following:
```
server/
  ( Server Stuff Here )
templates/
  assets/
    css/
      (CSS files here)
    js/
      (Any JS needed for animations and stuff here...?)
  ( HTML Files here)
README.md
```

## How to Set up the Project for the First Time

1. **Clone this repository.**

2. **Make sure you have Python 3 installed** (essentially, anything Python 3.7+ should work fine, older versions may work as well).

3. **Set up a Python virtual environment.** This is done to isolate the dependencies of this project from any other installed dependencies for other Python projects. It will help insulate the project against dependency clashes. How this works is that the Python interpreter essentially creates a clone of itself, called a "**virtual environment**", which behaves like a blank slate with no packages or dependencies installed. From there, we can install the necessary project dependencies to this virtual environment and execute the program using this copy of the interpreter. [For more information on virtual environments, see here.](https://docs.python.org/3/library/venv.html)
    * Enter your terminal if you haven't already, and go to the directory where the source code is (this should be `uastarr-website/`).
    * Type the command `python -m venv env` (or `python3 -m venv env` depending on your system). This command may take 15-20 seconds to execute. 
        * This command tells the python interpreter to execute a built-in library called "venv" which is used for creating virtual environments.

4. **Enter the virtual environment.** After you have created your virtual environment, you can "enter" the virtual environment (that is, use it in place of the default Python interpreter for any Python projects) by doing the following:
    * To enter the virtual environment:
        * Windows users: `env\Scripts\activate.bat`
        * Mac OS/Linux users: `source env/bin/activate`
        * For other operating systems/shells: see here: [https://docs.python.org/3/library/venv.html#how-venvs-work](https://docs.python.org/3/library/venv.html#how-venvs-work)
    * To tell if the virtual environment worked, it should have added a "`(env)`" to the front of your command line. For example, if your command line looked like `C:\Users\yourusername\uastarr-website>` before, it should now look like `(env) C:\Users\yourusername\uastarr-website>`.
    * To exit the virtual environment:
        * The command `deactivate` should work for all operating systems.

5. **Install project dependencies.** The `requirements.txt` file in the repository is provided to give everyone a common set of dependencies that they can work with for the project. When installing dependencies with PIP, they can be installed through this file by using the following:
    * `pip install -r requirements.txt`, or
    * `pip3 install -r requirements.txt` depending on your system.

6. **Run the project.** To do so, first make sure you are in the virtual environment (that is, you can see the `(env)` on your command line). Then run `python app.py` or `python3 app.py` depending on your system.

## How to Run the Project Again (After Setup)
All you need to do to run the project after doing the setup process is:
1. Make sure you're in the virtual environment.
2. Run `python app.py` or `python3 app.py` depending on your system.
