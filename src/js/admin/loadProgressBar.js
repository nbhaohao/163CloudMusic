{
    let view = {
        el: "footer",
        template: `
            <span>__songName__ __result__ __percent__</span>        
        `,
        render(data) {
            let keys = Object.keys(data)
            let tempHTML = this.template
            keys.map((item) => {
                tempHTML = tempHTML.replace(`__${item}__`, data[item] || "")
            })
            $(this.el).find(".loadInfoWrapper").html(tempHTML)
        }
    }
    let model = {
        data: {
            songName: "",
            percent: "",
            result: "",
        },
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.listenToAddNewSong()
            this.view.render(this.model.data)
            this.progressbarView = $(this.view.el).find(".progress-bar")
        },
        listenToAddNewSong() {
            window.EVENT_HUB.on("addNewSongProgress", (data) => {
                this.model.data.songName = data.files[data.files.length - 1].name
                this.model.data.percent = data.total.percent + "%"
                if (this.model.data.percent === "100%") {
                    this.model.data.result = "上传完毕"
                    this.model.data.percent = ""
                    //this.progressbarView.removeClass("progress-bar-animated").removeClass("progress-bar-striped")
                    this.progressbarView.css("width", "0%")
                    this.progressbarView.parent().addClass("active")
                } else {
                    this.model.data.result = "上传中"
                    this.progressbarView.parent().removeClass("active")
                    //this.progressbarView.addClass("progress-bar-animated").addClass("progress-bar-striped")
                }
                this.view.render(this.model.data)
                this.progressbarView.css("width", this.model.data.percent)
            })
        },
    }
    controller.init(view, model)
}