import { User } from '../entities/User'
import { makeMockRequest } from '../__mocks__/mockRequest'
import { makeMockResponse } from '../__mocks__/mockResponse'
import { UserController } from './UserController'
import { getMockUser } from '../__mocks__/mockUser'
import { Request } from 'express'

const mockUser: User = getMockUser()
let mockReturnCreateUser 

jest.mock('../services/UserService',()=> {
   return {
      UserService: jest.fn().mockImplementation(()=>{
         return {
            createUser: mockReturnCreateUser 
         }
      })
   }
})

describe('UserController', ()=>{
   const userController = new UserController()


   it('Deve retorna status 201 e o usuario criado', async () =>{
      mockReturnCreateUser = jest.fn().mockImplementation(()=> Promise.resolve(mockUser))
      const request = {
         body:{
            name: 'algum usuario',
            email:'test@dio.ex'
         }
      } as Request

      const response = makeMockResponse()
      await userController.createUser(request, response)
      expect(response.state.status).toBe(201)
      expect(response.state.json).toHaveProperty('user_id')
      expect(response.state.json).toMatchObject({
         name: 'algum usuario',
         email:'test@dio.ex'
      })
   })

   const response = makeMockResponse()

   it('deve retornar status 400, quando o usuario nao informar name e email', async () => {
      const request = {
         body:{
            name: '',
            email:''
         }
      } as Request


      await userController.createUser(request,response)
      expect(response.state.status).toBe(400)
   })


   it('deve retornar status 500, quando ocorrer um erro', async () => {
      mockReturnCreateUser = jest.fn().mockImplementation(()=>{
         throw new Error()
      })
      const request = {
         body:{
            name: 'algum usuario',
            email:'test@dio.ex'
         }
      } as Request

      await userController.createUser(request, response)

   })
})