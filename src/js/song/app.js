{
    let ControllerTools = window.ControllerTools
    let view = {
        el: "#app",
        $audio: "",
        template: `
            <audio class="musicplayer" src="{{ url }}"></audio>
            <span class="logo"></span>
            <span class="pointer"></span>
            <div class="dist">
                <div class="distPhoto">
                    <div class="songPhoto transToCenter"></div>
                    <img src="./img/playBtn.svg" alt="" class="playBtn transToCenter">
                </div>
            </div>
            <div class="lync">
                <h2>Mother<span class="letter">-</span><span class="singerName">久石譲</span></h2>
            </div>
        `,
        render(data) {
            $(this.el).html(this.template.replace("{{ url }}", data.url))
        },
        play() {
            this.$audio[0].play()
        },
        pause() {
            this.$audio[0].pause()
        },
    }
    let model = {
        data: {
            id: "",
            name: "",
            singer: "",
            url: "",
        },
        get(id) {
            var query = new AV.Query('Song')
            return query.get(id).then((song) => {
                this.data.id = song.id
                Object.assign(this.data, song.attributes)
                return song
            })
        },
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            let id = ControllerTools.getLocationQueryParam("id")
            this.model.get(id).then((data) => {
                this.view.render(this.model.data)
                this.view.$audio = $(this.view.el).find(".musicplayer")
                this.bindEvents()
            }, (error) => {
                console.log("error", error)
            })
        },
        bindEvents() {
            // $(this.view.el).find(".play").on("touchend", (e) => {
            //     this.view.play()
            // })
            // $(this.view.el).find(".pause").on("touchend", (e) => {
            //     this.view.pause()
            // })
        }
    }
    controller.init(view, model)
}