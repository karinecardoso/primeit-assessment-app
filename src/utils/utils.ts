import { Article, ArticleItem, ArticleTableItem } from "../types/Article";

export const getDistinctAndSortedItems = (
  items: { id: string; name: string }[]
) => {
  return items
    .filter(
      (item, index, items) => items.findIndex((x) => x.id === item.id) === index
    )
    .sort((a, b) => a.name.localeCompare(b.name));
};

export const parseSelectOption = (
  items: { id: string; name: string }[] | string[],
  placeholder: string = "Select..."
) => {
  return [
    { label: placeholder, value: "" },
    ...items.map((item) => ({
      label: item.hasOwnProperty("name")
        ? (item as { id: string; name: string }).name
        : (item as string),
      value: item.hasOwnProperty("id")
        ? (item as { id: string; name: string }).id
        : (item as string),
    })),
  ];
};

export const convertArticles = (
  articles: Article[],
  articleItems: ArticleItem,
  itemField: string,
  subItemsField?: string
) => {
  let articleTableItem: ArticleTableItem = {
    id: `${itemField}-${articleItems.id}`,
    item: articleItems.name,
  };
  let articleTableSubItems: ArticleTableItem[] = [];

  const filteredData = articles.filter(
    (article) =>
      (article[itemField as keyof Article] as ArticleItem).id ===
      articleItems.id
  );

  if (subItemsField) {
    const filteredArticleItems = getDistinctAndSortedItems(
      filteredData.map(
        (article) => article[subItemsField as keyof Article] as ArticleItem
      )
    );

    filteredArticleItems.forEach((articleItem) => {
      const subItems = convertArticles(
        filteredData,
        articleItem,
        subItemsField,
        subItemsField === "articleType" ? "legalEntity" : ""
      );
      articleTableSubItems.push(subItems);
    });
  } else {
    articleTableSubItems = filteredData.map(
      (article) =>
        ({
          id: article.id.toString(),
          item: "",
          version: article.version,
          currency: article.currency,
          measure: article.measure,
          value: article.value,
        } as ArticleTableItem)
    );
  }

  articleTableItem.subItems = articleTableSubItems;
  return articleTableItem;
};
