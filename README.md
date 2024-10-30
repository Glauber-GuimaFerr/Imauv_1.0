# Imauv-1.0
Protótipo desenvolvido para um Trabalho de Conclusão de Curso (Disponível no repositório acadêmico da UNIFAN - Centro Universitário Nobre), que consiste num sistema georreferenciado para mapeamento de áreas urbanas vulneráveis em regiões metropolitanas, utilizando a API Leaflet.

## Esclarecimentos ## 
Certifique-se de instalar o MySQL e Node na sua máquina. Crie o banco de dados abaixo com as portas e atributos corretos. Dê uma olhada em todos os arquivos JavaScript (Exceto os que estão dentro dos módulos Node). Para rodar o programa, certifique-se de estar com os servidores MySQL ativos, logo em seguida abra o terminal e digite "npm start" no caminho "C:\Users\Glaubitu\Desktop\Imauv_1.0\Source\Data".

É necessário finalizar a função de edição. Ao clicar no botão de edição, deverá abrir um painel com uma lista de processos do usuário, semelhante ao botão de visualizar os processos do usuário, e ao clicar em um dos cards, ao invés de redirecionar o usuário para o marcador/ponto no mapa, deverá ocultar a lista de cards e exibir um formulário de edição semelhante ao formulário de adição de pontos. 

## Banco de dados ##
OBS: Verificar o arquivo "variaveis.env"

V   V   V   V   V   V   V   V   V   V   V   V   V   V   V   V   V   V   V   V   V   V   V

CREATE DATABASE  IF NOT EXISTS db_Imauv CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE agente (
nome varchar(50) not null,
cpf varchar(14) unique not null,
endereco varchar(25) not null,
email varchar(30) unique not null,
senha varchar(12) not null,
primary key(nome)
)  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE ponto (
id_ponto int auto_increment not null,
n_agente varchar(50) not null,
num_processo varchar(20) unique not null,
data_inicio date not null,
descricao text not null,
localizacao varchar(50) not null,
classificacao enum('Baixo','Médio','Alto') not null,
etapa enum('Processamento','Pendente','Concluída') not null,
prazo int not null,
latitude decimal(40, 30) not null,
longitude decimal(40, 30) not null,
primary key(id_ponto)
)  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE ponto ADD foreign key (n_agente) REFERENCES agente (nome);

use db_Imauv;
describe agente;
select*from agente;
describe ponto;
select*from ponto;