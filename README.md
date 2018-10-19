# STAR WARS API

- API de consulta a platenas do universo Star Wars.
- Utiliza a API do Star Wars (https://swapi.co/api) para calcular as aparições de cada planeta em filmes do Star Wars.
- Aplicação construida utilizando banco de dados MongoDB (https://www.mongodb.com)
- API construída com o Framework NestJs (https://docs.nestjs.com/first-steps)

# ENDPOINTS:

# Criar planeta:
- URL: /api/planetas
- Verbo HTTP: POST
- Parâmetro: { nome:string, terreno:string, clima:string }
- Retorno: { id:string, nome:string, terreno:string, clima:string }

# Excluir planeta:
- URL: /api/planetas/:id
- Verbo HTTP: DELETE
- Parâmetro: string
- Retorno: HttpResponse

# Buscar todos os planetas:
- URL: /api/planetas
- Verbo HTTP: GET
- Parâmetro: N/A
- Retorno: { id:string, nome:string, terreno:string, clima:string }[]

# Buscar planeta pelo nome:
- URL: /api/planetas/:nome
- Verbo HTTP: GET
- Parâmetro: string
- Retorno: { id:string, nome:string, terreno:string, clima:string }[]

# Buscar planeta pelo ID:
- URL: /api/planetas/:id
- Verbo HTTP: GET
- Parâmetro: string
- Retorno: { id:string, nome:string, terreno:string, clima:string }


