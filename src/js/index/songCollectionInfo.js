{
    let isPc = window.ViewTools.isPcUser()
    let ControllerTools = window.ControllerTools
    let touchendOrClick = window.ViewTools.getClickEventName()
    let view = {
        el: "header",
        template: `
            <div class="photo-header">
                <img class="photodiv">
                <div class="maskDiv"></div>
                <div class="info">
                    <div class="small-photo"></div>
                    <span class="title">__title__</span>
                </div>
            </div>
            <div class="description">
                简介：__describe__
            </div>
            <div class="hr-title">歌曲列表</div>
        `,
        render(data) {
            console.log("data", data)
            let props = "title describe".split(" ")
            let temp = this.template
            props.map((value) => {
                temp = temp.replace(`__${value}__`, data[value])
            })
            $(this.el).html(temp)
            $(this.el).find(".photodiv").prop("src", data.photoPath)
            $(this.el).find(".small-photo").css("background-image", `url(${data.photoPath})`)
        },
    }
    let model = {
        data: {},
        fetch(id) {
            var query = new AV.Query('Playlist')
            return query.get(id)
        },
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            let id = ControllerTools.getLocationQueryParam("id")
            this.model.fetch(id).then((data) => {
                Object.assign(this.model.data, {...data.attributes})
                this.view.render(this.model.data)
            }, (error) => {

            })
        },
    }
    controller.init(view, model)
}