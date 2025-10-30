from bcrypt import gensalt, hashpw, checkpw
from ...exception.CustomError import CustomError

class HashedPassword:
  def __init__(self, plain_password: str):
    if len(plain_password) < 4:
      raise CustomError('Password cannot be less than four chars')

    self._hash = hashpw(plain_password.encode(), gensalt())

  @property
  def password(self):
    return self._hash

  def check(self, plain_password: str):
    return checkpw(plain_password.encode(), self._hash)
