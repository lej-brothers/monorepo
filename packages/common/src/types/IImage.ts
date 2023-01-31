export interface IImage {
  _id?: string;
  key: string;
  width: number;
  height: number;
  orientation: number;
}

export interface IImageRes {
  _id?: string;
  url: string;
  width: number;
  height: number;
  orientation: number;
}