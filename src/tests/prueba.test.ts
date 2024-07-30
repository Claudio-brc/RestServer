import request from "supertest"
import { server } from "../app"

describe("categorias", () => {
  let userToken = ""
  let adminToken = ""
  //agrupa pruebas en una función
  beforeAll(async () => {
    //antes de todas las pruebas nos logueamos
    const response = await request(server.app).post("/api/auth/login").send({
      correo: "pepepe@test.com",
      password: "13266664",
    })

    userToken = response.body.token
  })

  test("obtiene categoría por id", async () => {
    // cada test en específico

    const response = await request(server.app).get(
      "/api/categorias/65ea9ee3c8517efafa8658da"
    )

    expect(response.status).toBe(200)

    expect(response.body).toHaveProperty("categoria")
    expect(response.body.categoria).toHaveProperty("_id")
    expect(response.body.categoria).toHaveProperty("nombre")
    expect(response.body.categoria).toHaveProperty("estado")
    expect(response.body.categoria).toHaveProperty("usuario")
    expect(response.body.categoria.usuario).toHaveProperty("nombre")
    expect(response.body.categoria.usuario).toHaveProperty("correo")
    expect(response.body.categoria.usuario).toHaveProperty("estado")
    expect(response.body.categoria.usuario).toHaveProperty("uID")
  })

  test("Crea un producto", async () => {
    let randomName = Math.random().toString(36).substring(7)
    const response = await request(server.app)
      .post("/api/productos")
      .send({
        nombre: `Producto Nuevo ${randomName}`.toUpperCase(),
        usuario: "649bc31bf9cb9aec95f19c21",
        categoria: "65ea9ee3c8517efafa8658da",
        precio: 100,
        descripcion: "Descripción del producto nuevo",
      })
      .set("x-token", userToken)

    expect(response.status).toBe(201)
    expect(response.body.nombre).toBe(
      `Producto Nuevo ${randomName}`.toUpperCase()
    )
    expect(response.body.usuario).toBe("649bc31bf9cb9aec95f19c21")
    expect(response.body.categoria).toBe("65ea9ee3c8517efafa8658da")
    expect(response.body.precio).toBe(100)
    expect(response.body.descripcion).toBe("Descripción del producto nuevo")
  })
})
