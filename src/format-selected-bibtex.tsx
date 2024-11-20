import { showToast, Toast, Clipboard, getSelectedText } from "@raycast/api";
import { formatBibTeX } from "@/utils/helpers";

/**
 * Formats the selected BibTeX text and copies the formatted text to the clipboard.
 * Shows a success or failure toast notification based on the result.
 */
export default async function FormatSelectedBibTeX() {
    try {
        const input = await getSelectedText();
        const formatted = formatBibTeX(input);
        await Clipboard.copy(formatted);
        await showToast({ style: Toast.Style.Success, title: "Formatted BibTeX copied to clipboard" });
    } catch (error) {
        await showToast({
            style: Toast.Style.Failure,
            title: "Failed to format selected BibTeX",
            message: error instanceof Error ? error.message : "Unknown error occurred",
        });
    }
}
