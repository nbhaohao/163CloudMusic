{
    let EVENT_HUB_TOOLS = window.EVENT_HUB
    let view = {
        el: ".songList",
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
                        <tbody>__songs__</tbody>
                    </table>
                </div>`,
        getOneSongTemplate(item) {
            return `<tr><td>${item.index}</td><td>${item.name}</td><td>${item.singer}</td><td>${item.url}</td></tr>`
        },
        render(data) {
            let temp = this.template
            let newData = {songs: "", num: data.length}
            for (let i = 0; i < data.length; i++) {
                newData.songs += this.getOneSongTemplate(data[i])
            }
            for (let key in newData) {
                temp = temp.replace(`__${key}__`, newData[key])
            }
            $(this.el).html(temp)
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
                    let newObj = element.attributes
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
                let newObj = data
                let $tbody = $(this.view.el).find("tbody")
                newObj.index = $tbody.find("tr").length + 1
                $(this.view.el).find(".songsNum").text(`${newObj.index}首音乐`)
                let tempHTML = this.view.getOneSongTemplate(newObj)
                $tbody.append(tempHTML)
            })
        },
    }
    controller.init(view, model)
}