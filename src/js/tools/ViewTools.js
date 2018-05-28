window.ViewTools = {
    setFontSize() {
        let fontSize = document.documentElement.clientWidth / 10
        if (fontSize > 44) {
            fontSize = 44
        }
        $("html").css("font-size", fontSize + "px")
    },
    showToast(type, text) {
        new Noty({
            type: type,
            text: text,
            timeout: 3000,
            layout: "topCenter",
            theme: 'bootstrap-v4',
        }).show();
    },
    isPcUser() {
        return window.ontouchstart === undefined
    },
    getClickEventName() {
        if (this.isPcUser()) {
            return "click"
        }
        return "touchend"
    },
}
