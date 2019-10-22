interface IError {
    status: number;
    message: string,

  [index: string]: any;
}

export class Error {

  private error = {
      status:  400,
      message: 'some Error test',
  } as IError;

  public getEObject (status: number, message: string, code?:string) {
    return {
      error:{
        ...this.error,
        status,
        message,
        code
      }
    };
  }
}
module.exports = new Error();
