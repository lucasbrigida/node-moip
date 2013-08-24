var moip = require("./moip");
		
	var payment = {
	  token: "01010101010101010101010101010101",
	  appkey: "ABABABABABABABABABABABABABABABABABABABAB",
	  mode: "identification",
	  environment: "test",
	  data: {
		  InstrucaoUnica : {
	      Razao: "Razão / Motivo do pagamento",
		      Valores: {
		          Valor: {
		              _attr : { moeda : "BRL" },
		              _value : "1.00"
		          }
	      },
	      FormasPagamento: {
	          FormaPagamento: ["CartaoCredito","CartaoDebito"] 
	      },
	      Pagador:{
	        Nome: "José da Silva",
	        Email: "ze.silva@email.com",
	        IdPagador: "ze.silva1",
	        EnderecoCobranca:{
	        	Numero: "171",
	        	TelefoneFixo: "(11)3165-4020",
	        	CEP: "01452-000",
	        	Pais: "BRA",
	        	Estado: "SP",
	        	Bairro: "Itain Bibi",
	        	Cidade: "São Paulo",
	        	Logradouro: "Av. Brigadeiro Faria Lima"
	        }
	      },
	      URLNotificacao: "http://www.seuSite/transactions/notification",
	      URLRetorno: "http://www.seuSite/transactions",
		  }
		}
	};

	var Moip = new moip.Moip();
	Moip.send(payment, function(Resposta){ 
		console.log(Resposta);
		//console.log(Resposta['ns1:EnviarInstrucaoUnicaResponse']['Resposta'][0]['Token'][0]);
		
		var resp = Resposta['ns1:EnviarInstrucaoUnicaResponse']['Resposta'][0]; 
		if(resp){
			console.log("Acesse https://desenvolvedor.moip.com.br/sandbox/Instrucao.do?token=" + resp['Token'][0]);
		}
	});
