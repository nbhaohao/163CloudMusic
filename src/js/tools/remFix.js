{
    function setFontSize() {
        let fontSize = document.documentElement.clientWidth / 10
        $("html").css("font-size", fontSize + "px")
    }
    setFontSize()
}