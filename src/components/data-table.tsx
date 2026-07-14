"use client";

import { useState, useMemo, useCallback } from "react";
import SearchBar from "./search-bar";
import { Inbox } from "lucide-react";

// ─── Column Definition ────────────────────────────────────────
export interface Column<T> {
  /** Key from the data object, or "action" for a custom action column */
  key: keyof T | "action";
  /** Column header label */
  label: string;
  /** Optional custom render function */
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T extends { id: string | number }> {
  /** Table title (e.g. "Recent Applications") */
  title: string;
  /** Column definitions */
  columns: Column<T>[];
  /** Data rows */
  data: T[];
  /** Fields to search against (subset of T keys) */
  searchableFields?: (keyof T)[];
  /** Show loading skeleton */
  loading?: boolean;
}

/**
 * DataTable — generic, reusable table with navy header, search, and responsive behavior.
 * - Desktop: full table layout
 * - Mobile: horizontally scrollable
 */
export default function DataTable<T extends { id: string | number }>({
  title,
  columns,
  data,
  searchableFields = [],
  loading = false,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // ─── Filtered data ─────────────────────────────────────────
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;

    const query = searchQuery.toLowerCase();
    return data.filter((row) =>
      searchableFields.some((field) => {
        const val = row[field];
        return typeof val === "string" && val.toLowerCase().includes(query);
      }),
    );
  }, [data, searchQuery, searchableFields]);

  // ─── Loading state ─────────────────────────────────────────
  if (loading) {
    return (
      <div className='bg-surface rounded-xl border border-border shadow-card overflow-hidden animate-fade-in'>
        <div className='px-6 py-4 flex items-center justify-between border-b border-border'>
          <div className='skeleton h-6 w-40' />
          <div className='skeleton h-9 w-48' />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className='px-6 py-4 border-b border-border-light flex gap-6'
          >
            {columns.map((_, j) => (
              <div key={j} className='skeleton h-4 w-24 flex-1' />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className='bg-surface rounded-xl border border-border shadow-card overflow-hidden animate-fade-in'>
      {/* ── Title Row + Search ─────────────────────────────────── */}
      <div className='px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3'>
        <h2 className='text-lg font-semibold text-text-primary'>{title}</h2>
        {searchableFields.length > 0 && <SearchBar onSearch={handleSearch} />}
      </div>

      {/* ── Table ──────────────────────────────────────────────── */}
      <div className='overflow-x-auto'>
        <table className='w-full min-w-[600px]'>
          {/* Header */}
          <thead>
            <tr className='bg-primary'>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className='px-6 py-3 text-left text-sm font-semibold text-white first:rounded-tl-none last:rounded-tr-none'
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className='px-6 py-16 text-center'>
                  <div className='flex flex-col items-center gap-3 text-text-muted'>
                    <Inbox size={40} strokeWidth={1.5} />
                    <p className='text-sm font-medium'>No results found</p>
                    <p className='text-xs'>
                      Try adjusting your search or filters.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredData.map((row, rowIdx) => (
                <tr
                  key={row.id}
                  className={`
                    border-b border-border-light hover:bg-surface-hover
                    transition-colors duration-150
                    ${rowIdx % 2 === 1 ? "bg-surface-alt/50" : ""}
                  `}
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className='px-6 py-3.5 text-sm text-text-primary'
                    >
                      {col.render
                        ? col.render(row)
                        : col.key !== "action"
                          ? String(row[col.key as keyof T] ?? "")
                          : null}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
