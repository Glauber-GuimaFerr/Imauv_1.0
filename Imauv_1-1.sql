CREATE DATABASE IF NOT EXISTS db_imauv;

USE db_imauv;

CREATE TABLE `agente` (
  `cpf` varchar(14) not null,
  `nome` varchar(50) not null,
  `endereco` varchar(25) not null,
  `email` varchar(30) unique not null,
  `senha` varchar(12) not null,
  primary key(`cpf`)
);

CREATE TABLE `ponto` (
  `id_ponto` int auto_increment not null,
  `n_agente` varchar(14),
  `cod_processo` varchar(20) unique not null,
  `data_inicio` date not null,
  `descricao` text not null,
  `localizacao` varchar(50) not null,
  `classificacao` enum('Baixo','Médio','Alto') not null,
  `etapa` enum('Processamento','Pendente','Concluída') not null,
  `prazo` int not null,
  `latitude` decimal(40, 30) not null,
  `longitude` decimal(40, 30) not null,
  primary key(`id_ponto`)
);

ALTER TABLE `ponto` ADD foreign key (`n_agente`) REFERENCES `agente` (`cpf`);