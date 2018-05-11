window.ControllerTools = {
    EVENT_HUB: {
        events: {},
        emit(eventName, data) {
            for (let key in this.events) {
                if (key === eventName) {
                    let fnList = this.events[key]
                    fnList.map((fn) => {
                        fn.call(undefined, data)
                    })
                }
            }
        },
        on(eventName, fn) {
            if (!this.events[eventName]) {
                this.events[eventName] = []
            }
            this.events[eventName].push(fn)
        }
    },
    getLocationQueryParam(paramName) {
        let searchValue = window.location.search
        if (searchValue.indexOf("?") !== 0) {
            return
        }
        searchValue = searchValue.slice(1, searchValue.length)
        let keyValueArr = searchValue.split("&").filter(value => value)
        let result = ""
        for (let i = 0; i < keyValueArr.length; i++) {
            let keyValueItem = keyValueArr[i].split("=")
            let key = keyValueItem[0]
            let value = keyValueItem[1]
            if (key === paramName) {
                result = value
                break
            }
        }
        return result
    },
}