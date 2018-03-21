class ExtendableError extends Error {
    constructor({message, status}) {
      super(message);
      this.name = this.constructor.name;
      this.status = status
      if (typeof Error.captureStackTrace === 'function') {
        Error.captureStackTrace(this, this.constructor);
      } else { 
        this.stack = (new Error(message)).stack; 
      }
    }
  }    
  
  // now I can extend
  
  class AppError extends ExtendableError {}

  module.exports = AppError;