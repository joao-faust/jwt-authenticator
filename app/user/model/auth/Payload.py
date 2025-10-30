from typing import TypedDict


class Payload(TypedDict):
  name: str
  role: str
  sub: str
  iat: int
  exp: int
