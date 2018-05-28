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
                        <p class="flexwrapper" style="justify-content: flex-end;"><button class="btn btn-primary btn-addNewSong-collection">添加歌曲</button></p>
                        <span class="span-c-songListStatus">__songListDetails__</span>
                        <table class="table-c-currentSongList-in">
                            <thead>
                                <tr>
                                    <td>序号</td>
                                    <td>歌名</td>
                                    <td>歌手</td>
                                    <td>删除</td>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <div class="footer-wrapper">
                        <button class="btn btn-success btn-saveNewSongCollection">保存</button>
                        <button class="btn btn-secondary closeModal">取消</button>
                    </div>
                </div>
            </div>`,
        render(data) {
            let forArr = "id title describe photoPath".split(" ")
            let temp = this.template
            let flag = true
            forArr.map((value) => {temp = temp.replace(`__${value}__`, data[value] || "")})
            this.upDateTableInfo(data.songListDetails)
            if (data.songListDetails.length === 0) {
                temp = temp.replace(`__songListDetails__`, "暂无歌曲")
                flag = false
            } else {
                temp = temp.replace(`__songListDetails__`, "歌曲列表")
            }
            $(this.el).append(temp)
            if (flag) {
                let tbody = $(this.el).find(".editSongCollectionModal .table-c-currentSongList-in tbody")
                for (let i = 0; i < data.songListDetails.length; i++) {
                    let item = data.songListDetails[i]
                    let $tr = $(`<tr>
                    <td class="id-td" hidden>${item.id}</td>
                    <td>${i + 1}</td>
                    <td>${item.name}</td>
                    <td>${item.singer}</td>
                    <td><button class="btn btn-danger btn-remove-this-song">删除</button></td>
                </tr>`)
                    tbody.append($tr)
                }
                $(this.el).find(".editSongCollectionModal .table-c-currentSongList-in").addClass("active")
            } else {
                $(this.el).find(".editSongCollectionModal .table-c-currentSongList-in").removeClass("active")
            }
        },
        upDateTableInfo(data) {
            let table = $(this.el).find(".editSongCollectionModal .table-c-currentSongList-in")
            let statusSpan = $(this.el).find(".span-c-songListStatus")
            if (!table.hasClass("active")) {
                table.addClass("active")
                statusSpan.text("歌曲列表")
            }
            for (let i = 0; i < data.length; i++) {
                let item = data[i]
                let flag = true
                let allIds = $(".editSongCollectionModal .table-c-currentSongList-in tbody .id-td")
                for (let j = 0; j < allIds.length; j++) {
                    let oldItem = $(allIds[j]).text()
                    if (oldItem === item.id) {
                        flag = false
                        break
                    }
                }
                if (!flag) {continue}
                let $tr = $(`<tr>
                    <td class="id-td" hidden>${item.id}</td>
                    <td>${i + 1}</td>
                    <td>${item.name}</td>
                    <td>${item.singer}</td>
                    <td><button class="btn btn-danger btn-remove-this-song">删除</button></td>
                </tr>`)
                table.find("tbody").append($tr)
            }
        },
    }
    let model = {
        data: {
            "id": "",
            "title": "",
            "describe": "",
            "photoPath": "",
            "songListDetails": [],
        },
        removeIndexSong(id) {
            let index
            for (let i = 0; i < this.data.songListDetails.length; i++) {
                if (this.data.songListDetails[i].id === id) {
                    index = i
                    break
                }
            }
            this.data.songListDetails.splice(index, 1)
        },
        updataSongCollection() {
            var todo = AV.Object.createWithoutData('Playlist', this.data.id)
            // 修改属性
            todo.set(this.data)
            // 保存到云端
            return todo.save()
        },
        updataSongsStatus() {
            var query = new AV.Query('Song')
            return query.find()
        },
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.$View = $(this.view.el)
            this.model = model
            EVENT_HUB_TOOLS.on("edit-song-list-info", (data) => {
                Object.assign(this.model.data, data)
                this.view.render(data)
            })
            EVENT_HUB_TOOLS.on("updateSongCollection-songList", (data) => {
                allSong:
                for (let i = 0; i < data.length; i++) {
                    let newItem = data[i]
                    let flag = true
                    for (let j = 0; j < this.model.data.songListDetails.length; j++) {
                        let oldItem = this.model.data.songListDetails[j]
                        if (oldItem.id === newItem.id) {
                            flag = false
                            break
                        }
                    }
                    if (flag) {
                        this.model.data.songListDetails.push(newItem)
                    }
                }
                this.view.upDateTableInfo(this.model.data.songListDetails)
            })
            this.bindEvents()
        },
        bindEvents() {
            this.bindCloseViewBtn()
            this.bindSaveBtn()
            this.bindAddNewSongBtn()
            this.bindRemoveBtn()
        },
        bindRemoveBtn() {
          this.$View.on("click", ".btn-remove-this-song", (e) => {
              let $parentTr = $(e.currentTarget).closest("tr")
              let id = $parentTr.find("id-td").text()
              this.model.removeIndexSong(id)
              $parentTr.remove()
              if (this.model.data.songListDetails.length === 0) {
                  this.$View.find(".span-c-songListStatus").text("暂无歌曲")
                  this.$View.find(".editSongCollectionModal .table-c-currentSongList-in").removeClass("active")
              }
          })
        },
        bindAddNewSongBtn() {
            this.$View.on("click", ".btn-addNewSong-collection", (e) => {
                EVENT_HUB_TOOLS.emit("show-all-song-list", "")
            })
        },
        bindCloseViewBtn() {
            this.$View.on("click", ".editSongCollectionModal .closeModal", (e) => {
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
            this.$View.on("click", ".btn-saveNewSongCollection", (e) => {
                let showModel = this.$View.find(".editSongCollectionModal")
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
                if(this.model.data.songListDetails.length === 0) {
                    TOAST_TOOLS.showToast("error", "请至少添加一首歌曲")
                    return
                }
                if (flag) {
                    Object.assign(this.model.data, newDataObj)
                    this.model.updataSongCollection()
                        .then((data) => {
                            return this.model.updataSongsStatus()
                        },(error) => {
                            TOAST_TOOLS.showToast("error", "保存出错")
                            Promise.reject("保存出错")
                        })
                        .then((data) => {
                            let currentSongs = this.model.data.songListDetails
                            for (let j = 0; j < data.length; j++) {
                                let newItem = data[j]
                                for (let i = 0; i < currentSongs.length; i++) {
                                    let item = currentSongs[i]
                                    if (newItem.id === item.id) {
                                        newItem.set("toCollection", this.model.data.id)
                                    }
                                }
                            }
                            return AV.Object.saveAll(data)
                        },(error) => {
                            TOAST_TOOLS.showToast("error", error)
                            Promise.reject("保存出错")
                        })
                        .then((data) => {
                            TOAST_TOOLS.showToast("success", "保存成功")
                            this.removeView()
                            EVENT_HUB_TOOLS.emit("update-one-tr", this.model.data)
                        },(error) => {
                            TOAST_TOOLS.showToast("error", "保存出错")
                        })

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