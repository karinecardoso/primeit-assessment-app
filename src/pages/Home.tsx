import React, { useMemo, useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import Table from "../components/Table/Table";
import {
  getArticles,
  getArticleTypes,
  getLegalEntities,
  getRegions,
} from "../services/ArticleService";
import {
  ArticleFilter,
  ArticleItem,
  ArticleTableItem,
  Currency,
  Measure,
  Version,
} from "../types/Article";
import Filter, { FilterSelect } from "../components/Filter/Filter";
import {
  convertArticles,
  getDistinctAndSortedItems,
  parseSelectOption,
} from "../utils/utils";

function Home() {
  const [data, setData] = useState<ArticleTableItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [regions, setRegions] = useState<ArticleItem[]>([]);
  const [articleTypes, setArticleTypes] = useState<ArticleItem[]>([]);
  const [legalEntities, setLegalEntities] = useState<ArticleItem[]>([]);
  const [filter, setFilter] = useState<ArticleFilter>();

  const fetchData = () => {
    setIsLoading(true);
    getArticles(filter)
      .then((response) => {
        if (response) {
          const tableItems: ArticleTableItem[] = [];
          const regions = getDistinctAndSortedItems(
            response.map((article) => article.region)
          );

          regions.forEach((region) => {
            const articleTableItem = convertArticles(
              response,
              region,
              "region",
              "articleType"
            );
            tableItems.push(articleTableItem);
          });

          setData(tableItems);
        } else {
          setData([]);
        }
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  const fetchFilters = () => {
    getRegions()
      .then((response) => {
        if (response) {
          setRegions(response);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    getArticleTypes()
      .then((response) => {
        if (response) {
          setArticleTypes(response);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    getLegalEntities()
      .then((response) => {
        if (response) {
          setLegalEntities(response);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onFilterChange = (newValue: string | undefined, field: string) => {
    setFilter((prev) => ({
      ...prev,
      [field as keyof ArticleFilter]: newValue,
    }));
  };

  const filterSelects: FilterSelect[] = [
    {
      label: "Region",
      options: parseSelectOption(regions),
      onChange: onFilterChange,
      filterFieldName: "regionId",
    },
    {
      label: "Article",
      options: parseSelectOption(articleTypes),
      onChange: onFilterChange,
      filterFieldName: "articleTypeId",
    },
    {
      label: "Legal Entity",
      options: parseSelectOption(legalEntities),
      onChange: onFilterChange,
      filterFieldName: "legalEntityId",
    },
    {
      label: "Version",
      options: parseSelectOption(Object.values(Version)),
      onChange: onFilterChange,
      filterFieldName: "version",
    },
    {
      label: "Currency",
      options: parseSelectOption(Object.values(Currency)),
      onChange: onFilterChange,
      filterFieldName: "currency",
    },
    {
      label: "Measure",
      options: parseSelectOption(Object.values(Measure)),
      onChange: onFilterChange,
      filterFieldName: "measure",
    },
  ];

  const columns = useMemo<ColumnDef<ArticleTableItem>[]>(
    () => [
      {
        id: "id",
        accessorFn: (row) => row.item,
        header: "",
        cell: ({ row, getValue }) => (
          <div
            className="table__cell__expander"
            style={{
              paddingLeft: `${row.depth * 2}rem`,
            }}
          >
            {row.getCanExpand() && (
              <button
                className="table__cell__toggle--expanded"
                {...{
                  onClick: row.getToggleExpandedHandler(),
                  style: { cursor: "pointer" },
                }}
              >
                {row.getIsExpanded() ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    width="16"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#777"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    width="16"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#777"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                )}
              </button>
            )}

            {getValue<string>()}
          </div>
        ),
      },
      {
        accessorKey: "version",
        header: () => "Version",
      },
      {
        accessorKey: "currency",
        header: () => "Currency",
      },
      {
        accessorKey: "measure",
        header: () => "Measure",
      },
      {
        accessorKey: "value",
        header: () => "Value",
      },
    ],
    []
  );

  useEffect(() => {
    fetchData();
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchData();
  }, [filter]);

  return (
    <>
      <Filter selects={filterSelects} />
      <Table
        columns={columns}
        subRowsField="subItems"
        data={data}
        noDataText="No data available!"
        isLoading={isLoading}
      />
    </>
  );
}

export default Home;
