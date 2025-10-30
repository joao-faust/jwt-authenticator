from .HashedPassword import HashedPassword
from ...exception.CustomError import CustomError

class User:
  _cls_id = 0

  def __init__(
    self,
    name: str,
    role: str,
    hashed_password: HashedPassword|None = None
  ):
    if len(name) < 4:
      raise CustomError('Name cannot be less than five chars.')
    if len(name) > 40:
      raise CustomError('Name cannot be greater than forty chars.')

    if role != 'admin' and role != 'user':
      raise CustomError(f'Role "{role}" does not exist.')

    self._name = name
    self._role = role
    self._hashed_password = hashed_password

    User._cls_id += 1
    self._id = User._cls_id

  @property
  def id(self):
    return self._id

  @id.setter
  def id(self, id: int):
    self._id = id

  @property
  def name(self):
    return self._name

  @property
  def role(self):
    return self._role

  @property
  def hashed_password(self):
    return self._hashed_password
