<!DOCTYPE html>
<html>
	<head>
		<title>Living</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<link rel="shortcut icon" type="image/png" href="imgs/favicon.png"/>
		<style type="text/css">
			@font-face {
				font-family: "AntroVectra";
				src: url("fonts/AntroVectra.otf") format("opentype");
				font-weight: normal;
			}

			@font-face {
				font-family: "LouisGeorgeCafe";
				src: url("fonts/LouisGeorgeCafe-Bold.ttf") format("opentype");
				font-weight: bold;
			}

			.antro{
				font-family:"AntroVectra", sans-serif;
				letter-spacing: normal !important;
				color: rgb(141, 115, 75);
				font-weight: 100;
			}
			.lgc{
				font-family:"LouisGeorgeCafe", sans-serif;
				font-weight: bold;
				color: rgb(0, 0, 0);
			}
			
			html, body {
			    margin: 0;
			    width: 100%;
			    height: 100%;
			    overflow: hidden;

				background: #fff;

    			position: relative;
				font-family: sans-serif;
				color: #414042;
			}

			.img-fundo{
				transform: translate(-50%, -50%);
				position: absolute;
				left: 50%;
				top: 50%;
			}

			#detalhe-exclusion{
			    mix-blend-mode: exclusion;
			}

			#detalhe-overlay{
			    mix-blend-mode: overlay;
			}

			.main-video {
			    position: absolute;
		    	display: flex;
		    	flex-direction: column;
		    	box-sizing: border-box;

			    width: 100%;
			    height: 100%;

			    font-size: 1vw;
			}

			#container-container{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -40%);

			    width: 45%;

			    display: flex;
			    box-sizing: border-box;
			    align-items: center;
			    flex-direction: inherit;
			}



			.top{
    			text-align: center;
			}

			.logo{
    			width: 14em;
			}

			.mid{
				line-height: 3em;
				text-align: center;
    			letter-spacing: 0.5em;
    			margin: 1.5em 0;
    			user-select: none;
    			color: #a3ada5;
			}

			.words{
    			font-size: 3.8em;
			}


			.iframe-container{
			    position: relative;
			    padding-bottom: 56.25%;
    			width: 100%;
			}

			iframe{
			    position: absolute;
			    top: 0;
			    width: 100%;
			    height: 100%;
			}

			.logo-holder{
				text-align: center;
			    width: 100%;
			}

			.logo-holder img{
			    width: 20%;
			    margin: 1em 0;
			    box-sizing: border-box;
			}

			.question-container, #ajax_form{
			    width: 100%;
			    margin-top: 1em;
			    display: flex;
			}

			.question-container input{
				border: none;
			    font-size: 0.8em;
			    flex: 1 0 0;
			    line-height: 1.6em;
			    box-sizing: border-box;
			    padding: 0.2em 0.5em;
    			border-radius: 1em 0 0 1em;
			}
			.question-container input:focus {
			    outline: none;
			}
			.question-container button{
			    border: none;
    background-color: goldenrod;
			    color: white;
			    font-weight: 300;
			    padding: 0 1.5em;
			    border-radius: 0 1em 1em 0;
			}

			.patros{
				position: absolute;
			    bottom: 0;
			    right: 0;
			    width: 15%;
			    padding: 2em;
			    text-align: right;
			    box-sizing: border-box;
			}

			.patros img{
			    width: 100%;
    			max-width: 140px;
			}

			.title-absolute{
				position: absolute;
			    top: 0;
			    left: 0;
			    padding: 2em 5em;
			    text-align: right;
			    box-sizing: border-box;
    			width: 35%;
			}

			.title-absolute img{
			    width: 100%;
    			max-width: 300px;
			}

			.title{
				color: white;
				font-size: 1.4em;
				text-align: center;
				margin-bottom: 0.5em;
			}
			@media (min-width: 320px) and (max-width: 1024px) and (orientation: portrait)  {
				#container-container{
				    width: 85%;
				    flex-direction: column;
    				padding: 2em;
				}
				.title-absolute{
					width: 100%;
				    text-align: center;
				}
				.title{
					font-size: 2.4vw;
				}
				.question-container input{
				    font-size: 1.2em;
				}
				.iframe-container{
	    			width: 100%;
				}

				.main-video {
				    padding: 4em 0;
				}
				
				.logo-holder{
					text-align: center;
				}
				
				.logo-holder img{
					width: 25%;
					margin: 0;
    				float: none;
    				margin: 3em;
				}
				.question-container{
					margin-top: 3em;
				}


				.question-container input{
					border: none;
				    font-size: 1.8em;
				    flex: 1 0 0;
				    line-height: 1em;
				    box-sizing: border-box;
				    padding: 0.2em 0.5em;
				}

				.question-container button{
				    margin-left: 0;
				    border: none;
				    font-size: 1.8em;
				    padding: 0 1.5em;
				    height: 100%;
				}
			}
			@media (max-width: 1024px) and (orientation: portrait)  {
				.patros{
					position: absolute;
				    bottom: 0;
				    right: initial;
				    left: 50%;
				    transform: translateX(-50%);
				    width: 22%;
				    padding: 0;
				    padding-bottom: 2em;
				}
			}
			@media (max-width: 720px) and (orientation: portrait)  {
				.patros{
					position: absolute;
				    bottom: 0;
				    right: initial;
				    left: 50%;
				    transform: translateX(-50%);
				    width: 33%;
				    padding: 0;
				    padding-bottom: 2em;
				}
			}
		</style>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
		<script type="text/javascript">
			jQuery(document).ready(function(){
				jQuery('#ajax_form').submit(function(){
					var dados = jQuery( this ).serialize();

					jQuery.ajax({
						type: "POST",
						url: "mensagem.php",
						data: dados,
						success: function( data )
						{
							alert('Mensagem enviada com sucesso!');
							document.form1.reset();
						}
					});
					
					return false;
				});
			});

			function windowSize(){
			    var w = document.documentElement.clientWidth;
			    var h = document.documentElement.clientHeight;
			    
			    console.log(w/h);

		    	if(w/h > 1.72){
			    	$(".img-fundo" ).css("width", "100%");
			    	$(".img-fundo" ).css( "height", "auto");
			    }else{
			    	$( ".img-fundo" ).css( "height", "100%");
			    	$( ".img-fundo" ).css( "width", "auto");
			    }
			};

			window.addEventListener("load", windowSize);
			window.addEventListener("resize", windowSize);
		</script>
	</head>
	<body>
		<img class="img-fundo" src="imgs/fundo_comp.jpg">
		<!-- <div class="title-absolute">
			<img src="imgs/tema-data.png">
		</div> -->
		<div class="main-video">
			<div id="container-container">
				<div class="top">
		    		<img class="logo" src="imgs/logo_living.png">
		    	</div>
	    		<!-- <div class="mid lgc">
	    			<span><span style="font-weight: bold;">UM PROJETO ESPECIAL CAPAZ DE UNIR</span><br><span class="words antro">tranquilidade </span> E <span class="words antro"> praticidade</span><br>EM UM ÚNICO LUGAR.</span>
	    		</div> -->
				<div class="iframe-container">
				    <iframe src="https://player.vimeo.com/video/450101742" gesture="media"  allow="encrypted-media" allowfullscreen></iframe>
				</div>
				<div class="question-container">
					<form name="form1" action="" method="post" id="ajax_form" />
						<input name="nome" type="hidden" id="nome" value="<?php echo $nome; ?>"/> 				
						<input name="email" type="hidden" id="email" value="<?php echo $email; ?>"/>
						<input id="mensagem" type="text" name="mensagem" placeholder="Escreva aqui a sua pergunta.">
						<button id="chatbtn" type="submit" name="enviar" onclick="apagaForm()" >ENVIAR</button> 		
					</form> 
				</div>
			</div>
		</div>
		<!-- <div class="patros">

			<img src="imgs/logo.png">
		</div> -->
	</body>
</html>