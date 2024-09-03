# Measurement Read API

Esta API permite a leitura automatizada de medições de água, gás e energia a partir de imagens enviadas em base64. O serviço utiliza a API Gemini para processar as imagens e retornar os valores de medição. 

## Setup

### Pré-requisitos
1. **Docker**: Certifique-se de que o Docker esteja instalado na sua máquina.
2. **API Key do Gemini**: Você precisará de uma chave de API do Gemini para que o serviço funcione.

### Configuração

1. Adicione um arquivo `.env` na raiz do projeto com a chave da API do Gemini e os dados para geração e conexão do banco de dados:
    ```
    GEMINI_API_KEY=
    DB_HOST=mysql
    DB_PORT=
    DB_NAME=
    MYSQL_DATABASE=
    DB_PASSWORD=
    MYSQL_PASSWORD=
    DB_USER=
    MYSQL_USER=
    MYSQL_ROOT_PASSWORD=
    ```

2. Para iniciar o serviço, execute:
    ```bash
    docker-compose up --build
    ```

3. Para visualizar a documentação da API acesse [Docs](http://localhost/docs) após iniciar o projeto.

## Endpoints

### 1. `POST /upload`

Este endpoint recebe uma imagem de um medidor (de água ou gás ou energia) em base64, envia a imagem para a API Gemini para leitura, e retorna o valor medido.

**Request body:**
```json
{
 "image": "base64",
 "customer_code": "string",
 "measure_datetime": "datetime",
 "measure_type": "WATER, GAS or ENERGY"
}
```

**Responses:**

| Status Code | Descrição Resposta                                                                 | Response body                                                                 |
|-------------|-----------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| 200         | Operação realizada com sucesso                                                     | `{ "image_url": string, "measure_value": integer, "measure_uuid": string }`                  |
| 400         | Os dados fornecidos no corpo da requisição são inválidos                           | `{ "error_code": "INVALID_DATA", "error_description": <descrição do erro> }`                |
| 409         | Já existe uma leitura para este tipo no mês atual                                  | `{ "error_code": "DOUBLE_REPORT", "error_description": "Leitura do mês já realizada" }`     |

### 2. `PATCH /confirm`

Este endpoint confirma ou corrige o valor lido previamente pela API Gemini.

**Request body:**
```json
{
 "measure_uuid": "string",
 "confirmed_value": "integer"
}
```

**Responses:**

| Status Code | Descrição Resposta                                                                 | Response body                                                                 |
|-------------|-----------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| 200         | Operação realizada com sucesso                                                     | `{ "success": true }`                                                                        |
| 400         | Os dados fornecidos no corpo da requisição são inválidos                           | `{ "error_code": "INVALID_DATA", "error_description": <descrição do erro> }`                |
| 404         | Leitura não encontrada                                                             | `{ "error_code": "MEASURE_NOT_FOUND", "error_description": "Leitura não encontrada" }`      |

### 3. `GET /<customer_code>/list`

Este endpoint lista todas as medições realizadas por um cliente específico, filtradas pelo tipo de medição (água ou gás).

**Uso:** `{base_url}/<customer_code>/list?measure_type=WATER, GAS or ENERGY`

**Responses:**

| Status Code | Descrição Resposta                                                               | Response body                                                                                                                                           |
|-------------|---------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 200         | Operação realizada com sucesso                                                   | `{ "customer_code": string, "measures": [ { "measure_uuid": string, "measure_datetime": datetime, "measure_type": string, "has_confirmed": boolean, "image_url": string }, { "measure_uuid": string, "measure_datetime": datetime, "measure_type": string, "has_confirmed": boolean, "image_url": string } ] }` |
| 400         | Parâmetro measure type diferente de WATER, GAS ou ENERGY                                 | `{ "error_code": "INVALID_TYPE", "error_description": "Tipo de medição não permitida" }`                                                                          |

## Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento JavaScript.
- **Express.js**: Framework web para Node.js.
- **Typescript**: Superset de JavaScript que adiciona digitação estática opcional e recursos avançados.
- **Docker**: Utilizado para containerizar a aplicação.
- **API Gemini**: Serviço de reconhecimento de imagem utilizado para leitura das medições.
- **Swagger OpenAPI**: Utilizado para documentar a API possibilitando teste e utilização facilitados.
  
## Estrutura do Projeto

- `controllers/`: Contém os controladores que lidam com as requisições HTTP.
- `models/`: Contém os modelos de dados usados pela aplicação.
- `routes/`: Define as rotas da API.
- `docker-compose.yml`: Arquivo de configuração do Docker Compose para iniciar os serviços.

## Como Contribuir

1. Faça um fork do repositório.
2. Crie uma nova branch (`git checkout -b feature/nome-da-sua-feature`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`).
4. Faça um push para a branch (`git push origin feature/nome-da-sua-feature`).
5. Crie um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
