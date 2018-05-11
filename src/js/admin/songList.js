{
    let EVENT_HUB_TOOLS = window.ControllerTools.EVENT_HUB
    let view = {
        el: ".songList",
        $tbody: "",
        template: `
        <div class="title">
                    <h4>已上传的歌曲</h4>
                    <span class="songsNum">__num__首音乐</span>
                </div>
                <div class="songTableWrapper">
                    <table class="songListTable">
                        <thead>
                            <tr>
                                <td></td>
                                <td>音乐标题</td>
                                <td>歌手</td>
                                <td>外链</td>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>`,
        getOneSongTemplate(item) {
            let arr = ["index", "name", "singer", "url"]
            let $tr = $("<tr></tr>")
            $tr.attr("data-songid", item.id)
            $tr.addClass("songItemTR")
            arr.map((value) => {
                $tr.append($("<td></td>").text(`${item[value]}`).attr(`song-td`,`${value}`))
            })
            return $tr
        },
        upDateSongNum() {
            let len = this.$tbody.find("tr").length
            $(this.el).find(".songsNum").text(`${len}首音乐`)
        },
        addOneSong(newObj) {
            let tempHTML = this.getOneSongTemplate(newObj)
            this.$tbody.append(tempHTML)
        },
        render(data) {
            let temp = this.template
            let newData = {num: data.length}
            for (let key in newData) {
                temp = temp.replace(`__${key}__`, newData[key])
            }
            $(this.el).html(temp)
            this.$tbody = $(".songList tbody")
            this.$tbody.empty()
            for (let i = 0; i < data.length; i++) {
                this.$tbody.append(this.getOneSongTemplate(data[i]))
            }
        }
    }
    let model = {
        data: {
            songs: []
        },
        fetch() {
            let allSongs = new AV.Query("Song")
            return allSongs.find().then((data) => {
                return data.map((element, index) => {
                    let newObj = {id: element.id, ...element.attributes}
                    newObj.index = (index + 1)
                    return newObj
                })
            })
        },
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.upDateAllSongs()
            this.listenerToUpdateSongsList()
            this.listenerToEditOneSong()
            this.bindEvents()
        },
        upDateAllSongs() {
            this.model.fetch().then((data) => {
                this.model.data.songs = data
                this.view.render(data)
            }, (error) => {

            })
        },
        listenerToUpdateSongsList() {
            EVENT_HUB_TOOLS.on("updateSongList", (data) => {
                let newObj = JSON.parse(JSON.stringify(data))
                newObj.index = this.view.$tbody.find("tr").length + 1
                this.view.addOneSong(newObj)
                this.model.data.songs.push(newObj)
                this.view.upDateSongNum()
            })
        },
        upDateOneSongTr(data) {
            // 更新表格的数据
            // 更新 model 中的数据
            let $targetTr = $(`[data-songid=${data.id}]`)
            $targetTr.find("td").each((index, element) => {
                let $self = $(element)
                let name = $self.attr("song-td")
                if (data[name]) {
                    $self.text(data[name])
                }
            })
            let allSongs = this.model.data.songs
            for (let i = 0; i < allSongs.length; i++) {
                let item = allSongs[i]
                if (item.id === data.id) {
                    Object.assign(item, data)
                }
            }
        },
        listenerToEditOneSong() {
            EVENT_HUB_TOOLS.on("editOneSong", (data) => {
                let newObj = JSON.parse(JSON.stringify(data))
                this.upDateOneSongTr(newObj)
            })
        },
        bindEvents() {
            $(this.view.el).on("click", ".songItemTR", (e) => {
                let songId = $(e.currentTarget).attr("data-songid")
                let newObj = {type: "编辑", id: songId}
                let allSongs = this.model.data.songs
                for (let i = 0; i < allSongs.length; i++) {
                    let songItem = allSongs[i]
                    if (songItem.id === songId) {
                        Object.assign(newObj, songItem)
                    }
                }
                EVENT_HUB_TOOLS.EVENT_HUB.emit("uploadsuccess", newObj)
            })
        }
    }
    controller.init(view, model)
}