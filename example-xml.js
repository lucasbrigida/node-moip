var moip = require("./moip");
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
                //console.log(Resposta['ns1:EnviarInstrucaoUnicaResponse']['Resposta'][0]['Token'][0]);

                var resp = Resposta['ns1:EnviarInstrucaoUnicaResponse']['Resposta'][0];
                if(resp){
                        console.log("Acesse https://desenvolvedor.moip.com.br/sandbox/Instrucao.do?token=" + resp['Token'][0]);
                }

    });
