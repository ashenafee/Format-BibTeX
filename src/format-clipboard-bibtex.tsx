import { showToast, Toast, Clipboard } from "@raycast/api";
import { formatBibTeX } from "@/utils/helpers";

/**
 * Formats the BibTeX text from the clipboard and copies the formatted text back to the clipboard.
 * Shows a success or failure toast notification based on the result.
 */
export default async function FormatClipboardBibTeX() {
    try {
        const input = await Clipboard.read();
        const formatted = formatBibTeX(input.text);
        await Clipboard.copy(formatted);
        await showToast({ style: Toast.Style.Success, title: "Formatted BibTeX copied to clipboard" });
    } catch (error) {
        await showToast({
            style: Toast.Style.Failure,
            title: "Failed to format clipboard BibTeX",
            message: error instanceof Error ? error.message : "Unknown error occurred",
        });
    }
}
