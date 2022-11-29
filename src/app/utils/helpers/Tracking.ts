interface Data {
    message?: string;
    e?: unknown;
    info?: unknown;
    callback?: () => never;
  }
  
  const addError = (data: Data): void => {
    // eslint-disable-next-line no-console
    console.error(data);
  };
  
  const critical = addError;
  const error = addError;
  const warning = addError;
  const info = addError;
  const debug = addError;
  
  export default {
    error,
    info,
    critical,
    warning,
    debug,
    addError
  };
  