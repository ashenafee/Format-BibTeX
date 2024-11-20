import { getPreferenceValues } from "@raycast/api";
import { BibTeXEntry, Preferences } from "@/types";

/**
 * Formats a BibTeX string into a structured and formatted string.
 *
 * @param {string} input - The raw BibTeX string to format.
 * @returns {string} - The formatted BibTeX string.
 * @throws {Error} - Throws an error if the input cannot be parsed or formatted.
 */
export const formatBibTeX = (input: string): string => {
    const { indentation } = getPreferenceValues<Preferences>();

    try {
        // Parse BibTeX string into structured data
        const entries = parseBibTeX(input);

        // Format each entry
        return entries.map(entry => formatEntry(entry, indentation)).join("\n\n");
    } catch (error) {
        throw new Error(`Failed to format BibTeX: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
};

/**
 * Parses a raw BibTeX string into an array of BibTeXEntry objects.
 *
 * @param {string} input - The raw BibTeX string to parse.
 * @returns {BibTeXEntry[]} - An array of parsed BibTeX entries.
 */
export const parseBibTeX = (input: string): BibTeXEntry[] => {
    const entries: BibTeXEntry[] = [];
    const entryRegex = /@(\w+)\s*{\s*([^,]*),\s*((?:[^{}]*|{[^{}]*})*)\s*}/g;
    const fieldRegex = /(\w+)\s*=\s*[{"]([^}"]*)[}"]/g;

    let match;
    while ((match = entryRegex.exec(input)) !== null) {
        const [, type, citationKey, fieldsStr] = match;
        const fields: { [key: string]: string } = {};

        let fieldMatch;
        while ((fieldMatch = fieldRegex.exec(fieldsStr)) !== null) {
            const [, key, value] = fieldMatch;
            fields[key.toLowerCase()] = value;
        }

        entries.push({ type, citationKey, fields });
    }

    return entries;
};

/**
 * Formats a single BibTeX entry into a string.
 *
 * @param {BibTeXEntry} entry - The BibTeX entry to format.
 * @param {string} indent - The indentation string to use.
 * @returns {string} - The formatted BibTeX entry string.
 */
export const formatEntry = (entry: BibTeXEntry, indent: string): string => {
    const formattedFields = Object.entries(entry.fields)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, value]) => `${indent}${key} = {${value}}`)
        .join(",\n");

    return `@${entry.type}{${entry.citationKey},\n${formattedFields}\n}`;
};
