import toastEventBus from "primevue/toasteventbus";

/**
 *
 * @param message
 * @param severity
 * @param life
 * @param summary
 */
const toastErrorMessageForm = (message, severity, life, summary) => {
    toastEventBus.emit("add", { severity: severity || "error", detail: message, life: life || 5000, summary: summary || "" });
};

export default toastErrorMessageForm;