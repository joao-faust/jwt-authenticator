from termcolor import cprint
from sys import exit

from cli.Menu import Menu
from cli.functions import login

try:
  Menu(['Exit', 'Login'], {'1': login}).start()
except Exception as err:
  cprint(f'[ERROR] an unexpected error occurred', 'red')
  exit(1)
