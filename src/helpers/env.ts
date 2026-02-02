function getVariable(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Variable ${name} is not defined`);
  }

  return value;
}

function isDev(): boolean {
  return getVariable('NODE_ENV') === 'development';
}

export default {
  getVariable,
  isDev,
};
