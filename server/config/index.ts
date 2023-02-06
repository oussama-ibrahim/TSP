import convict from 'convict';

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['development', 'test-docker', 'productions'],
    default: 'development',
    env: 'NODE_ENV',
  },

  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 8080,
    env: 'PORT',
  },
  db: {
    host: {
      doc: 'Database host name/IP',
      format: '*',
      default: 'localhost',
      env: 'DB_HOST',
    },
    name: {
      doc: 'Database name',
      format: String,
      default: 'Location',
      env: 'DB_NAME',
    },
    user: {
      doc: 'Database user',
      format: String,
      default: 'oussama',
      env: 'DB_USER',
    },
    port: {
      doc: 'database port',
      format: 'port',
      default: 27018,
      env: 'DB_PORT',
    },
    password: {
      doc: 'database password',
      format: '*',
      default: null,
      env: 'DB_PASSWORD',
  
    },
  },
  osrmUrl: {
    doc: 'osrm service url',
    format: String,
    default: 'http://router.project-osrm.org/trip/v1/driving',
    env: 'OSRM_URL',

  },
});

const env = config.get('env');
config.loadFile(`./config/${env}.json`);
config.validate({ allowed: 'strict' });

export default {
  ...config.getProperties(),
};
