{
    let ControllerTools = window.ControllerTools
    let view = {}
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
                return Object.assign(this.data, song.attributes)
            })
        },
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            let id = ControllerTools.getLocationQueryParam("id")
            this.model.get(id).then((data) => {
                console.log("data", data)
            }, (error) => {
                console.log("error", error)
            })
        },
    }
    controller.init(view, model)
}