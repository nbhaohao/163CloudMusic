{
    let view = {
        el: ".newSongList",
        template: `
            <h2 class="content-title">最新音乐</h2>
            <ul class="ul-newSongItemList"></ul>
        `,
        getOneSongItem(data) {
            let $li = $(`
               <li class="li-songItem">
                        <div class="songInfomation oneLine-moreEllipsis">
                            <div class="songTitle oneLine-moreEllipsis">${data.name}</div>
                            <div class="subTitle oneLine-moreEllipsis">
                                <svg class="icon sqIcon" aria-hidden="true">
                                    <use xlink:href="#icon-sq"></use>
                                </svg>
                              ${data.singer}
                          </div>
                        </div>
                        <div class="playBtnWrapper">
                            <svg class="icon playbtn" aria-hidden="true" data-id="${data.id}">
                                <use xlink:href="#icon-play"></use>
                            </svg>
                        </div>
               </li>                 
            `)
            return $li
        },
        render(data) {
            $(this.el).html(this.template)
            $(this.el).find(".ul-newSongItemList").empty()
            for (let i = 0; i < 5; i++) {
                if (data[i]) {
                    let $LiItem = this.getOneSongItem(data[i])
                    $(this.el).find(".ul-newSongItemList").append($LiItem)
                }
            }
        },
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
                    return newObj
                })
            })
        },
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.model.fetch().then((data) => {
                this.model.data = data
                this.view.render(this.model.data)
                this.bindEvents()
            })
        },
        bindEvents() {
            window.ControllerTools.EVENT_HUB.on("playSong", (data) => {
                window.location.href = `./song.html?id=${data}`
            })
        }
    }
    controller.init(view, model)
}