export const recursiveGetWorks: (
  nextPage: number,
  accessToken: string
) => Promise<any[]> = async (nextPage, accessToken) => {
  const result = [];
  const response = await fetch(
    `https://api.annict.com/v1/me/works?page=${nextPage}&per_page=50&access_token=${accessToken}`
  );

  const responseData = await response.json();
  result.push(...responseData.works);

  const nextPageData = responseData.next_page;

  if (nextPageData !== null) {
    result.push(...(await recursiveGetWorks(nextPageData, accessToken)));
  }

  return result;
};
