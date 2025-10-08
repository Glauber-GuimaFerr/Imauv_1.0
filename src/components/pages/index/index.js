// Importações
import OffCanvas from '/utils/offcanvas.js'
import Msg from '/utils/msg.js'

// Variáveis da API Leaflet
let watchID = navigator.geolocation.getCurrentPosition(success, error, {enableHighAccuracy: true, timeout: 5000}) /* Permissão GPS */
let map /* Mapa */
let lat, lng /* Coordenadas */
const zoom = 16 /* Escala */

// Variáveis importantes
const elementosBody = document.querySelector('#elementosBody')
const btnCurrPos = document.querySelector('#btnCurrPos')
const btnUser = document.querySelector('#btnUser')
const btnListProcess = document.querySelector('#btnListProcess')
const btnEditProcess = document.querySelector('#btnEditProcess')
const btnAddProcess = document.querySelector('#btnAddProcess')
const btnHistory = document.querySelector('#btnHistory')

// Função success
function success(pos){
        if(map === undefined){
                map = L.map('mapID').setView([pos.coords.latitude, pos.coords.longitude], zoom) /* Renderização do mapa na posição atual */

                // Camadas OSM 
                const OpenStreetMap_Mapnik = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { 
                        maxZoom: 19,
                        attribution: '&copy IMAUV'
                })
                OpenStreetMap_Mapnik.addTo(map)

                const OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
                        maxZoom: 17,
                        attribution: '&copy IMAUV'
                })
                OpenTopoMap.addTo(map)
        
                const Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {attribution: '&copy IMAUV'})
                Esri_WorldImagery.addTo(map)
        
                const baseMaps = {
                        "Satélite": Esri_WorldImagery,
                        "Relevo": OpenTopoMap,
                        "Open Street":  OpenStreetMap_Mapnik  
                }
        
                const layerControl = L.control.layers(baseMaps).addTo(map) 

                // Pontos
                const LeafIcon = L.Icon.extend({
                        options: {
                                iconSize: [50, 60],
                                shadowSize: [50, 64],
                                iconAnchor: [22, 58],
                                shadowAnchor: [4, 62],
                                popupAnchor: [3, -30]
                        }
                })  
                
                const currentIcon = new LeafIcon({iconUrl: '/img/menu/current-position-icon.png'})
                const grayIcon = new LeafIcon({iconUrl: '/img/menu/marker-gray-icon.png'})
                const blueIcon = new LeafIcon({iconUrl: '/img/menu/marker-blue-icon.png'})
                const greenIcon = new LeafIcon({iconUrl: '/img/menu/marker-green-icon.png'})
                const yellowIcon = new LeafIcon({iconUrl: '/img/menu/marker-yellow-icon.png'})
                const redIcon = new LeafIcon({iconUrl: '/img/menu/marker-red-icon.png'})


                let currentPos = L.marker([pos.coords.latitude, pos.coords.longitude], {icon: currentIcon}).bindPopup('Sua localização!').addTo(map) /* Posição atual */

                // Função de marcar ponto
                let pontoAzul

                map.on('click', function(e) {
                        lat = e.latlng.lat
                        lng = e.latlng.lng       
                        if(pontoAzul){
                                map.removeLayer(pontoAzul)
                        }
                        pontoAzul = L.marker(e.latlng, {icon: blueIcon}).addTo(map)
                })

                // Barra de pesquisa
                let pontoCinza
                const geocoder = L.Control.geocoder({defaultMarkGeocode: false})
                .on('markgeocode', function(e) {
                        let latlng = e.geocode.center
                        if(pontoCinza){
                                map.removeLayer(pontoCinza)
                        }
                        pontoCinza = L.marker(latlng, {icon: grayIcon}).addTo(map)
                        map.fitBounds(e.geocode.bbox)
                }).addTo(map)
                
                // Variáveis de elementos Leaflet
                const barraPesquisa = document.querySelectorAll('.leaflet-control-geocoder.leaflet-bar.leaflet-control')[0]
                const botoesZoom = document.querySelectorAll('.leaflet-control-zoom.leaflet-bar.leaflet-control')[0]
                const botoesCamada = document.querySelectorAll('.leaflet-control-layers.leaflet-control')[0]

                // Criação do OffCanvas
                const btnLeaflet = [barraPesquisa, botoesZoom, botoesCamada]
                const btnList = [btnCurrPos, btnListProcess, btnEditProcess, btnAddProcess, btnUser, btnHistory]
                OffCanvas.criar(elementosBody, btnLeaflet, btnList)

                // Botão para retornar a posição atual
                btnCurrPos.addEventListener('click', () => {
                        if(navigator.geolocation){
                                map.setView([pos.coords.latitude, pos.coords.longitude], zoom)
                        }else{
                                alert('Geolocalização não é suportada pelo seu navegador.')
                        }
                })

                // Botão para redirecionar até a página do usuário
                btnUser.addEventListener('click', () => {
                        window.location.href = '/account'
                })

                // Botão para visualizar seus processos em andamento
                btnListProcess.addEventListener('click', () => {
                        OffCanvas.abrirEsquerda()
                })

                // Botão para editar seus processos em andamento
                btnEditProcess.addEventListener('click', () => {
                        OffCanvas.abrirEsquerda()
                })

                // Botão para adicionar processos
                btnAddProcess.addEventListener('click', () => {
                        OffCanvas.abrirEsquerda()
                })

                // Botão para visualizar histórico de processos já concluídos
                btnHistory.addEventListener('click', () => {
                        OffCanvas.abrirDireita()
                })
        }else{
                map.remove() /* Remoção do mapa */  
                map = L.map('mapID').setView([pos.coords.latitude, pos.coords.longitude], zoom)      
        }  
}

// Função de erro da API
function error(err){
    console.log(err)
}