{
    let ControllerTools = window.ControllerTools
    let isPc = window.ViewTools.isPcUser()
    let touchendOrClick = window.ViewTools.getClickEventName()
    let view = {
        el: "#app",
        playsHolders: ["url", "name", "singer"],
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
                <h2>{{ name }}<span class="letter">-</span><span class="singerName">{{ singer }}</span></h2>
                <div class="linesWrapper">
                    <div class="lines"></div>
                </div>
            </div>
            <footer><span class="exit-Btn">返回主页面</span></footer>
        `,
        render(data) {
            let templateCopy = this.template
            this.playsHolders.map((element) => {
                templateCopy = templateCopy.replace(`{{ ${element} }}`, data[element])
            })
            $(this.el).html(templateCopy)
            $(this.el).find(".songPhoto").css("background-image", `url("${data.cover}")`)
            $("style").append(`#app::after{background-image: url("${data.cover}");}`)
            let $lrcDiv = $(this.el).find(".lines")
            data.lrc.split("\n").map((string) => {
                let dataArr = string.split("]")
                let time = this.transStrTimeToSecs((dataArr[0]).replace("[", ""))
                let content = dataArr[1]
                let temp = document.createElement("p")
                temp.textContent = content
                temp.dataset.time = time
                $lrcDiv.append(temp)
            })
        },
        transStrTimeToSecs(strTime) {
            let newArr = strTime.split(":")
            let minutes = newArr[0]
            let seconds = newArr[1]
            return parseInt(minutes, 10) * 60 + parseFloat(seconds)
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
            this.scrollLrc()
        },
        scrollLrc() {
          this.lrcLinesWrapper = $(this.view.el).find(".lines")
          this.allLrcLines = this.lrcLinesWrapper.find("p")
          this.view.$audio.on("timeupdate", (e) => {
              this.showTargetLrc(e.currentTarget.currentTime)
          })
        },
        showTargetLrc(time) {
            for (let i = 0; i < this.allLrcLines.length; i++) {
                let pElement = this.allLrcLines[i]
                let result
                if (i === this.allLrcLines.length - 1) {
                    result = pElement
                } else {
                    let currentTime = parseInt(pElement.dataset.time, 10)
                    let nextTime = parseInt(this.allLrcLines[i + 1].dataset.time, 10)
                    if (currentTime <= time && time < nextTime) {
                        result = pElement
                    }
                }
                if (result) {
                    $(this.view.el).find("[data-time].active").removeClass("active")
                    $(result).addClass("active")
                    this.lrcLinesWrapper.css("top", `-${result.offsetTop - 45}px`)
                    break
                }
            }
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
            let isMove = true
            if (!isPc) {
                $(this.view.el).on("touchstart", (e) => {
                    isMove = true
                })
                $(this.view.el).on("touchmove", (e) => {
                    isMove = false
                })
            }
            $(this.view.el).on(touchendOrClick, (e) => {
                if (!isPc && !isMove) {
                    return
                }
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