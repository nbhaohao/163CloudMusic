{
    let ControllerTools = window.ControllerTools
    let isPc = window.ViewTools.isPcUser()
    let touchendOrClick = window.ViewTools.getClickEventName()
    let view = {
        el: "#app",
        $audio: "",
        rotateDeg: 0,
        template: `
            <audio class="musicplayer" src="{{ url }}"></audio>
            <span class="logo"></span>
            <span class="pointer"></span>
            <div class="dist active">
                <div class="distPhoto">
                    <div class="songPhoto transToCenter"></div>
                </div>
                <img src="./img/playBtn.svg" alt="" class="playBtn transToCenter">
            </div>
            <div class="lync">
                <h2>Mother<span class="letter">-</span><span class="singerName">久石譲</span></h2>
            </div>
            <footer><span class="exit-Btn">返回主页面</span></footer>
        `,
        render(data) {
            let templateCopy = this.template
            $(this.el).html(this.template.replace("{{ url }}", data.url))
            $(this.el).find(".songPhoto").css("background-image", `url("${data.cover}")`)
            $("style").append(`#app::after{background-image: url("${data.cover}");}`)
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
            song: {
                id: "",
                name: "",
                singer: "",
                url: "",
            },
            status: "pause",
        },
        get(id) {
            var query = new AV.Query('Song')
            return query.get(id).then((song) => {
                this.data.id = song.id
                Object.assign(this.data.song, song.attributes)
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
                this.view.render(this.model.data.song)
                this.view.$audio = $(this.view.el).find(".musicplayer")
                this.bindEvents()
            }, (error) => {
                console.log("error", error)
            })
        },
        bindEvents() {
            this.songPlayAndPauseEvent()
            this.exitBtnEvent()
            this.audioMusicFinishEvent()
        },
        audioMusicFinishEvent() {
          this.view.$audio.on("ended", (e) => {
              $(this.view.el).trigger(touchendOrClick)
              let distDiv = $(this.view.el).find(".distPhoto")
              this.view.rotateDeg = 0
              distDiv.css("transform", `rotate(${this.view.rotateDeg}deg)`)
          })
        },
        exitBtnEvent() {
            $(this.view.el).find(".exit-Btn").on(touchendOrClick, (e) => {
                window.location.href = "./index.html"
                e.stopPropagation()
            })
        },
        songPlayAndPauseEvent() {
            $(this.view.el).on(touchendOrClick, (e) => {
                if (this.model.data.status === "pause") {
                    $(this.view.el).find(".dist").removeClass("active")
                    this.view.play()
                    this.model.data.status = "play"
                    this.rotateDist()
                }
                else if (this.model.data.status === "play") {
                    $(this.view.el).find(".dist").addClass("active")
                    this.view.pause()
                    this.model.data.status = "pause"
                    window.clearInterval(this.distIntervalEventId)
                }
            })
        },
        rotateDist() {
            let distDiv = $(this.view.el).find(".distPhoto")
            this.distIntervalEventId = setInterval(() => {
                this.view.rotateDeg += 0.5
                distDiv.css("transform", `rotate(${this.view.rotateDeg}deg)`)
            }, 43)
        }
    }
    controller.init(view, model)
}