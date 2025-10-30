from ..user.model.User import User
from ..user.model.HashedPassword import HashedPassword

class FakeDb:
  USERS: list[User] = []

FakeDb.USERS.append(User('admin', 'admin', HashedPassword('admin')))
FakeDb.USERS.append(User('user', 'user', HashedPassword('user')))
