declare namespace Definitions {
  export interface IForm {
    success: boolean;
    message: string;
    data: IField[];
  }

  export interface IField {
    fieldName: string;
    type: string;
    value: string;
    options?: string[];
  }

  export interface ICrudObj {
    [key: string]: any;
  }
}
