from typing import TypeVar, Generic

T = TypeVar('T')

class ResultSet(Generic[T]):
  def __init__(self, result: list[T]):
    self._result = result

  def count(self):
    return len(self._result)

  def all(self):
    return self._result

  def first(self):
    if self.count() == 0:
      return None
    return self.all()[0]
