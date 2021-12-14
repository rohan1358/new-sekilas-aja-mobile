// const IS_LIVE = false;
const IS_LIVE = true;

const logger = (payload: any, extra?: any) => {
  if (IS_LIVE) {
    return;
  }
  return !!extra ? console.log(payload, extra) : console.log(payload);
};

export { logger };
