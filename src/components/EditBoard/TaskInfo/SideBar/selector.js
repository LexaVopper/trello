export const findTags = (tags, filterTagsBy) => {
  const newd = [];
  Object.values(tags).forEach((element) => {
    if (element.title.includes(filterTagsBy)) {
      newd.push(element);
    }
  });
  return newd;
};
