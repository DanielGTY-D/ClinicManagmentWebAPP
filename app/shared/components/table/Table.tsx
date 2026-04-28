import React, { useState, type ChangeEvent } from "react";
import styles from "./Table.module.css";
import Icons from "~/shared/icons/Icons";
import generateUUID from "~/shared/utils/generateUUID";

export interface Filters {
    text: string;
    value: string;
}

interface TableProps<T> {
  onSearch?: (input: string) => void;
  onFilter?: (input: string) => void;
  search: boolean;
  filters?: Filters[];
  children: React.ReactNode;
  inputFilter?: string;
  inputSearch?: string;
}

export default function Table<T>({
  filters,
  onSearch,
   onFilter,
  search,
  children,
  inputFilter,
  inputSearch
}: TableProps<T>) {

  return (
    <div className={styles.usersTable}>
      <div className={styles.header}>
        {search && (
          <div className={styles.search}>
            <input
              className={styles.inputSearch}
              type="search"
              placeholder="Buscar Usuarios"
              name="search"
              id="search"
              value={inputSearch}
              onChange={(e) => onSearch!(e.target.value)}
            />
            <i className={styles.iconSearch}>
              <Icons.searchIcon />
            </i>
          </div>
        )}
        {filters && filters?.length > 0 && (
          <select
            className={styles.filters}
            name="filters"
            value={inputFilter}
            onChange={(e) => onFilter!(e.target.value)}
          >
            {
                filters?.map( filter => (
                    <option value={filter.value} key={generateUUID()}>{filter.text}</option>
                ))
            }
          </select>
        )}
      </div>

      <div className={styles.tableContent}>
        <table className={styles.table}>
            {children}
        </table>
      </div>
    </div>
  );
}
