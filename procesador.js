var fs = require('fs');
var iconv = require('iconv-lite');
var csv             = require('fast-csv');
var csvStream = csv.createWriteStream({headers: true , delimiter : ';'}),
    writableStream = fs.createWriteStream("csv30.csv");
 
writableStream.on("finish", function(){
  console.log("DONE!");
});

csvStream.pipe(writableStream);
var buf = fs.readFileSync('prueba.log' , 'binary');




var textos;
var x = 0;
var mensajes = {
    fecha : '',
    numero : '',
    mensaje : ''
};
buf.toString().split(/\n/).forEach(function(line){
  // do something here with each line

  
  var n = line.indexOf("dstAddress->");
  var m = line.indexOf("srcTON->");
  var tlf = line.substring(n + 13 , m - 2);
  n = line.indexOf("[");
  m = line.indexOf("]");
  var timestamp =  line.substring(n + 1 , m);
  
  n = line.indexOf("text->");
  m = line.indexOf("dataCoding->");
  
  var sms = line.substring(n + 7 , m - 2);

  console.log("total " + x);
  x++;
  
  

  mensajes = {
        fecha : timestamp.toString(),
        numero : tlf.toString(),
        mensaje : sms.toString()
    };
    

  
csvStream.write({fecha : mensajes.fecha , numero : mensajes.numero , mensaje : mensajes.mensaje , longitud : mensajes.mensaje.length});

    
  
});

csvStream.end();

    
