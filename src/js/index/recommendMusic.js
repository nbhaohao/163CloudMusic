{
    let ControllerTools = window.ControllerTools
    let isPc = window.ViewTools.isPcUser()
    let touchendOrClick = window.ViewTools.getClickEventName()
    let view = {
        el: ".recommendMusicList",
        template: `
            <h2 class="content-title">推荐歌单</h2>
            <ul class="songList">
            </ul>
        `,
        render(data) {
            $(this.el).html(this.template)
            let $ul = $(this.el).find(".songList")
            for (let i = 0; i < data.length; i++) {
                let songCollection = data[i]
                let $li = $(`
                     <li data-id="${songCollection.id}" class="songCollection-li">
                     <div class="maskdiv">
                         <svg class="icon" aria-hidden="true">
                         <use xlink:href="#icon-musicicon"></use>
                         </svg>
                         </div>
                         <img src="${songCollection.photoPath}" class="songPhoto">
                         <p class="songIntroduction">${songCollection.title}</p>
                     </li>                    
                `)
                $ul.append($li)
            }
        },
    }
    let model = {
        data: "",
        fetch() {
            let allSongs = new AV.Query("Playlist")
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
            })
            this.bindEvents()
        },
        bindEvents() {
          this.bindSongCollectionClick()
        },
        bindSongCollectionClick() {
            $(this.view.el).on(touchendOrClick, ".songCollection-li", (e) => {
                let id = $(e.currentTarget).attr("data-id")
                window.location.href = "./songCollection.html?id=" + id
            })
        }
    }
    controller.init(view, model)
}