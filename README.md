# Impacta - Projeto Controle Financeiro

## Início

### Passo 1: Clonar o Repositório
Clone o repositório do projeto usando o comando:
```sh
 git clone <URL_DO_REPOSITORIO>
```

### Passo 2: Instalar Dependências
Dentro da pasta do projeto, instale todas as dependências necessárias com:
```sh
npm install
```

## Configuração do Banco de Dados

Este projeto utiliza o banco de dados **MySQL**. Siga os passos abaixo para configurá-lo corretamente:

1. Baixe e instale o MySQL pelo site oficial.
2. Durante a instalação, crie uma instância de desenvolvimento e defina as credenciais de acesso.
3. Utilize as credenciais abaixo (ou configure as suas e atualize o arquivo de configuração do projeto):

```json
"development": {
  "username": "root",
  "password": "QrhPWmxXDSBLT5pq",
  "database": "financas_impacta",
  "host": "127.0.0.1",
  "dialect": "mysql",
  "port": 3307
}
```

4. Teste a conexão abrindo o MySQL Command Line e tente se conectar com a senha que definiu. Se a conexão for bem-sucedida, o banco de dados está configurado corretamente.

## Executando o Projeto

1. Abra o projeto em seu editor de texto.
2. No terminal, inicie o servidor com o comando:
```sh
npm start
```
3. Acesse o sistema pelo navegador em:
```sh
http://localhost:8080
```

Agora é só testar!
