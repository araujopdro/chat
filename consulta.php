<?php
	include_once("conectar.php");

	$sql = "SELECT nome, mensagem, data FROM cyrela_vilamariana3108_msgs WHERE data >='28/08/2020 00:00:00' ORDER BY id DESC";
	$result = mysqli_query($bd, $sql) or die("Erro ao retornar dados");
	
	$data = array();
	
	while ($rows = $result->fetch_assoc()){
		$data[] = $rows;
	}
	
	header('Content-type: application/json');
	echo json_encode($data);
	exit;
?>