export default class OffCanvas {
    static config = null /* Parâmetros */
    static btnLeaflet = null
    static offCanvasEsquerda = null
    static offCanvasDireita = null
    static painelEsquerda = null
    static painelDireita = null
    static containerEsquerda = null
    static containerDireita = null
    
    // Renderização de painéis e botões
    static criar = (elementosBody, btnLeaflet, btnList) => {
        this.btnLeaflet = btnLeaflet

        this.offCanvasEsquerda = document.createElement("div")
        this.offCanvasEsquerda.setAttribute("id", "offCanvasEsquerda")
        this.offCanvasEsquerda.setAttribute("class", "offCanvasEsquerda ocultarEsquerda")
        elementosBody.appendChild(this.offCanvasEsquerda)

        this.offCanvasDireita = document.createElement("div")
        this.offCanvasDireita.setAttribute("id", "offCanvasDireita")
        this.offCanvasDireita.setAttribute("class", "offCanvasDireita ocultarDireita")
        elementosBody.appendChild(this.offCanvasDireita)

        this.painelEsquerda = document.createElement("div")
        this.painelEsquerda.setAttribute("id", "painelEsquerda")
        this.offCanvasEsquerda.appendChild(this.painelEsquerda)

        this.painelDireita = document.createElement("div")
        this.painelDireita.setAttribute("id", "painelDireita")
        this.offCanvasDireita.appendChild(this.painelDireita)

        if(!this.containerEsquerda){
            this.containerEsquerda = document.createElement("div")
            this.containerEsquerda.setAttribute("id", "containerEsquerda")
            this.offCanvasEsquerda.appendChild(this.containerEsquerda)
        }

        if(!this.containerDireita){
            this.containerDireita = document.createElement("div")
            this.containerDireita.setAttribute("id", "containerDireita")
            this.offCanvasDireita.insertBefore(this.containerDireita, this.painelDireita)
        }

        for(let i = 0; i < btnList.length; i++){
            if(i < 4){
                this.containerEsquerda.appendChild(btnList[i])
            }else{
                this.containerDireita.appendChild(btnList[i])
            }
        }
    }

    // Painel da esquerda
    static abrirEsquerda = () => {
        this.offCanvasEsquerda.classList.toggle("ocultarEsquerda")
        if(document.querySelector(".ocultarEsquerda")){
            this.btnLeaflet[0].style.left = "-1750px"
        }else{
            this.btnLeaflet[0].style.left = "-1230px"
        }
    }

    // Painel da direita
    static abrirDireita = () => {
        this.offCanvasDireita.classList.toggle("ocultarDireita")
        if(document.querySelector(".ocultarDireita")){
            this.btnLeaflet[1].style.right = "-1802px"
            this.btnLeaflet[2].style.right = "60px"
        }else{
            this.btnLeaflet[1].style.right = "-1280px"
            this.btnLeaflet[2].style.right = "580px"
        }
    }

    // Botões de fechar painel
    static fecharEsquerda = () => {

    }

    static fecharDireita = () => {

    }
}