interface OnPayment {
  handlePrev(param: any): void;
  email: string;
  btnBack: boolean;
  handleClose(): void;
  baseUrl: string;
}
