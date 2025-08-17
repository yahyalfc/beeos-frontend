import { toast } from "sonner";

interface CopyToClipboardParams {
  value: string;
  successMessage?: string;
  errorMessage?: string;
}

/**
 * Copies text to clipboard with proper error handling and fallback support
 * @param {CopyToClipboardParams} params - Configuration object
 * @param {string} params.value - The text value to copy to clipboard
 * @param {string} [params.successMessage] - Custom success message for toast notification
 * @param {string} [params.errorMessage] - Custom error message for toast notification
 * @returns {Promise<boolean>} - Returns true if copy was successful, false otherwise
 */
export async function copyToClipboard({
  value,
  successMessage = "Copied to clipboard",
  errorMessage = "Failed to copy to clipboard",
}: CopyToClipboardParams): Promise<boolean> {
  // Early return for empty values
  if (!value && value !== "0") {
    console.warn("copyToClipboard: No value provided");
    return false;
  }

  // Convert non-string values to string
  const textToCopy = String(value);

  try {
    // Modern clipboard API (preferred method)
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(textToCopy);
      toast.success(successMessage);
      return true;
    }

    // Fallback method for older browsers or non-secure contexts
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    textArea.setAttribute("readonly", "");

    document.body.appendChild(textArea);

    // iOS specific handling
    if (/ipad|iphone/i.exec(navigator.userAgent)) {
      const range = document.createRange();
      range.selectNodeContents(textArea);
      const selection = window.getSelection();

      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }

      textArea.setSelectionRange(0, 999999);
    } else {
      textArea.select();
    }

    // eslint-disable-next-line sonarjs/deprecation
    const success = document.execCommand("copy");
    document.body.removeChild(textArea);

    if (success) {
      toast.success(successMessage);
      return true;
    } else {
      throw new Error("execCommand failed");
    }
  } catch (error) {
    console.error("copyToClipboard error:", error);
    toast.error(errorMessage);
    return false;
  }
}
