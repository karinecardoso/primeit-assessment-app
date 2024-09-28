export interface Article {
    id: number;
    region: ArticleItem;
    articleType: ArticleItem;
    legalEntity: ArticleItem;
    version: string;
    currency: string;
    measure: string;
    value: number;
  }
  
  export interface ArticleItem {
    id: string;
    name: string;
  }

  export interface ArticleFilter {
    regionId?: number;
    articleTypeId?: number;
    legalEntityId?: number;
    version?: string;
    currency?: string;
    measure?: string;
}

export interface ArticleTableItem {
  id: string;
  item: string;
  version?: string;
  currency?: string;
  measure?: string;
  value?: number;
  subItems?: ArticleTableItem[];
}