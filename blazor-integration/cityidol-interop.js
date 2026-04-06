// cityidol-interop.js
// Скопируйте этот файл в wwwroot/ вашего Blazor проекта

let _dotNetRef = null;
let _frameId = null;

/**
 * Инициализирует мост между Blazor и React (CITYIDOL)
 * @param {DotNetObjectReference} dotNetRef - ссылка на Blazor-компонент
 * @param {string} frameId - id элемента iframe
 */
export function initCityIdolBridge(dotNetRef, frameId) {
    _dotNetRef = dotNetRef;
    _frameId = frameId;

    window.addEventListener("message", handleMessage);
}

/**
 * Обрабатывает postMessage от React-приложения CITYIDOL
 */
function handleMessage(event) {
    if (!event.data || event.data.source !== "cityidol") return;

    const { type, payload } = event.data;

    if (type === "PAYMENT_CONFIRMED" && _dotNetRef) {
        _dotNetRef.invokeMethodAsync(
            "HandlePaymentConfirmed",
            payload.planName,
            payload.amount
        );
    }
}

/**
 * Скроллит React-приложение к нужной секции
 * @param {string} frameId - id iframe
 * @param {string} section - id секции (без #)
 */
export function scrollCityIdolTo(frameId, section) {
    const frame = document.getElementById(frameId);
    if (!frame || !frame.contentWindow) return;

    frame.contentWindow.postMessage(
        { source: "blazor", type: "SCROLL_TO", payload: { section } },
        "*"
    );

    // Также меняем hash в src
    const url = new URL(frame.src);
    url.hash = "#" + section;
    frame.src = url.toString();
}

/**
 * Удаляет слушатели при dispose компонента
 */
export function destroyCityIdolBridge() {
    window.removeEventListener("message", handleMessage);
    _dotNetRef = null;
    _frameId = null;
}
