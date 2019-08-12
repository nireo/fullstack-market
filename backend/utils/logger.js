const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params);
  }
};

const error = (...params) => {
  if (
    process.env.NODE_ENV !== 'test' &&
    params.name !== 'jwt must be provided'
  ) {
    console.error(...params);
  }
};

module.exports = { info, error };
