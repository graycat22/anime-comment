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

export const pressKeyDown = (e: React.KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    e.preventDefault();
    document.getElementById("submitButton")?.click();
  }
};

export const resizeTextarea = (id: string) => {
  const PADDING_Y = 2;

  const $textarea = document.getElementById(id) as HTMLTextAreaElement;

  let lineHeight = getComputedStyle($textarea).lineHeight;
  lineHeight = lineHeight.replace(/[^-\d\.]/g, "");
  const lineHeightNumber = parseFloat(lineHeight); // 文字列を数値に変換

  const lines = Math.max(($textarea.value + "\n").match(/\n/g)?.length || 1, 2); // 常に2行以上を保証
  const newHeight = lineHeightNumber * lines + PADDING_Y;

  $textarea.style.height = `${newHeight}px`;

  // テキストエリアが3行以上になったら、次回のリサイズで高さを増やす
  if (lines >= 3) {
    const currentRows = $textarea.rows;
    if (lines > currentRows) {
      $textarea.rows = lines;
      $textarea.style.height = "auto"; // 高さを自動調整する
    }
  }
};

// timezonestamp を JST に変換する関数
export const convertToJST = (isoString: string) => {
  const date = new Date(isoString);

  // 日本時間（JST）に変換
  const jpDate = new Date(
    date.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })
  );

  return jpDate.toString();
};

// 作成時間を昇順にして並び替えるための関数
// 使い方は Array.sort(compareFunction) の Aeeay に任意のオブジェクト配列を入れる
export const compareFunction = (a: any, b: any) => {
  const dateA = new Date(a.created_at);
  const dateB = new Date(b.created_at);

  // 昇順にするため、b - としています
  return dateA.getTime() - dateB.getTime();
};

// オブジェクト配列から created_at プロパティを比較し、一番新しい日時のオブジェクトを取り出す関数
export const findLatestObject = (objects: any) => {
  if (objects.length === 0) {
    return null; // 配列が空の場合はnullを返すか、適切なデフォルト値を返すことができます
  }

  // 最初のオブジェクトを初期値として設定
  let latestObject = objects[0];

  // 各オブジェクトのcreated_atを比較して最新のものを更新
  for (const obj of objects) {
    if (obj.created_at > latestObject.created_at) {
      latestObject = obj;
    }
  }

  return latestObject;
};
