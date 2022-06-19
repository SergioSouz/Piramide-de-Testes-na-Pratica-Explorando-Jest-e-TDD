import getEntityManagerMock from '../__mocks__/getEntityManagerMock';
import { UserRepository } from './UserRepository';
import { User } from '../entities/User';
import { getMockUser } from '../__mocks__/mockUser';

describe('UserRepository', () =>{

   const mockUser: User = getMockUser()

   it('deve retornar o usuario salvo quando chamar a funcao save', async () =>{
      const managerMock = await getEntityManagerMock({
         saveReturn:mockUser
      }) 
      const userRepository = new UserRepository(managerMock)
      const user = await userRepository.save(mockUser)

      expect(user).toHaveProperty('user_id')

      expect(user).toMatchObject({
         name: 'algum usuario',
         email:'test@dio.ex'
      })
   })
})


