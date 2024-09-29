export interface Article {
  id: number;
  region: ArticleItem;
  articleType: ArticleItem;
  legalEntity: ArticleItem;
  version: Version;
  currency: Currency;
  measure: Measure;
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

export enum Version {
  Actual = "Actual",
  Budget = "Budget",
}

export enum Currency {
  LC = "LC",
  USD = "USD",
  EUR = "EUR",
}

export enum Measure {
  Units = "Units",
  UnitPrice = "Unit Price",
  GrossRevenue = "Gross Revenue",
}
