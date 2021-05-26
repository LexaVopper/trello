export const createArrayOfBoards = (obj) => {
  let array = [];
  //console.log(Object.values(obj));
  console.log(Object.keys(obj));
  Object.keys(obj).reduce((_, ff) => {
    console.log(ff);
  }, 0);
  //   for (let index = 0; index < Object.keys(obj).length; index++) {
  //     array.push(obj[Object.keys(obj)[index]]);
  //   }
  return array;
};
