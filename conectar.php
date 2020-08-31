<?php
 /* Dados do Banco de Dados a conectar */
$Servidor = '177.38.44.3';
$nomeBanco = 'webcastlogin';
$Usuario = 'pedro';
$Senha = 'oxehHa3N';

$bd = mysqli_connect($Servidor, $Usuario, $Senha, $nomeBanco); 

header('Content-Type: text/html; charset=utf-8');
mysqli_query("SET NAMES 'utf8'");
mysqli_query('SET character_set_connection=utf8');
mysqli_query('SET character_set_client=utf8');
mysqli_query('SET character_set_results=utf8');

if ($mysqli->connect_errno) {
    echo "Erro de conexão com localhost, o seguinte erro ocorreu -> ";
    echo "Error: Erro de conexão com banco de dados, o seguinte erro ocorreu -> \n";
    echo "Errno: " . $mysqli->connect_errno . "\n";
    echo "Error: " . $mysqli->connect_error . "\n";
    
} 
?>