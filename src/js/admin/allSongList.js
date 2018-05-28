{
    let TOAST_TOOLS = window.ViewTools
    let EVENT_HUB_TOOLS = window.ControllerTools.EVENT_HUB
    let view = {
        el: ".page",
        template: `<div class="allSongList-wrapper animated fadeIn">
                <div class="allSongListModal animated slideInUp">
                    <div class="header-wrapper">
                        <h4>全部歌曲</h4>
                        <svg class="icon closeModal" aria-hidden="true">
                        <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>
                    <div class="body-wrapper">
                        <table class="table-c-currentSongList-in">
                            <thead>
                                <tr>
                                    <td>操作</td>
                                    <td>序号</td>
                                    <td>歌名</td>
                                    <td>歌手</td>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <div class="footer-wrapper">
                        <button class="btn btn-success btn-chooseNewCollection-song">确定</button>
                        <button class="btn btn-secondary closeModal">取消</button>
                    </div>
                </div>
            </div>`,
        render(data) {
            $(this.el).append(this.template)
            let tbody = $(this.el).find(".allSongList-wrapper .table-c-currentSongList-in tbody")
            for(let i = 0; i < data.length; i++) {
                let item = data[i]
                let $newTr = $(`<tr><td><input type='checkbox' class='input-c-pickSong'></td>
                    <td class="id-td" hidden>${item.id}</td>
                    <td>${i + 1}</td>
                    <td class="name-td">${item.name}</td>
                    <td class="singer-td">${item.singer}</td>
                </tr>`)
                tbody.append($newTr)
            }
        },
    }
    let model = {
        data: [],
        fetch() {
            let allSongs = new AV.Query("Song")
            return allSongs.find().then((data) => {
                return data.map((element, index) => {
                    let newObj = {id: element.id, ...element.attributes}
                    return newObj
                })
            })
        },
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.$View = $(this.view.el)
            this.model = model
            EVENT_HUB_TOOLS.on("show-all-song-list", (data) => {
                this.model.fetch().then((data) => {
                    this.view.render(data)
                }, (error) => {
                    TOAST_TOOLS.showToast("error", "获取歌曲列表信息失败")
                })
            })
            this.bindEvents()
        },
        bindEvents() {
            this.bindCloseViewBtn()
            this.bindConfirmBtn()
        },
        bindConfirmBtn() {
            this.$View.on("click", ".btn-chooseNewCollection-song", (e) => {
                let allSongs = $(".input-c-pickSong:checked")
                if (allSongs.length === 0) {
                    TOAST_TOOLS.showToast("error", "请至少选择一项歌曲")
                    return
                }
                let result = []
                for (let i = 0; i < allSongs.length; i++) {
                    let $item = $(allSongs[i])
                    let $tr = $item.closest("tr")
                    let newObj = {
                        name: $tr.find(".name-td").text(),
                        id: $tr.find(".id-td").text(),
                        singer: $tr.find(".singer-td").text(),
                    }
                    result.push(newObj)
                }
                EVENT_HUB_TOOLS.emit("updateSongCollection-songList", result)
                this.removeView()
            })
        },
        bindCloseViewBtn() {
            this.$View.on("click", ".allSongListModal .closeModal", (e) => {
                this.removeView()
            })
        },
        removeView() {
            let showModel = this.$View.find(".allSongList-wrapper")
            showModel.removeClass("fadeIn").addClass("fadeOut")
            showModel.find(".allSongListModal").removeClass("slideInUp").addClass("slideOutUp")
                .one("animationend", function(e) {
                    showModel.remove()
            })
        }
    }
    controller.init(view, model)
}