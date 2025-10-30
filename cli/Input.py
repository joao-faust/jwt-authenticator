from termcolor import cprint
from getpass import getpass

from app.exception.CustomError import CustomError

class Input:
  def __init__(
    self,
    prompt: str,
    label: str,
    min: int|None = None,
    max: int|None = None,
    choices: list[str]|None = None,
    numeric: bool = False,
    password: bool = False
  ):
    self._prompt = prompt
    self._label = label
    self._min = min
    self._max = max
    self._choices = choices
    self._numeric = numeric
    self._password = password

  def get_answer(self):
    result = ''

    while True:
      try:
        if not self._password:
          result = input(self._prompt).strip()
        else:
          result = getpass(self._prompt).strip()

        result_len = len(result)

        if self._numeric and not result.isnumeric():
          raise CustomError(f'{self._label} must be a digit')
        if self._min and result_len < self._min:
          raise CustomError(f'{self._label} must have at least {self._min}.')
        if self._max and result_len > self._max:
          raise CustomError(f'{self._label} must have at most {self._max}.')

        if self._choices and result not in self._choices:
          choices_len = len(self._choices)
          choices = ''

          for i, choice in enumerate(self._choices):
            choices += choice

            if i < choices_len - 2:
              choices += ', '
            elif i == choices_len - 2:
              choices += ' or '

          raise CustomError(f'Invalid {self._label}. Expected: {choices}.')

        break
      except CustomError as err:
        cprint(f'[ERROR] {str(err)}', 'red')
        continue

    return result
