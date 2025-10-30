from abc import ABC, abstractmethod

from ..model.User import User
from ...persistence.ResultSet import ResultSet

class UserDao(ABC):
  @abstractmethod
  def create(self, user: User) -> int: pass

  @abstractmethod
  def get(
    self,
    field: str|None = None,
    value: object|None = None
  ) -> ResultSet[User]: pass
