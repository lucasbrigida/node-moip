/*
 *	Module to Moip API
 *
 *	@author Lucas Pereira Brigida <a href="http://github.com/lucasbrigida"></a>
 *	
 *	@license <a href="http://www.opensource.org/licenses/bsd-license.php">BSD License</a>
 *
 *
*/

/*
 *	Dependencies
*/

var xml2js = require('xml2js');
var data2xml_convert = require('data2xml')();


function Moip(){
	var self = this;
	this.environment= "test";
	
	this.send = function(payment, callback){
		//if(payment.environment) return(new Payment(environment, payment).validate().send());		validate(); --> Not Implemented
		if(payment.environment){
			if(callback) return(new Payment(payment).send(callback));
			else return(new Payment(payment));
		}
		else{ 
			payment.environment = self.environment;
			if(callback) return(new Payment(payment).send(callback));
			else return(new Payment(payment));
		}
	}

	return(this);
}


function Payment(payment){

	var self = this;
	var	payment = payment;

	this.XML = null;
	this.environment = payment.environment;

	(function createPayment(){
		if(payment.xml){ 
			self.XML = payment.xml;
			return; 
		}		
		
		if(payment.data){
			//Generate XML (Basic Payment)
			self.moip_payment = data2xml_convert("EnviarInstrucao", payment.data);
			self.XML = self.moip_payment;
		}
		else throw('"data" variable undefined. Use data = json');

	})();


	this.validate = function(){
		switch(payment.mode){
			case 'identification': {
				if(payment.xml) var xml = payment.xml;
				else var xml = self.moip_payment;
					
				// Validar XML gerado em xml(variável)
				self.XML = xml;
				var validation = true;
				return(validation); // Retornar true ou false

			} break;
			default: {
				if(payment.xml) var xml = payment.xml;
				else var xml = self.moip_payment;
						
				// Validar XML gerado em xml(variável)
				self.XML = xml;
				var validation = true;
				return(validation); // Retornar true ou false

			} break;
		}
	}


	this.send = function(callback){ 
		if(callback){
			if(typeof(callback) === 'function'){ 
				
				return(new Sender().send({
					environment: self.environment,
					xml: self.XML,
					token: payment.token,
					appkey: payment.appkey
				}, callback));
			}
			else{ 
				return(new Sender().send({
					environment: self.environment,
					xml: self.XML,
					token: payment.token,
					appkey: payment.appkey
				}));
			}
		}
	}

	return(this);
}


function Sender(){

	var self = this;
	var https = require("https");
	this.response = null;
	this.received = false;
	

	this.send = function(options, callback){
		if(callback){
			if(typeof(callback) === 'function'){

				if(options.environment === 'test'){
					var url = 'desenvolvedor.moip.com.br'
  					, path = "/sandbox/ws/alpha/EnviarInstrucao/Unica";
				}else{
					var url = 'www.moip.com.br'
  					, path = "/ws/alpha/EnviarInstrucao/Unica";
				}
				//Verificar o environment, definir url e  realizar os procedimentos de Envio

				self.sendRaw({
					url: url,
					path: path,
					xml: options.xml,
					appkey: options.appkey,
					token: options.token,
					callback: callback			
				});
				
				return;
			}
		}
		else{
			//Verificar o environment, definir url e  realizar os procedimentos de Envio
				if(options.environment === 'test'){
					var url = 'desenvolvedor.moip.com.br'
  					, path = "/sandbox/ws/alpha/EnviarInstrucao/Unica";
				}else{
					var url = 'www.moip.com.br'
  					, path = "/ws/alpha/EnviarInstrucao/Unica";
				}

				self.sendRaw({
					url: url,
					path: path,
					xml: options.xml,
					appkey: options.appkey,
					token: options.token	
				});

			return;
		}
	}

	
	this.sendRaw = function(options){
		/*	@options = {
					url: "A Moip url to send payment data",
					path: "Path to Moip URL",
					xml: "The Payment XML",
					appkey: "The App Key provide by Moip",
					token: "The Token provide by Moip",
					callback: "Is NOT required"			
				};
		*/

		//console.log(options.xml);

		var https_options = {
			host: options.url,
			path: options.path,
			method: 'POST',
			auth: options.token + ':' + options.appkey
		};

		var req = https.request(https_options, function(res){

			res.on('data', function(chunck){
				var parser = new xml2js.Parser();

				parser.parseString(chunck.toString(), function (err, result) {

					if(err){
						console.log('[MOIP_MODULE_ERROR]: ',err);
						console.log('[MOIP_MODULE_RESULT]:',result);
						options.callback(null); 
						return;
					}

					var Resposta = result;
					if(options.callback){
						if(typeof(options.callback) === 'function'){
							var _callback = options.callback;
							if(Resposta) _callback(Resposta);
							else _callback(null);
						}
					}

					self.received = true;
	        		self.response = Resposta;
		    	});
			});
		});

		req.write(options.xml);
		req.end();
		
	};

	return(this);
}


exports.Moip = Moip;
exports.Payment = Payment;
exports.Sender = Sender;
