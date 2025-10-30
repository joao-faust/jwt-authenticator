from jwt import encode, decode, ExpiredSignatureError, InvalidTokenError
from datetime import datetime

from .Payload import Payload
from ..User import User
from ....exception.CustomError import CustomError

class Jwt:
  def __init__(self, secret: str, exp_time: int|None = None):
    self._secret = secret
    self._exp_time = exp_time

  def encode(self, user: User):
    now = int(datetime.now().timestamp())

    payload: Payload = {
      'sub': str(user.id),
      'name': user.name,
      'role': user.role,
      'iat': now,
    }

    if self._exp_time:
      payload['exp'] = now + self._exp_time

    return encode(payload, self._secret, algorithm='HS256')

  def decode(self, token: str):
    try:
      payload: Payload = decode(token, self._secret, algorithms=['HS256'])

      user = User(payload['name'], payload['role'])
      user.id = int(payload['sub'])

      return user
    except ExpiredSignatureError:
      raise CustomError('Token has expired')
    except InvalidTokenError:
      raise CustomError('Invalid token')
