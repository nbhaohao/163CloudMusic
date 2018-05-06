{
    let TOAST_TOOLS = window.NOTIFICATION_TOOLS
    let EVENT_HUB_TOOLS = window.EVENT_HUB
    let view = {
        el: ".page",
        template: `<div class="addOrEditSongModal-wrapper">
                <div class="addOrEditSongModal animated bounceIn">
                    <div class="header-wrapper">
                        <h4>新增/编辑歌曲</h4>
                        <svg class="icon closeModal" aria-hidden="true">
                        <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>
                    <div class="body-wrapper">
                        <p class="flexwrapper"><span>歌曲名称：</span><input title="歌曲名称" song-name="name" type="text" value="__name__" class="form-control"></p>
                        <p class="flexwrapper"><span>歌手：</span><input title="歌手" song-name="singer" type="text" class="form-control"></p>
                        <p class="flexwrapper"><span>外链：</span><input title="外链" song-name="url" type="text" value="__link__" class="form-control"></p>
                    </div>
                    <div class="footer-wrapper">
                        <button class="btn btn-success btn-saveNewSong">保存</button>
                        <button class="btn btn-secondary closeModal">取消</button>
                    </div>
                </div>
            </div>`,
        render(data) {
            var temp = this.template
            for (let key in data) {
                temp = temp.replace(`__${key}__`, data[key])
            }
            $(this.el).append(temp)
        },
    }
    let model = {
        data: {
            "name": "",
            "singer": "",
            "url": "",
        },
        addNewSong() {
            var SongObject = AV.Object.extend('Song');
            var testObject = new SongObject();
            return testObject.save(this.data)
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.$View = $(this.view.el)
            this.model = model
            EVENT_HUB_TOOLS.on("uploadsuccess", (data) => {
                this.view.render(data)
            })
            this.bindEvents()
        },
        bindEvents() {
            this.bindCloseViewBtn()
            this.bindSaveBtn()
        },
        bindCloseViewBtn() {
            this.$View.on("click", ".closeModal", (e) => {
                this.removeView()
            })
        },
        bindSaveBtn() {
            this.$View.on("click", ".btn-saveNewSong", (e) => {
                let showModel = this.$View.find(".addOrEditSongModal-wrapper .addOrEditSongModal")
                let allInputs = showModel.find("[song-name]")
                let newDataObj = {}
                let flag = true
                for (let i = 0; i < allInputs.length; i++) {
                    let inputItem = allInputs[i]
                    if (inputItem.value.trim() === "") {
                        TOAST_TOOLS.showToast("error", inputItem.title + "不得为空")
                        flag = false
                        break
                    }
                    newDataObj[$(inputItem).attr("song-name")] = inputItem.value
                }
                if (flag) {
                    this.model.data = newDataObj
                    this.model.addNewSong().then((object) => {
                        TOAST_TOOLS.showToast("success", "歌曲保存成功！")
                        this.removeView()
                        EVENT_HUB_TOOLS.emit("updateSongList", object.attributes)
                    }, (error) => {
                        TOAST_TOOLS.showToast("success", "歌曲保存失败")
                        this.removeView()
                    })
                }
            })
        },
        removeView() {
            let showModel = this.$View.find(".addOrEditSongModal-wrapper")
            showModel.find(".addOrEditSongModal").removeClass("bounceIn").addClass("bounceOut")
                .one("animationend", function(e) {
                    showModel.remove()
            })
        }
    }
    controller.init(view, model)
}