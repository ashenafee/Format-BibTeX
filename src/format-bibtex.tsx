import { Action, ActionPanel, Form, showToast, Toast, Clipboard } from "@raycast/api";
import { useState } from "react";
import { formatBibTeX } from "@/utils/helpers";

/**
 * Command component for formatting BibTeX input.
 * Provides a form for the user to input raw BibTeX text, formats it, and copies
 * the formatted text to the clipboard.
 * Shows a success or failure toast notification based on the result.
 */
export default function FormatBibTeX() {
    const [input, setInput] = useState("");

    /**
     * Handles the form submission, formats the input BibTeX text, and copies
     * the formatted text to the clipboard.
     * Shows a success or failure toast notification based on the result.
     */
    const handleSubmit = async () => {
        try {
            const formatted = formatBibTeX(input);
            await Clipboard.copy(formatted);
            await showToast({ style: Toast.Style.Success, title: "Formatted BibTeX copied to clipboard" });
        } catch (error) {
            await showToast({
                style: Toast.Style.Failure,
                title: "Failed to format BibTeX",
                message: error instanceof Error ? error.message : "Unknown error occurred",
            });
        }
    };

    return (
        <Form
            actions={
                <ActionPanel>
                    <Action.SubmitForm onSubmit={handleSubmit} />
                </ActionPanel>
            }
        >
            <Form.TextArea
                id="bibtex"
                title="BibTeX"
                placeholder="Paste BibTeX here..."
                value={input}
                onChange={setInput}
            />
        </Form>
    );
}
