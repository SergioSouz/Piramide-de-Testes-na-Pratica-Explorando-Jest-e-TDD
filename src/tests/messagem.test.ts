import axios from 'axios'


const server = axios.create({
   baseURL: 'http://localhost:5001/'
})

describe('/',()=>{
   it('deve rotornar a messagem de boas vinda', async ()=>{
      const response = await server.get('/')

      expect(response.status).toBe(200)
      expect(response.data).toMatchObject({ message: 'Wellcome to TestsAPI' })

   })

})