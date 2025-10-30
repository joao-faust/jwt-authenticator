from .UserDao import UserDao
from ..model.User import User
from ...persistence.ResultSet import ResultSet
from ...persistence.FakeDb import FakeDb

class UserDaoImpl(UserDao):
  def __init__(self):
    self._users = FakeDb.USERS

  def create(self, user):
    if self.get('name', user.name).count() > 0:
      raise ValueError(f'Name "{user.name}" already in use')
    if self.get('id', user.name).count() > 0:
      raise ValueError(f'ID "{user.id}" already in use')

    self._users.append(user)
    last_id = self._users[-1].id

    return last_id

  def get(self, field = None, value = None):
    if not field or not value:
      return ResultSet[User](self._users)

    result = []

    for user in self._users:
      if not hasattr(user, field):
        raise AttributeError(f'Field "{field}" does not exist')

      possible_value = getattr(user, field)

      if value == possible_value:
        result.append(user)

    return ResultSet[User](result)
