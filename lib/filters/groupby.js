// Group posts by year
// https://github.com/11ty/eleventy/discussions/2630

module.exports = (pages = []) => {
  const pagesMap = {};
  for (const page of [...pages]) {
    const pageYear = page.date.getFullYear();
    const yearlyPosts = pagesMap[pageYear] || [pageYear, []];
    yearlyPosts[1].push(page);
    pagesMap[pageYear] = yearlyPosts;
  }

  return (
    Object.values(pagesMap)
      // Sort the year map in descending order.
      .sort(([year1], [year2]) => year2 - year1)
  );
};
