function disableSend() {
    const sendButton = document.getElementById("button");

    sendButton.disabled = true;

    sendButton.innerText = `...שולח`
    sendButton.style.cursor = "not-allowed"
} 