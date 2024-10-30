//Permissão GPS//
var watchID = navigator.geolocation.getCurrentPosition(success, error, {enableHighAccuracy: true, timeout: 5000});

//Variável do mapa leaflet
var map;

//Variável das coordenadas
var lat, lng;

//Variáveis dos botões extras
var btnSchg, btnPr, btnEdit, btnUser, btnHist, btnPlus;

//Ajuste da posição dos botões extras ao abrir e fechar os painéis //
function btnExtraWd() {
        var lPanelA = document.getElementById('myPoints');
        var lPanelB = document.getElementById('pointCreate');
        var lPanelC = document.getElementById('pointEdit');
        var rPanel = document.getElementById('historys');
    
        var lPanelsStateA = getComputedStyle(lPanelA).display;
        var lPanelsStateB = getComputedStyle(lPanelB).display;
        var lPanelsStateC = getComputedStyle(lPanelC).display;
        var rPanelsState = getComputedStyle(rPanel).display;
    
        if (lPanelsStateA === 'none' && lPanelsStateB === 'none' && lPanelsStateC === 'none' && rPanelsState === 'none') {
                btnSchg.style.left = btnPr.style.left = btnEdit.style.left = '20px';
                btnUser.style.right = btnHist.style.right = btnPlus.style.right = '20px';

        }else if (lPanelsStateA === 'block' && lPanelsStateB === 'block' && lPanelsStateC === 'block' && rPanelsState === 'none') {
                btnSchg.style.left = btnPr.style.left = btnEdit.style.left = '680px';
                btnUser.style.right = btnHist.style.right = btnPlus.style.right = '20px';

        }else if (lPanelsStateA === 'block' && lPanelsStateB === 'block' && lPanelsStateC === 'block' && rPanelsState === 'block') {
                btnSchg.style.left = btnPr.style.left = btnEdit.style.left = '590px';
                btnUser.style.right = btnHist.style.right = btnPlus.style.right = '200px';

        }else if (lPanelsStateA === 'none' && lPanelsStateB === 'none' && lPanelsStateC === 'none' && rPanelsState === 'block') {
                btnSchg.style.left = btnPr.style.left = btnEdit.style.left = '20px';
                btnUser.style.right = btnHist.style.right = btnPlus.style.right = '350px'; 

        }else if (((lPanelsStateA === 'block' && lPanelsStateB === 'none' && lPanelsStateC === 'none') || (lPanelsStateA === 'none' && lPanelsStateB === 'block' && lPanelsStateC === 'none') || (lPanelsStateA === 'none' && lPanelsStateB === 'none' && lPanelsStateC === 'block')) && rPanelsState === 'none') {
                btnSchg.style.left = btnPr.style.left = btnEdit.style.left = '350px';
                btnUser.style.right = btnHist.style.right = btnPlus.style.right = '20px'; 
                
        }else if (((lPanelsStateA === 'block' && lPanelsStateB === 'none' && lPanelsStateC === 'none') || (lPanelsStateA === 'none' && lPanelsStateB === 'block' && lPanelsStateC === 'none') || (lPanelsStateA === 'none' && lPanelsStateB === 'none' && lPanelsStateC === 'block')) && rPanelsState === 'block') {
                btnSchg.style.left = btnPr.style.left = btnEdit.style.left = '280px';
                btnUser.style.right = btnHist.style.right = btnPlus.style.right = '280px'; 
                
        }else if (((lPanelsStateA === 'block' && lPanelsStateB === 'block' && lPanelsStateC === 'none') || (lPanelsStateA === 'none' && lPanelsStateB === 'block' && lPanelsStateC === 'block') || (lPanelsStateA === 'block' && lPanelsStateB === 'none' && lPanelsStateC === 'block')) && rPanelsState === 'none') {
                btnSchg.style.left = btnPr.style.left = btnEdit.style.left = '550px';
                btnUser.style.right = btnHist.style.right = btnPlus.style.right = '20px'; 
                
        }else if (((lPanelsStateA === 'block' && lPanelsStateB === 'block' && lPanelsStateC === 'none') || (lPanelsStateA === 'none' && lPanelsStateB === 'block' && lPanelsStateC === 'block') || (lPanelsStateA === 'block' && lPanelsStateB === 'none' && lPanelsStateC === 'block')) && rPanelsState === 'block') {
                btnSchg.style.left = btnPr.style.left = btnEdit.style.left = '460px';
                btnUser.style.right = btnHist.style.right = btnPlus.style.right = '230px'; 
                
        }
}

//Funções de abrir e fechar painel//
function toggleLeftPanel(panelId) {
        var panel = document.getElementById(panelId);
        if (panel.style.display === 'none' || panel.style.display === '') {
                panel.style.display = 'block';
        } else {
                panel.style.display = 'none';
        }
        btnExtraWd();
}

function toggleRightPanel() {
        var panel = document.getElementById('historys');
        if (panel.style.display === 'none' || panel.style.display === '') {
                panel.style.display = 'block';
        } else {
                panel.style.display = 'none';
        }
        btnExtraWd();
}
      
//Função POST de adição de ponto//
async function addPoint() {
        const n_agente = document.getElementById('n_agente').value;
        const num_processo = document.getElementById('num_processo').value;
        const data_inicio = document.getElementById('data_inicio').value;
        const descricao = document.getElementById('descricao').value;
        const localizacao = document.getElementById('localizacao').value;
        const classificacao = document.getElementById('classificacao').value;
        const etapa = document.getElementById('etapa').value;
        const prazo = document.getElementById('prazo').value;
        const latitude = document.getElementById('latitude').value;
        const longitude = document.getElementById('longitude').value;
                
        const response = await fetch('/addPoint', {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify({ n_agente, num_processo, data_inicio, descricao, localizacao, classificacao, etapa, prazo, latitude, longitude })
                });      

                const data = await response.json();
                
                if (data.success) {
                        alert('Processo adicionado com sucesso!');                            
                } else{
                        alert('Erro ao adicionar processo: ' + data.message);
                }
}

//Função PUT de atualizar pontos//
async function updatePoint() {
        const edit_id_ponto = document.getElementById('edit_id_ponto').value;
        const num_processo = document.getElementById('edit_num_processo').value;
        const data_inicio = document.getElementById('edit_data_inicio').value;
        const descricao = document.getElementById('edit_descricao').value;
        const localizacao = document.getElementById('edit_localizacao').value;
        const classificacao = document.getElementById('edit_classificacao').value;
        const etapa = document.getElementById('edit_etapa').value;
        const prazo = document.getElementById('edit_prazo').value;
    
        const response = await fetch('/editPoint', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ edit_id_ponto, num_processo, data_inicio, descricao, localizacao, classificacao, etapa, prazo })
        });
    
        const data = await response.json();
    
        if (data.success) {
            alert('Processo atualizado com sucesso!');
            toggleLeftPanel('pointEdit');
        } else {
            alert('Erro ao atualizar processo: ' + data.message);
        }
}        

//Função sucess//
function success(pos){
    
//Renderização do mapa//
    if (map === undefined){
        map = L.map('mapID').setView([pos.coords.latitude, pos.coords.longitude], 16);

//Camada OSM//
        var OpenStreetMap_Mapnik = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; IMAUV'
        });
        OpenStreetMap_Mapnik.addTo(map);

        var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: '&copy; IMAUV'
        });
        OpenTopoMap.addTo(map);
    
        var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; IMAUV'
        });
        Esri_WorldImagery.addTo(map);
    
        var baseMaps = {
            "Satélite": Esri_WorldImagery,
            "Relevo": OpenTopoMap,
            "OpenStreetMap":  OpenStreetMap_Mapnik  
        }
    
        var layerControl = L.control.layers(baseMaps).addTo(map); 

//Ponto//
        var LeafIcon = L.Icon.extend({
            options: {
                iconSize: [50, 60],
                shadowSize: [50, 64],
                iconAnchor: [22, 58],
                shadowAnchor: [4, 62],
                popupAnchor: [-3, -76]
            }
        });  
        
        var currentIcon = new LeafIcon({iconUrl: '../Images/Menu/current-position-icon.png'}),
        blueIcon = new LeafIcon({iconUrl: '../Images/Menu/marker-blue-icon.png'}),
        greenIcon = new LeafIcon({iconUrl: '../Images/Menu/marker-green-icon.png'}),
        yellowIcon = new LeafIcon({iconUrl: '../Images/Menu/marker-yellow-icon.png'}),
        redIcon = new LeafIcon({iconUrl: '../Images/Menu/marker-red-icon.png'});

//Posição atual//
        var currentP = L.marker([pos.coords.latitude, pos.coords.longitude], {icon: currentIcon}).bindPopup('Sua localização!').addTo(map);

//Função de carregar o popup dos marcadores//
        async function loadPoints() {
                const response = await fetch('/getPoints');
                const data = await response.json();
                let clrIcon = greenIcon;

                if (data.success) {
                data.points.forEach(point => {

                        if(point.prazo > 180 || (point.prazo <= 180 && point.prazo > 90)){
                                clrIcon = greenIcon;
                        }else if(point.prazo <= 90 && point.prazo >= 30){
                                clrIcon = yellowIcon;
                        }else{
                                clrIcon = redIcon;    
                        }
                        if(point.etapa !== 'Concluída'){
                                const marker = L.marker([point.latitude, point.longitude], {icon: clrIcon}).addTo(map);
                                marker.bindPopup(`<b>Processo:</b> ${point.num_processo}<br>
                                                <b>Início:</b> ${point.data_inicio}<br>
                                                <b>Descrição:</b> ${point.descricao}<br>
                                                <b>Endereço:</b> ${point.localizacao}<br>
                                                <b>Classificação:</b> ${point.classificacao}<br>
                                                <b>Etapa:</b> ${point.etapa}<br>
                                                <b>Prazo:</b> ${point.prazo} dias`);
                        }                      
                });
                } else {
                alert('Erro ao carregar pontos');
                }
        }        
       
//Variável do container dos botões
        var btnContainer = document.createElement('div');
        btnContainer.className = 'btn-container';
        
//Barra de pesquisa//
        var geocoder = L.Control.geocoder({defaultMarkGeocode: false})
        .on('markgeocode', function(e) {
        var latlng = e.geocode.center;
        var marker = L.marker(latlng,{icon: blueIcon}).addTo(map);
        map.fitBounds(e.geocode.bbox);
        }).addTo(map);

//Botão de marcar ponto e adição de área//
        btnPlus = document.createElement('button');
        var imgPlus = document.createElement('img');
        btnPlus.appendChild(imgPlus);
        imgPlus.src = '../Images/Menu/plus-icon.png';
        imgPlus.alt = 'Adicionar área';
        btnPlus.style.display = 'none';
        btnContainer.appendChild(btnPlus);
        btnPlus.style.position = 'fixed';
        btnPlus.style.top = '430px';
        btnPlus.style.right = '20px';

        var ponto;

        map.on('click', function(e) {
            lat = e.latlng.lat;
            lng = e.latlng.lng;   
            document.getElementById('latitude').value = lat;
            document.getElementById('longitude').value = lng;       
            console.log("Latitude: " + lat + ", Longitude: " + lng);
            if (ponto) {
                map.removeLayer(ponto);
            }
            ponto = L.marker(e.latlng, {icon: blueIcon}).addTo(map);
            btnPlus.style.display = 'block';
         });

        btnPlus.addEventListener('click', function() {
                if (document.getElementById('pointCreate').style.display === 'none' || document.getElementById('pointCreate').style.display === ''){
                        toggleLeftPanel('pointCreate');
                }               
        });     

//Botão de retornar para posição atual//
        btnSchg = document.createElement('button');
        var imgSchg = document.createElement('img');
        btnSchg.appendChild(imgSchg);
        imgSchg.src = '../Images/Menu/location-searching-icon.png';
        imgSchg.alt = 'Localização atual';
        btnContainer.appendChild(btnSchg);
        btnSchg.style.position = 'fixed';
        btnSchg.style.top = '10px';
        btnSchg.style.left = '20px';
        
        btnSchg.addEventListener('click', function() {
            if (navigator.geolocation) {
                    map.setView([pos.coords.latitude, pos.coords.longitude], 15);
            } else {
                alert('Geolocalização não é suportada pelo seu navegador.');
            }
        });

//Botão de editar processos//
        btnEdit = document.createElement('button');
        var imgEdit = document.createElement('img');
        btnEdit.appendChild(imgEdit);
        imgEdit.src = '../Images/Menu/edit-icon.png';
        imgEdit.alt = 'Editar processos';
        btnContainer.appendChild(btnEdit);
        btnEdit.style.position = 'fixed';
        btnEdit.style.top = '160px';
        btnEdit.style.left = '20px';

        btnEdit.addEventListener('click', function() {
                if (document.getElementById('pointEdit').style.display === 'none' || document.getElementById('pointEdit').style.display === ''){
                        toggleLeftPanel('pointEdit');
                }  
        });

//Criação do formulário de edição//
        var editForm = document.createElement('form');
        editForm.id = 'editForm';
        editForm.className = 'show';

        var closeButton = document.createElement('button');
        closeButton.type = 'button';
        closeButton.textContent = 'X';
        closeButton.addEventListener('click', function() {
        toggleLeftPanel(pointEdit);
        });

        var processNumberLabel = document.createElement('label');
        processNumberLabel.textContent = 'Número do Processo:';
        var processNumberInput = document.createElement('input');
        processNumberInput.type = 'text';
        processNumberInput.name = 'processNumber';

        var dateLabel = document.createElement('label');
        dateLabel.textContent = 'Data:';
        var dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.name = 'date';

        var descriptionLabel = document.createElement('label');
        descriptionLabel.textContent = 'Descrição:';
        var descriptionTextarea = document.createElement('textarea');
        descriptionTextarea.name = 'description';

        var addressLabel = document.createElement('label');
        addressLabel.textContent = 'Endereço:';
        var addressInput = document.createElement('input');
        addressInput.type = 'text';
        addressInput.name = 'address';

        var classificationLabel = document.createElement('label');
        classificationLabel.textContent = 'Classificação:';
        var classificationInput = document.createElement('select');
        classificationInput.name = 'classification';
        var classifications = ['Baixa', 'Média', 'Alta'];
        classifications.forEach(function(option) {
        var classificationOption = document.createElement('option');
        classificationOption.value = option.toLowerCase();
        classificationOption.textContent = option;
        classificationInput.appendChild(classificationOption);
        });

        var stageLabel = document.createElement('label');
        stageLabel.textContent = 'Etapa:';
        var stageInput = document.createElement('input');
        stageInput.type = 'text';
        stageInput.name = 'stage';

        var deadlineLabel = document.createElement('label');
        deadlineLabel.textContent = 'Prazo:';
        var deadlineInput = document.createElement('input');
        deadlineInput.type = 'text';
        deadlineInput.name = 'deadline';

        var saveButton = document.createElement('button');
        saveButton.type = 'button'; 
        saveButton.textContent = 'Salvar';

        editForm.appendChild(closeButton);
        editForm.appendChild(document.createElement('br')); 

        editForm.appendChild(processNumberLabel);
        editForm.appendChild(document.createElement('br')); 
        editForm.appendChild(processNumberInput);
        editForm.appendChild(document.createElement('br')); 

        editForm.appendChild(dateLabel);
        editForm.appendChild(document.createElement('br')); 
        editForm.appendChild(dateInput);
        editForm.appendChild(document.createElement('br')); 

        editForm.appendChild(descriptionLabel);
        editForm.appendChild(document.createElement('br')); 
        editForm.appendChild(descriptionTextarea);
        editForm.appendChild(document.createElement('br')); 

        editForm.appendChild(addressLabel);
        editForm.appendChild(document.createElement('br')); 
        editForm.appendChild(addressInput);
        editForm.appendChild(document.createElement('br')); 

        editForm.appendChild(classificationLabel);
        editForm.appendChild(document.createElement('br')); 
        editForm.appendChild(classificationInput);
        editForm.appendChild(document.createElement('br')); 

        editForm.appendChild(stageLabel);
        editForm.appendChild(document.createElement('br')); 
        editForm.appendChild(stageInput);
        editForm.appendChild(document.createElement('br')); 

        editForm.appendChild(deadlineLabel);
        editForm.appendChild(document.createElement('br')); 
        editForm.appendChild(deadlineInput);
        editForm.appendChild(document.createElement('br')); 

        editForm.appendChild(saveButton);

        var pointEditPanel = document.getElementById('pointEdit');
        pointEditPanel.appendChild(editForm);
       
//Botão de visualizar processos do usuário//
        btnPr = document.createElement('button');
        var imgPr = document.createElement('img');
        btnPr.appendChild(imgPr);
        imgPr.src = '../Images/Menu/list-icon.png';
        imgPr.alt = 'Processos criados';
        btnContainer.appendChild(btnPr);
        btnPr.style.position = 'fixed';
        btnPr.style.top = '90px';
        btnPr.style.left = '20px';

        btnPr.addEventListener('click', function() {
                if (document.getElementById('myPoints').style.display === 'none' || document.getElementById('myPoints').style.display === ''){
                        toggleLeftPanel('myPoints');
                }  
        });

//Função GET de carregar os cards//  
        async function loadMyPoints() {
                const response = await fetch('/getPoints');
                const data = await response.json();
                const n_agente = document.getElementById('n_agente').value;

                if (data.success) {
                const myPointsDiv = document.getElementById('myPoints');
                myPointsDiv.innerHTML = '';

                const closeButton = document.createElement('button');
                closeButton.textContent = 'X';
                closeButton.classList.add('close-btn');
                closeButton.addEventListener('click', () => {
                        toggleLeftPanel('myPoints');
                });
                myPointsDiv.appendChild(closeButton);

                data.points.forEach(point => {
                        if (point.n_agente === n_agente && point.etapa !== 'Concluída') {
                        const pointCard = document.createElement('div');
                        pointCard.innerHTML = `<b>Agente:</b> ${point.n_agente}<br>
                                                <b>ID do Ponto:</b> ${point.id_ponto}<br>
                                                <b>Processo:</b> ${point.num_processo}<br>
                                                <b>Etapa:</b> ${point.etapa}`;
                        pointCard.classList.add('point-card');

                        if (point.prazo > 180 || (point.prazo <= 180 && point.prazo > 90)) {
                                pointCard.style.backgroundColor = 'lightgreen';
                        } else if (point.prazo <= 90 && point.prazo >= 30) {
                                pointCard.style.backgroundColor = 'yellow';
                        } else {
                                pointCard.style.backgroundColor = 'lightcoral';
                        }

                        pointCard.style.marginTop = '10px';

                        pointCard.addEventListener('click', () => {
                                map.setView([point.latitude, point.longitude], 15);
                        });

                        myPointsDiv.appendChild(pointCard);
                        }
                });
                } else {
                alert('Erro ao carregar os cards');
                }
        }        

//Botão de abrir a página de usuário//
        btnUser = document.createElement('button');
        var imgUser = document.createElement('img');
        btnUser.appendChild(imgUser);
        imgUser.src = '../Images/Menu/user-icon.png';
        imgUser.alt = 'Página de usuário';
        btnContainer.appendChild(btnUser);
        btnUser.style.position = 'fixed';
        btnUser.style.top = '20px';
        btnUser.style.right = '20px';

        btnUser.addEventListener('click', function() {
            window.location.href = '../Pages/account.html';
        });

//Botão de histórico//
        btnHist = document.createElement('button');
        var imgHist = document.createElement('img');
        btnHist.appendChild(imgHist);
        imgHist.src = '../Images/Menu/history-icon.png';
        imgHist.alt = 'Histórico';
        btnContainer.appendChild(btnHist);
        btnHist.style.position = 'fixed';
        btnHist.style.top = '90px';
        btnHist.style.right = '20px';

        btnHist.addEventListener('click', function() {
                if (document.getElementById('historys').style.display === 'none' || document.getElementById('historys').style.display === ''){
                        toggleRightPanel();
                }              
        });

//Função GET de carregar os cards de processos concluídos//
        async function loadHistorys() {
                const response = await fetch('/getPoints');
                const data = await response.json();

                if (data.success) {
                const myPointsDiv = document.getElementById('historys');
                myPointsDiv.innerHTML = '';

                const closeButton = document.createElement('button');
                closeButton.textContent = 'X';
                closeButton.classList.add('close-btn');
                closeButton.addEventListener('click', () => {
                        toggleRightPanel();
                });
                myPointsDiv.appendChild(closeButton);

                data.points.forEach(point => {
                        if (point.etapa === 'Concluída') {
                        const pointCard = document.createElement('div');
                        pointCard.innerHTML = `<b>Agente:</b> ${point.n_agente}<br>
                                                <b>ID do Ponto:</b> ${point.id_ponto}<br>
                                                <b>Processo:</b> ${point.num_processo}<br>
                                                <b>Etapa:</b> ${point.etapa}`;
                        pointCard.classList.add('point-card');

                        pointCard.style.backgroundColor = 'white';
                        pointCard.style.marginTop = '10px';

                        myPointsDiv.appendChild(pointCard);
                        }
                });
                } else {
                alert('Erro ao carregar os cards');
                }
        }  
       
//Herança do Container dos botões e outros eventos de click
        document.body.appendChild(btnContainer);  
        
        document.addEventListener('DOMContentLoaded', () => {
                loadPoints(); 
        });
            
        btnPr.addEventListener('click', () => {
                loadMyPoints(); 
        });

//Função de carregar os cards para edição//   
async function loadMyEditPoints() {
        const response = await fetch('/getPoints');
        const data = await response.json();
        const n_agente = document.getElementById('n_agente').value;
    
        if (data.success) {
            const myPointsDiv = document.getElementById('myPoints');
            myPointsDiv.innerHTML = '';
    
            const closeButton = document.createElement('button');
            closeButton.textContent = 'X';
            closeButton.classList.add('close-btn');
            closeButton.addEventListener('click', () => {
                toggleLeftPanel('myPoints');
            });
            myPointsDiv.appendChild(closeButton);
    
            data.points.forEach(point => {
                if (point.n_agente === n_agente && point.etapa !== 'Concluída') {
                    const pointCard = document.createElement('div');
                    pointCard.innerHTML = `<b>Agente:</b> ${point.n_agente}<br>
                                           <b>ID do Ponto:</b> ${point.id_ponto}<br>
                                           <b>Processo:</b> ${point.num_processo}<br>
                                           <b>Etapa:</b> ${point.etapa}`;
                    pointCard.classList.add('point-card');
                    pointCard.style.backgroundColor = point.prazo > 180 || (point.prazo <= 180 && point.prazo > 90) ? 'lightgreen' :
                                                      (point.prazo <= 90 && point.prazo >= 30 ? 'yellow' : 'lightcoral');
                    pointCard.style.marginTop = '10px';
    
                    pointCard.addEventListener('click', () => {
                        document.getElementById('edit_id_ponto').value = point.id_ponto;
                        document.getElementById('edit_num_processo').value = point.num_processo;
                        document.getElementById('edit_data_inicio').value = point.data_inicio;
                        document.getElementById('edit_descricao').value = point.descricao;
                        document.getElementById('edit_localizacao').value = point.localizacao;
                        document.getElementById('edit_classificacao').value = point.classificacao;
                        document.getElementById('edit_etapa').value = point.etapa;
                        document.getElementById('edit_prazo').value = point.prazo;
    
                        toggleLeftPanel('pointEdit');
                    });
    
                    myPointsDiv.appendChild(pointCard);
                }
            });
        } else {
            alert('Erro ao carregar os cards');
        }
    }

        btnEdit.addEventListener('click', function() {
              loadMyEditPoints(); 
        });
        
        btnHist.addEventListener('click', () => {
                loadHistorys(); 
        });
                 
//Remoção do mapa//    
    }else{
        map.remove();
        map = L.map('mapID').setView([pos.coords.latitude, pos.coords.longitude], 16);      
    }  
}

//Error log
function error(err){
    console.log(err);
}