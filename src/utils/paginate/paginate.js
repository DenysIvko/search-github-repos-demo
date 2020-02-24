export default ({ totalItemsCount, itemsCountPerPage, activePage, pageRangeDisplayed }) => {
  const pagesCount = Math.ceil(totalItemsCount / itemsCountPerPage);
  // tries to render current page in the middle of range
  let startPosition = activePage - Math.ceil(pageRangeDisplayed / 2);
  if (startPosition < 0) {
    startPosition = 1;
  }
  if (startPosition + pageRangeDisplayed > pagesCount) {
    startPosition = pagesCount - pageRangeDisplayed + 1;
  }
  let range = pageRangeDisplayed;
  if (pageRangeDisplayed >= pagesCount) {
    range = pagesCount;
    startPosition = 1;
  }

  const isLast = pagesCount === activePage;

  return {
    isLast,
    pages: new Array(range).fill(null).map((n, i) => i + startPosition)
  };
};
