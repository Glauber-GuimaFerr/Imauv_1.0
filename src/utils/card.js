export default class Card {
    static cardDiv = null
    static cardAgente = null
    static cardID = null
    static cardProcesso = null
    static cardEtapa = null
    static cardLatitude = null
    static cardLongitude = null

    static criar = (config) => {
        this.cardDiv = document.createElement("div")
        this.cardDiv.setAttribute("class", "cardDiv")

        this.cardAgente = document.createElement("p")
        this.cardAgente.innerHTML = `<strong>Agente:</strong> ${config.agente}`
        this.cardDiv.appendChild(this.cardAgente)

        this.cardID = document.createElement("p")
        this.cardID.innerHTML = `<strong>ID do ponto:</strong> ${config.id}`
        this.cardDiv.appendChild(this.cardID)

        this.cardProcesso = document.createElement("p")
        this.cardProcesso.innerHTML = `<strong>N°Processo:</strong> ${config.processo}`
        this.cardDiv.appendChild(this.cardProcesso)

        this.cardEtapa = document.createElement("p")
        this.cardEtapa.innerHTML = `<strong>Etapa:</strong> ${config.etapa}`
        this.cardDiv.appendChild(this.cardEtapa)

        this.cardLatitude = document.createElement("input")
        this.cardLatitude.setAttribute("type", "hidden")
        this.cardLatitude.setAttribute("value", `${config.latitude}`)
        this.cardDiv.appendChild(this.cardLatitude)

        this.cardLongitude = document.createElement("input")
        this.cardLongitude.setAttribute("type", "hidden")
        this.cardLongitude.setAttribute("value", `${config.longitude}`)
        this.cardDiv.appendChild(this.cardLongitude)

        return this.cardDiv
    }
}