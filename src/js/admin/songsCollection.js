{
    let TOAST_TOOLS = window.ViewTools
    let EVENT_HUB_TOOLS = window.ControllerTools.EVENT_HUB
    let view = {
        el: ".collectionTableWrapper",
        template: `
            <table>
                <thead>
                    <td></td>
                    <td>歌单标题</td>
                    <td>歌单简介</td>
                    <td>封面地址</td>
                    <td>编辑</td>
                </thead>
                <tbody>
                        
                </tbody>
            </table>`,
        render(data) {
            $(this.el).html(this.template)
            for (let i = 0; i < data.length; i++) {
                let item = data[i]
                let newTr = $(`<tr>
                    <td class="songCollectionId">${item.id}</td>
                    <td>${i + 1}</td>
                    <td>${item.title}</td>
                    <td>${item.describe}</td>
                    <td class="songCollectionPhoto">${item.photoPath}</td>
                    <td><button class="btn btn-success edit-songListInfo-btn">编辑</button></td>
                    </tr>`)
                $(this.el).find("tbody").append(newTr)
            }
        },
    }
    let model = {
        data: "",
        fetch() {
            let allSongList = new AV.Query("Playlist")
            return allSongList.find().then((data) => {
                return data.map((element, index) => {
                    let newObj = {id: element.id, ...element.attributes}
                    return newObj
                })
            })
        },
        query(id) {
            let query = new AV.Query('Playlist')
            return query.get(id)
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.model.fetch().then((data) => {
                this.view.render(data)
            }, (error) => {
                TOAST_TOOLS.showToast("error", "歌单信息获取失败")
            })
            this.bindEvents()
        },
        bindEvents() {
            this.bindEditBtns()
        },
        bindEditBtns() {
            $(this.view.el).on("click", ".edit-songListInfo-btn", (e) => {
                let id = $(e.currentTarget).closest("tr").find(".songCollectionId").text()
                this.model.query(id).then((data) => {
                    let newObj = {id: data.id, ...data.attributes}
                    EVENT_HUB_TOOLS.emit("edit-song-list-info", newObj)
                }, (error) => {
                    TOAST_TOOLS.showToast("error", "歌单信息获取失败")
                })

            })
        },
    }
    controller.init(view, model)
}