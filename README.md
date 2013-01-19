Node-Moip (Moip for Node JS)
----------------------------

O módulo provê o envio de formulários de cobrança, utilizando a interface XML da API Moip.

Instalar
--------
    npm install node-moip


Como usar (1ª Opção)
--------------------

    var moip = require("moip");
    var payment = {
      token: "01010101010101010101010101010101",
      appkey: "ABABABABABABABABABABABABABABABABABABABAB",
      mode: "identification",
      environment: "test",
      xml: '<EnviarInstrucao>\
		    <InstrucaoUnica TipoValidacao="Transparente">\
		        <Razao>Razão / Motivo do pagamento</Razao>\
		        <Valores>\
		            <Valor moeda="BRL">1.00</Valor>\
		        </Valores>\
		        <IdProprio></IdProprio>\
		        <Pagador>\
		           <Nome>Nome Sobrenome</Nome>\
		           <Email>nome.sobrenome@dominio.com.br</Email>\
		           <IdPagador>cliente_id</IdPagador>\
		           <EnderecoCobranca>\
		               <Logradouro>Av. Brigadeiro Faria Lima</Logradouro>\
		               <Numero>2927</Numero>\
		               <Complemento>Ed.</Complemento>\
		               <Bairro>Itain Bibi</Bairro>\
		               <Cidade>São Paulo</Cidade>\
		               <Estado>SP</Estado>\
		               <Pais>BRA</Pais>\
		               <CEP>01452-000</CEP>\
		               <TelefoneFixo>(11)3165-4020</TelefoneFixo>\
		           </EnderecoCobranca>\
		       </Pagador>\
		    </InstrucaoUnica>\
		</EnviarInstrucao>'
    };

    var Moip = new moip.Moip();
    Moip.send(payment, function(Resposta){ 
			console.log(Resposta);

			if(Resposta)
				console.log("Acesse https://desenvolvedor.moip.com.br/sandbox/Instrucao.do?token=" + Resposta.Token);

		});


Como Usar (2ª Opção)
--------------------

		var moip = require("moip");
		
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

			if(Resposta)
				console.log("Acesse https://desenvolvedor.moip.com.br/sandbox/Instrucao.do?token=" + Resposta.Token);
		});



Parâmetros
----------

Atenção com os campos token, appkey, mode e environment no JSON.

  - Token, fornecido pela MOIP
  - Appkey, fornecido pela MOIP
  - Mode, modo de transação. (mode='basic' ou mode='identification')
  - Environment, modo de ambiente, ambiente de teste ou produção; (environment='test' ou environment='production')
  - Xml, Formulário em XML puro no formato de String na formatação proposta pela API do MOIP
  - Data, Um JSON estruturado como proposto pelo módulo "[data2xml]"


Todo
----
Para a próxima versão adicionar suporte

  - Validação dos campos do JSON para gerar o XML 
  - Validar o XML


Conheça o [Moip]

  [Moip]: http://labs.moip.com.br/playground/
  [data2xml]: https://npmjs.org/package/data2xml