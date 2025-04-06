const { Sequelize } = require('sequelize');
const config = require('../config/config.json'); // Importe o arquivo de configuração

// Configuração do Sequelize
const sequelize = new Sequelize(config.development);

// Função para inicializar o banco de dados e executar as migrations
async function initializeDatabase() {
  // Conecta ao MySQL sem especificar um banco de dados
  const sequelizeWithoutDB = new Sequelize({
    dialect: 'mysql',
    host: config.development.host,
    port: config.development.port,
    username: config.development.username,
    password: config.development.password,
  });

  try {
    // Cria o banco de dados se ele não existir
    await sequelizeWithoutDB.query(`CREATE DATABASE IF NOT EXISTS ${config.development.database};`);
    console.log(`Banco de dados "${config.development.database}" criado ou já existente.`);

    // Fecha a conexão temporária
    await sequelizeWithoutDB.close();

    // Verifica se a conexão com o banco de dados está funcionando
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida.');

    // Configuração do Umzug para executar as migrations
    const { Umzug, SequelizeStorage } = require('umzug');
    const umzug = new Umzug({
      migrations: {
        glob: 'migrations/*.js',
        resolve: ({ name, path, context }) => {
          const migration = require(path);
          return {
            name,
            up: async () => migration.up(context, Sequelize),
            down: async () => migration.down(context, Sequelize),
          };
        },
      },
      context: sequelize.getQueryInterface(),
      storage: new SequelizeStorage({ sequelize }),
      logger: console,
    });
    

    // Executa as migrations
    await umzug.up();
    console.log('Todas as migrations foram executadas com sucesso.');
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
    throw error; // Propaga o erro para ser tratado no servidor
  }
}

module.exports = { sequelize, initializeDatabase };