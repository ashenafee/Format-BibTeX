export interface BibTeXEntry {
    type: string;
    citationKey: string;
    fields: { [key: string]: string };
}

export interface Preferences {
    autoPaste: boolean;
    indentation: string;
}