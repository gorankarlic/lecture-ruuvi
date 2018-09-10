window.addEventListener("load", () =>
{
    let connecting = false;
    const connect = (url) =>
    {
        if(connecting)
        {
            return;
        }
        const connection = new WebSocket(url);
        const reconnect = () =>
        {
            connecting = false;
            setTimeout(connect, 4000, url);
        };
        connection.onclose = reconnect;
        connection.onerror = reconnect;
        connection.onmessage = (message) =>
        {
            const measurement = JSON.parse(message.data);
            for(const key of Object.keys(measurement))
            {
                document.querySelectorAll(`data[value="${key}"]`).forEach((tag) => tag.innerText = measurement[key]);
            }
        };
        connecting = true;
    };
    const url = document.querySelector("[data-url-ws]").dataset.urlWs;
    connect(url);
});