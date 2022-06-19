import axios from 'axios'


const server = axios.create({
   baseURL: 'http://localhost:5001/'
})



describe('/user', () =>{
   it('deve retornar o status 200', async () =>{
      const user = await server.post('/user', {
         name: 'algum usuario',
         email: 'test@dio.ex'
      })

      expect( user.status).toBe(201)
   })
})