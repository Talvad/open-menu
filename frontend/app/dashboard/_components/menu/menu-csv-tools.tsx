"use client";

import Papa from "papaparse";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { importItemsAction } from "@/actions/menu";
import { itemCreateSchema } from "@/lib/schemas";
import type { MenuGroup, MenuItem } from "@/lib/types";

const CSV_COLUMNS = [
  "group",
  "name",
  "description",
  "price",
  "tags",
  "available",
  "visible",
  "sortOrder",
  "attributes",
  "variant",
  "extras",
  "schedule",
];

type ImportRow = {
  line: number;
  name: string;
  group: string;
  errors: string[];
  payload?: ReturnType<typeof itemCreateSchema.parse>;
};

type ReadyImportRow = ImportRow & {
  payload: NonNullable<ImportRow["payload"]>;
};

function normalized(value: string) {
  return value.normalize("NFKC").trim().toLocaleLowerCase();
}

function csvBoolean(value: string, field: string) {
  if (!value.trim()) return true;
  const normalizedValue = value.trim().toLowerCase();
  if (["true", "yes", "1"].includes(normalizedValue)) return true;
  if (["false", "no", "0"].includes(normalizedValue)) return false;
  throw new Error(`${field} must be true or false`);
}

function jsonCell(value: string | undefined, field: string, errors: string[]) {
  if (!value?.trim()) return undefined;
  try {
    return JSON.parse(value) as unknown;
  } catch {
    errors.push(`${field} must be valid JSON.`);
    return undefined;
  }
}

function downloadCsv(filename: string, rows: Record<string, unknown>[]) {
  const blob = new Blob([Papa.unparse(rows)], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

export function MenuCsvTools({
  shopId,
  groups,
  items,
}: {
  shopId: string;
  groups: MenuGroup[];
  items: MenuItem[];
}) {
  const router = useRouter();
  const [rows, setRows] = useState<ImportRow[]>([]);
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  const validRows = useMemo(
    () =>
      rows.filter(
        (row): row is ReadyImportRow =>
          row.payload !== undefined && row.errors.length === 0,
      ),
    [rows],
  );
  const invalidCount = rows.length - validRows.length;

  function exportMenu() {
    const groupNames = new Map(groups.map((group) => [group.id, group.name]));
    const data = items.map((item) => ({
      group: groupNames.get(item.groupId) ?? "",
      name: item.name,
      description: item.description,
      price: item.price,
      tags: item.tags.join("|"),
      available: item.available,
      visible: item.visible,
      sortOrder: item.sortOrder,
      attributes: JSON.stringify(item.attributes),
      variant: item.variant ? JSON.stringify(item.variant) : "",
      extras: JSON.stringify(item.extras),
      schedule: item.schedule ? JSON.stringify(item.schedule) : "",
    }));
    downloadCsv("open-menu-items.csv", data);
  }

  function downloadTemplate() {
    downloadCsv("open-menu-template.csv", [
      {
        group: groups[0]?.name ?? "Drinks",
        name: "Filter coffee",
        description: "South Indian style",
        price: "30.00",
        tags: "Vegetarian|Popular",
        available: true,
        visible: true,
        sortOrder: 0,
        attributes: "{}",
        variant: "",
        extras: "[]",
        schedule: "",
      },
    ]);
  }

  async function previewFile(file?: File) {
    setRows([]);
    setMessage("");
    if (!file) return;
    if (file.size > 1_000_000) {
      setMessage("Choose a CSV file smaller than 1 MB.");
      return;
    }

    const parsed = Papa.parse<Record<string, string>>(await file.text(), {
      header: true,
      skipEmptyLines: "greedy",
      transformHeader: (header) => header.trim().toLowerCase(),
    });
    const missingColumns = CSV_COLUMNS.filter(
      (column) => !parsed.meta.fields?.includes(column),
    );
    if (missingColumns.length) {
      setMessage(`Missing CSV columns: ${missingColumns.join(", ")}.`);
      return;
    }
    if (parsed.errors.length) {
      setMessage(
        `Could not read the CSV: ${parsed.errors[0]?.message ?? "invalid format"}.`,
      );
      return;
    }

    const groupByName = new Map(
      groups.map((group) => [normalized(group.name), group]),
    );
    const seen = new Set(
      items.map((item) => `${item.groupId}:${normalized(item.name)}`),
    );

    const preview = parsed.data.map((record, index): ImportRow => {
      const line = index + 2;
      const name = record.name?.trim() ?? "";
      const groupName = record.group?.trim() ?? "";
      const errors: string[] = [];
      const group = groupByName.get(normalized(groupName));

      if (!group) errors.push(`Unknown group “${groupName}”.`);

      let attributes: Record<string, string> = {};
      const rawAttributes = jsonCell(record.attributes, "Attributes", errors);
      if (rawAttributes !== undefined) {
        if (
          !rawAttributes ||
          Array.isArray(rawAttributes) ||
          typeof rawAttributes !== "object" ||
          Object.values(rawAttributes).some(
            (value) => typeof value !== "string",
          )
        ) {
          errors.push("Attributes must be a JSON object with string values.");
        } else {
          attributes = rawAttributes as Record<string, string>;
        }
      }
      const variant = jsonCell(record.variant, "Variant", errors);
      const extras = jsonCell(record.extras, "Extras", errors) ?? [];
      const schedule = jsonCell(record.schedule, "Schedule", errors);

      let available = true;
      let visible = true;
      try {
        available = csvBoolean(record.available ?? "", "Available");
      } catch (error) {
        errors.push(
          error instanceof Error
            ? error.message
            : "Invalid availability value.",
        );
      }
      try {
        visible = csvBoolean(record.visible ?? "", "Visible");
      } catch (error) {
        errors.push(
          error instanceof Error ? error.message : "Invalid visibility value.",
        );
      }

      const tags = (record.tags ?? "")
        .split("|")
        .map((tag) => tag.trim())
        .filter(Boolean);
      const item = itemCreateSchema.safeParse({
        groupId: group?.id ?? "",
        name,
        description: record.description ?? "",
        price: Number(record.price),
        available,
        visible,
        sortOrder: record.sortOrder?.trim() ? Number(record.sortOrder) : 0,
        tags,
        attributes,
        ...(variant !== undefined ? { variant } : {}),
        extras,
        ...(schedule !== undefined ? { schedule } : {}),
      });
      if (!item.success)
        errors.push(...item.error.issues.map((issue) => issue.message));

      if (group && name) {
        const key = `${group.id}:${normalized(name)}`;
        if (seen.has(key)) errors.push("Duplicate item name in this group.");
        seen.add(key);
      }

      return {
        line,
        name,
        group: groupName,
        errors: [...new Set(errors)],
        payload: item.success ? item.data : undefined,
      };
    });

    setRows(preview);
    setMessage(
      `${preview.length} row(s) checked. ${preview.length - preview.filter((row) => row.errors.length).length} ready to import.`,
    );
  }

  async function importMenu(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (invalidCount > 0) {
      setMessage("Fix or remove every flagged row before importing.");
      return;
    }
    if (validRows.length > 49) {
      setMessage("Import up to 49 items at a time to keep this change atomic.");
      return;
    }
    if (validRows.length === 0) {
      setMessage("Choose a CSV file and preview it first.");
      return;
    }

    setPending(true);
    const result = await importItemsAction(
      shopId,
      validRows.map((row) => row.payload),
    );
    setPending(false);

    if (result.error) {
      setMessage(result.error);
      return;
    }
    if (result.imported === undefined) {
      setMessage(
        "The import response was incomplete. Refresh your menu before retrying.",
      );
      return;
    }
    setRows([]);
    setMessage(`${result.imported} item(s) imported.`);
    router.refresh();
  }

  return (
    <section className="rounded-2xl border border-[#e6ddd0] bg-paper p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-bricolage text-xl font-bold text-forest">
            Move a menu in bulk
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-[#625f55]">
            Download a template or export your current menu. Imports are
            additive: existing items are never overwritten.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={downloadTemplate}
            className="rounded-full border border-forest/20 px-4 py-2 text-sm font-semibold text-forest hover:bg-background"
          >
            CSV template
          </button>
          <button
            type="button"
            onClick={exportMenu}
            className="rounded-full border border-forest/20 px-4 py-2 text-sm font-semibold text-forest hover:bg-background"
          >
            Export menu
          </button>
        </div>
      </div>

      <form onSubmit={importMenu} className="mt-4 space-y-3">
        <label
          className="block text-sm font-semibold text-forest"
          htmlFor="menu-csv"
        >
          Import a CSV file
        </label>
        <input
          id="menu-csv"
          type="file"
          accept=".csv,text/csv"
          onChange={(event) => void previewFile(event.currentTarget.files?.[0])}
          className="block w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-[#e5eadf] file:px-4 file:py-2 file:font-semibold file:text-forest"
        />
        <p className="text-xs leading-5 text-[#625f55]">
          Required columns: group, name, price. Separate tags with |. Enter
          attributes, variant, extras, and schedule as JSON. Up to 49 items per
          import.
        </p>

        {rows.length > 0 && (
          <div className="overflow-x-auto rounded-xl border border-[#e6ddd0]">
            <table className="w-full min-w-lg text-left text-sm">
              <thead className="bg-background text-xs uppercase tracking-wide text-[#625f55]">
                <tr>
                  <th className="px-3 py-2">Row</th>
                  <th className="px-3 py-2">Item</th>
                  <th className="px-3 py-2">Group</th>
                  <th className="px-3 py-2">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6ddd0]">
                {rows.slice(0, 100).map((row) => (
                  <tr key={row.line}>
                    <td className="px-3 py-2 tabular-nums">{row.line}</td>
                    <td className="px-3 py-2">{row.name || "—"}</td>
                    <td className="px-3 py-2">{row.group || "—"}</td>
                    <td className="px-3 py-2">
                      {row.errors.length ? (
                        <span className="text-red-800">
                          {row.errors.join(" ")}
                        </span>
                      ) : (
                        <span className="font-semibold text-forest">Ready</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {rows.length > 100 && (
              <p className="border-t border-[#e6ddd0] px-3 py-2 text-xs text-[#625f55]">
                Showing the first 100 rows. All rows are still validated.
              </p>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={pending || validRows.length === 0 || invalidCount > 0}
            className="rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-paper hover:bg-[#19382e] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending ? "Importing…" : `Import ${validRows.length} item(s)`}
          </button>
          <p className="text-sm text-[#625f55]" aria-live="polite">
            {message}
          </p>
        </div>
      </form>
    </section>
  );
}
