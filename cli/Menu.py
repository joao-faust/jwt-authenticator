from termcolor import cprint

from .Input import Input
from app.exception.CustomError import CustomError

class Menu:
  def __init__(self, options: list[str], actions: dict):
    self._options = options
    self._actions = actions

  def separate(self, separator: int = 20):
    print('-' * separator)

  def start(self):
    self.separate()

    choices = list(self._actions.keys())
    choices.insert(0, '0')

    while True:
      for i, option in enumerate(self._options):
        print(f'{i} - {option}')

      try:
        option = Input('Option: ', 'Option', numeric=True, choices=choices)\
          .get_answer()

        if option == '0':
          raise KeyboardInterrupt('option')

        self.separate()

        self._actions[option]()
        self.separate()
      except CustomError as err:
        cprint(f'[ERROR] {str(err)}', 'red')
        continue
      except KeyboardInterrupt as interrupted_by:
        if str(interrupted_by) != 'option': print()
        break
