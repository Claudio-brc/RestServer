import request from "supertest";
import Server from "../models/server"


 describe("categorias", () => { //agrupa pruebas en una función
   let server: any

   beforeAll(async () => {
     server = new Server().listen(8081)

   })

   test("obtiene categoría por id", async () => {  // cada test en específico
   
const response = await request(server)
     .get('/api/categorias/65ea9ee3c8517efafa8658da')

     expect(response.status).toBe(200)
    
   })
 })