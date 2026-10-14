function generateQR() {
    const text = document.getElementById("qrText").value;
    const qrCode = document.getElementById("qrCode");

    qrCode.innerHTML = "";

    if (text.trim() === "") {
        alert("Please enter some text");
        return;
    }


    new QRCode(qrCode, {
        text: text,
        width: 200,
        height: 200
    });

    saveToHistory(text);
    displayHistory();
}
function saveToHistory(text) {
    const history =
        JSON.parse(localStorage.getItem("qrHistory")) || [];

    history.push({
        text: text,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("qrHistory", JSON.stringify(history));
}
function displayHistory() {
    const history =
        JSON.parse(localStorage.getItem("qrHistory")) || [];

    const historyDiv = document.getElementById("history");

    if (!historyDiv) return;

    historyDiv.innerHTML = "";

    history.forEach(function (item, index) {
        const div = document.createElement("div");

        div.innerHTML = `
            <p>${item.text}</p>
            <small>${item.date}</small>
            <br>
            <button onclick="reuseQR(${index})">
                Generate Again
            </button>

            <button onclick="deleteHistory(${index})">
                Delete
            </button>

            <hr>
        `;

        historyDiv.appendChild(div);
    });
}
displayHistory();
function deleteHistory(index) {
    const history =
        JSON.parse(localStorage.getItem("qrHistory")) || [];

    history.splice(index, 1);

    localStorage.setItem("qrHistory", JSON.stringify(history));

    displayHistory();
}
function reuseQR(index) {
    const history =
        JSON.parse(localStorage.getItem("qrHistory")) || [];

    if (!history[index]) return;

    const text = history[index].text;

    document.getElementById("qrText").value = text;

    const qrCode = document.getElementById("qrCode");
    qrCode.innerHTML = "";

    new QRCode(qrCode, {
        text: text,
        width: 200,
        height: 200
    });
}