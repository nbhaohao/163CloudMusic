{
    let TOAST_TOOLS = window.ViewTools
    let EVENT_HUB_TOOLS = window.ControllerTools.EVENT_HUB
    let view = {
        el: ".page",
        template: `<div class="editSongCollection-wrapper animated fadeIn" data-songid="__id__">
                <div class="editSongCollectionModal animated bounceIn">
                    <div class="header-wrapper">
                        <h4>编辑歌单</h4>
                        <svg class="icon closeModal" aria-hidden="true">
                        <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>
                    <div class="body-wrapper">
                        <p class="flexwrapper"><span>歌单标题：</span><input title="歌单标题" song-name="title" type="text" value="__title__" class="form-control"></p>
                        <p class="flexwrapper"><span>封面链接：</span><input title="封面链接" song-name="photoPath" type="text" value="__photoPath__" class="form-control"></p>
                        <p class="flexwrapper"><span>歌单描述：</span>
                            <textarea title="歌单描述" song-name="describe" rows="4" class="form-control">__describe__</textarea>
                        </p>
                        <span>歌曲列表：</span>
                        <table></table>
                    </div>
                    <div class="footer-wrapper">
                        <button class="btn btn-success btn-saveNewSong">保存</button>
                        <button class="btn btn-secondary closeModal">取消</button>
                    </div>
                </div>
            </div>`,
        render(data) {
            let forArr = "id title describe photoPath songsList".split(" ")
            let temp = this.template
            forArr.map((value) => {temp = temp.replace(`__${value}__`, data[value] || "")})
            $(this.el).append(temp)
        },
    }
    let model = {
        data: {
            "title": "",
            "describe": "",
            "photoPath": "",
            "songsList": "",
        },
        upDateSong(id) {
            var song = AV.Object.createWithoutData('Song', id);
            return song.save(this.data)
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.$View = $(this.view.el)
            this.model = model
            EVENT_HUB_TOOLS.on("edit-song-list-info", (data) => {
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
        editThisSong(id) {
            this.model.upDateSong(id).then((object) => {
                TOAST_TOOLS.showToast("success", "歌曲修改成功！")
                this.removeView()
                EVENT_HUB_TOOLS.emit("editOneSong", {id:object.id, ...object.attributes})
            }, (error) => {
                TOAST_TOOLS.showToast("error", "歌曲修改失败")
                this.removeView()
            })
        },
        bindSaveBtn() {
            this.$View.on("click", ".btn-saveNewSong", (e) => {
                let showModel = this.$View.find(".addOrEditSongModal-wrapper")
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
                    let editId = showModel.attr("data-songid")
                    if (editId) {
                        this.editThisSong(editId)
                        return
                    }
                    this.addNewSonng()
                }
            })
        },
        removeView() {
            let showModel = this.$View.find(".editSongCollection-wrapper")
            showModel.removeClass("fadeIn").addClass("fadeOut")
            showModel.find(".editSongCollectionModal").removeClass("bounceIn").addClass("bounceOut")
                .one("animationend", function(e) {
                    showModel.remove()
            })
        }
    }
    controller.init(view, model)
}