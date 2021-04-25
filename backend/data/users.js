import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@akhnshop.com',
    password: bcrypt.hashSync('12345', 10),
    isAdmin: true,
  },
  {
    name: 'Arpan Kumar Nandi',
    email: 'akn@akhnshop.com',
    password: bcrypt.hashSync('12345', 10),
  },
  {
    name: 'Debashreeta Basak',
    email: 'db@akhnshop.com',
    password: bcrypt.hashSync('12345', 10),
  },
]

export default users
