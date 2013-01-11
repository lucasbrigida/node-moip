Node-Moip (Moip for Node JS)
----------------------------

O módulo provê o envio de formulários de cobrança, utilizando a interface XML da API Moip.

Como usar
---------

<code>
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
  console.log(res);
});

</code>

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