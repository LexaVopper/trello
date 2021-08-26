/* eslint-disable prefer-rest-params */
/* eslint-disable func-names */
/* eslint-disable one-var */
/* eslint-disable no-undef */

export const delay = (callback, ms) => {
  let timer = 0;
  return function () {
    const context = this,
      args = arguments;
    console.log(args);

    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(context, args);
    }, ms || 0);
  };
};
