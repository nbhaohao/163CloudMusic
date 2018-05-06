window.NOTIFICATION_TOOLS = {
    showToast: function (type, text) {
        new Noty({
            type: type,
            text: text,
            timeout: 3000,
            layout: "topCenter",
            theme: 'bootstrap-v4',
        }).show();
    }
}
//window.NOTIFICATION_TOOLS.showToast("success", "")
//window.NOTIFICATION_TOOLS.showToast("error", "")