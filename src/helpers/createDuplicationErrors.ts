export default (keyValues: Object) => {
  const errors = [];

  for (const key of Object.keys(keyValues)) {
    console.log(key);
    errors.push(`${key} already in use`);
  }

  return errors;
}