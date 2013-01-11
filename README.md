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
      xml: "<EnviarInstrucao>\
      <InstrucaoUnica>\
        <Razao>Razao da Cobranca</Razao>\
        <Valores>\
          <Valor moeda='BRL'>15.1</Valor>\
        </Valores>\
        <Comissoes>\
          <Comissionamento>\
            <Razao>Razao da Comissao</Razao>\
            <Comissionado>\
              <LoginMoIP>loginmoip</LoginMoIP>\
            </Comissionado>\
            <ValorPercentual>91.3</ValorPercentual>\
          </Comissionamento>\
        </Comissoes>\
        <FormasPagamento>\
          <FormaPagamento>CartaoCredito</FormaPagamento>\
          <FormaPagamento>CartaoDebito</FormaPagamento>\
        </FormasPagamento>\
        <Pagador>\
          <Nome>nome do comprador</Nome>\
          <Email>emailDoComprador@email.com</Email>\
          <IdPagador>Um ID Gerado por voce</IdPagador>\
        </Pagador>\
        <URLNotificacao>http://suaUrl/transactions/notification</URLNotificacao>\
        <URLRetorno>http://suaUrl/transactions</URLRetorno>\
      </InstrucaoUnica>\
    </EnviarInstrucao>"
    };

    Moip.send(payment, function(res){ 
			if(res["ns1:EnviarInstrucaoUnicaResponse"]) console.log(res["ns1:EnviarInstrucaoUnicaResponse"].Resposta); return;

			if(res['ns1:XMLFault']) console.log(res['ns1:XMLFault']);
			else console.log(res);

		});


Como Usar (2ª Opção)
--------------------

		var moip = require("/home/codestack/Projects/Node/express/api.goparty/moip");
		var data = {
			InstrucaoUnica : {
				Razao: "Go Party",
				Valores: {
					Valor: {
						_attr : { moeda : 'BRL' },
						_value : '15.1'
					}
				},
				Comissoes: {
					Comissionamento: {
						Razao: "Go Party / 50edce5d5c000001",
						Comissionado: {
							LoginMoIP: "grillobright@gmail.com"
						},
						ValorPercentual: "91.3"
					}
				},
				FormasPagamento: {
					FormaPagamento: ["CartaoCredito","CartaoDebito"] 
				},
				Pagador:{
					Nome: "lucas",
					Email: "lucas.carioca@live.com",
					IdPagador: "50ecb0c72000002"
				},
				URLNotificacao: "http://localhost:3000/transactions/notification",
				URLRetorno: "http://localhost:3000/transactions",
			}
		};

		var payment = {
			token: "01010101010101010101010101010101",
			appkey: "ABABABABABABABABABABABABABABABABABABABAB",
			mode: "identification",
			environment: "test",
			data: {root:"EnviarInstrucao", body:data }
		};

		var Moip = new moip.Moip();
		Moip.send(payment, function(res){ 
			if(res["ns1:EnviarInstrucaoUnicaResponse"]) console.log(res["ns1:EnviarInstrucaoUnicaResponse"].Resposta); return;

			if(res['ns1:XMLFault']) console.log(res['ns1:XMLFault']);
			else console.log(res);

		});


Parâmetros
----------

Atenção com os campos token, appkey, mode e environment no JSON.

  - Token, fornecido pela Moip
  - Appkey, fornecido pela Moip
  - Mode, modo de transação. (mode='basic' ou mode='integration')
  - Environment, modo de ambiente, ambiente de teste ou produção; (environment='test' ou environment='production')


Todo
----
Para a próxima versão adicionar suporte

  - Geração de XML através de JSON
  - Validação dos campos do JSON para gerar o XML 
  - Validar o XML


Conheça o [Moip]

  [Moip]: http://labs.moip.com.br/playground/
