const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log('\x1b[32m', ...params);
  }
};

const error = (...params) => {
  if (
    process.env.NODE_ENV !== 'test' &&
    params.name !== 'jwt must be provided'
  ) {
    console.error('\x1b[31m', ...params);
  }
};

module.exports = { info, error };
