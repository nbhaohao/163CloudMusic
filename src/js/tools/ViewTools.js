window.ViewTools = {
    setFontSize() {
        let fontSize = document.documentElement.clientWidth / 10
        $("html").css("font-size", fontSize + "px")
    },
    showToast: function (type, text) {
        new Noty({
            type: type,
            text: text,
            timeout: 3000,
            layout: "topCenter",
            theme: 'bootstrap-v4',
        }).show();
    },
}