from ..model.HashedPassword import HashedPassword
from ..model.User import User
from ..model.auth.Jwt import Jwt
from ..dao.UserDao import UserDao
from ...exception.CustomError import CustomError

class UserController:
  def __init__(self, user_dao: UserDao, jwt: Jwt):
    self._user_dao = user_dao
    self._jwt = jwt

  def authorize(self, token: str, admin: bool = False):
    auth_user = self._jwt.decode(token)

    if admin and auth_user.role != 'admin':
      raise CustomError("You don't have admin privileges")

    return auth_user

  def register(self, name: str, role: str, password: str, token: str):
    auth_user = self.authorize(token, True)

    user = User(name, role, HashedPassword(password))
    user.id = self._user_dao.create(user)

    return user

  def authenticate(self, name: str, password: str):
    user = self._user_dao.get('name', name).first()

    if not user or not user.hashed_password.check(password):
      raise CustomError('Invalid credentials')

    return self._jwt.encode(user)

  def get_users(self, token: str):
    auth_user = self.authorize(token)
    return self._user_dao.get().all()
