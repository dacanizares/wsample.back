function validateModel<T extends object>(type: { new(): T ;}, req: {[key: string]: any}) 
  : [T, boolean, Array<string>] {
  const command = new type();
  type keys = keyof T;

  let isValid = true;
  const validationErrors: Array<string> = [];
  const requiredKeys: Array<string> = [];
  const addedKeys: Array<string> = [];

  Object.entries(command).forEach(([key, value]) => {
    if (value !== null) {
      requiredKeys.push(key);
    }
  });
  
  Object.entries(req).forEach(([key,value]) => {
    if (key in command) {
      command[key as keys] = value as any;
      addedKeys.push(key);
    } else {
      isValid = false;
      validationErrors.push(`Body key ${key} is invalid`);
    }
  });

  requiredKeys.forEach((key) => {
    if (!addedKeys.includes(key)) {
      validationErrors.push(`Body key ${key} is missing`);
      isValid = false;
    }
  });

  return [
    command,
    isValid,
    validationErrors
  ]
}

export default validateModel;
