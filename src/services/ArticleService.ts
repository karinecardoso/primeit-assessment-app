import axios from "axios";
import { Article, ArticleFilter, ArticleItem } from "../types/Article";

export async function getArticles(filter?: ArticleFilter) {
  try {
    let url =
      "/articles?_expand=region&_expand=articleType&_expand=legalEntity";

    if (filter) {
      Object.keys(filter).forEach((filterKey) => {
        const filterValue = (filter as any)[filterKey];
        if (filterValue) {
          url += `&${filterKey}=${filterValue}`;
        }
      });
    }

    const { data } = await axios.get<Article[]>(url);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getRegions() {
  try {
    const { data } = await axios.get<ArticleItem[]>("/regions");
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getArticleTypes() {
  try {
    const { data } = await axios.get<ArticleItem[]>("/articleTypes");
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getLegalEntities() {
  try {
    const { data } = await axios.get<ArticleItem[]>("/legalEntities");
    return data;
  } catch (error) {
    console.log(error);
  }
}
