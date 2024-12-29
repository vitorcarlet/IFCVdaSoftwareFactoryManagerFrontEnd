interface GlobalStatus {
  name: string;
  value: boolean;
  icon: string;
  color: string;
}

export interface GlobalErrorProject {
  status: number;
  message: string;
}

declare module "*.mp3" {
  const value: any;
  export default value;
}

declare module "*.wav" {
  const value: any;
  export default value;
}
