export const access_token = "amksM34Jh76lsXGuXlxxl_bfkzeb8pYgCaJ04n6y-9M";

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

// 日付で並び替える関数
const sortDatesByOldest = (dateStrings: string[]): string[] => {
  const parseDate = (dateString: string) => new Date(dateString);

  const sortedDates = dateStrings
    .slice()
    .sort((a, b) => parseDate(a).getTime() - parseDate(b).getTime());

  return sortedDates;
};

// 5桁の自然数を生成する関数
export const generateRandomNumber = (): number => {
  // Math.random()は0以上1未満の乱数を生成
  // 5桁の数字を得るために10000をかけ、Math.floor()で小数点以下を切り捨て
  // さらに10000を割り、0から99999までの整数を得る
  const randomNumber = Math.floor(Math.random() * 90000) + 10000;
  return randomNumber;
};
