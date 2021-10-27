const currencyFormat = (value: string | number = 0) =>
  value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

export { currencyFormat };
