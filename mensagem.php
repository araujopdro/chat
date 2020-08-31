<?php
	session_start();

	$DATABASE_HOST = '177.38.44.3';
	$DATABASE_USER = 'pedro';
	$DATABASE_PASS = 'oxehHa3N';
	$DATABASE_NAME = 'webcastlogin';

	$con = mysqli_connect($DATABASE_HOST, $DATABASE_USER, $DATABASE_PASS, $DATABASE_NAME);

	date_default_timezone_set('America/Sao_Paulo');
	$data = date('d/m/Y H:i:s', time());
	$nome = $_POST["nome"];
	$email = $_POST["email"];
	$mensagem = $_POST["mensagem"];

	include_once("conectar.php");
			
	mysqli_query("SET NAMES 'utf8'");
	mysqli_query('SET character_set_connection=utf8');
	mysqli_query('SET character_set_client=utf8');
	mysqli_query('SET character_set_results=utf8');

	mysqli_query($con, "INSERT INTO cyrela_vilamariana3108_msgs (`data`, `nome`, `email`, `mensagem`) VALUES ('$data', '$nome', '$email', '$mensagem')")or die(mysqli_error($con));	
?>