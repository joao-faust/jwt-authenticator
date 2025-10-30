from getpass import getpass
from termcolor import cprint

from app.user.controller.UserController import UserController
from app.user.dao.UserDaoImpl import UserDaoImpl
from app.user.model.auth.Jwt import Jwt
from app.persistence.FakeCache import FakeCache
from app.exception.CustomError import CustomError
from .Menu import Menu
from .Input import Input

user_controller = UserController(UserDaoImpl(), Jwt('secret', 120))

def register():
  token = FakeCache.DATA['jwt']
  auth_user = user_controller.authorize(token, True)

  name = Input('Name: ', 'Name', min=4, max=40).get_answer()
  role = Input('Role: ', 'Role', choices=['user', 'admin']).get_answer()
  password = Input('Password: ', 'Password', min=4, password=True).get_answer()

  user = user_controller.register(name, role, password, token)

def list_users():
  users = user_controller.get_users(FakeCache.DATA['jwt'])

  for i, user in enumerate(users):
    print(f'{i} - {user.name} ({user.role})')

def login():
  while True:
    try:
      name = input('Name: ')
      password = getpass('Password: ')

      token = user_controller.authenticate(name, password)
      FakeCache.DATA['jwt'] = token
    except CustomError as err:
      cprint(f'[ERROR] {str(err)}', 'red')
      continue
    else:
      break

  Menu(
    ['Exit', 'Register', 'List Users'],
    {'1': register, '2': list_users}
  ).start()

