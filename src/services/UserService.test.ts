import { UserService } from './UserService'
import { getMockUser } from '../__mocks__/mockUser'
import { User } from '../entities/User'

jest.mock('../repositories/UserRepository')
const mockUserRepository = require('../repositories/UserRepository')

describe('UserServices',()=>{

   const mockUser: User = getMockUser()

   const userService = new UserService({
      userRepository: mockUserRepository,
      name: 'algum usuario',
      email:'test@dio.ex'
   })
   
   it('deve retonar o usuario, quando for salvo', async () => {
      mockUserRepository.save = jest.fn().mockImplementation(() => Promise.resolve(mockUser))
      const user = await userService.createUser()
      expect(user).toHaveProperty('user_id')
      expect(user).toMatchObject({
         name: 'algum usuario',
         email:'test@dio.ex'
      })
   })
})