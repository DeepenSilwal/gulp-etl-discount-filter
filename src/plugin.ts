
var PluginError = require('plugin-error');
var through = require('through2'); 


export function myPlugin() {
  let returnErr: any = null;
    return through.obj(function(file: any, encoding: any, cb: Function) {
      const strArray = (file.contents as Buffer).toString().split(/\r?\n/);
      let tempLine: any
      let resultArray = []
      for(let dataIdx in strArray){
        try{
          let lineobj: any
          let tempLine: any
          if(strArray[dataIdx].trim() != ""){
            lineobj = JSON.parse(strArray[dataIdx])
            tempLine = handleline(lineobj)
            if(dataIdx != "0"){
              resultArray.push('\n');
            }
            if(tempLine){
              resultArray.push(JSON.stringify(tempLine));
            }
          }
        }
        
        catch(err){
          returnErr = new PluginError(err);
        }
      } 
      
      let data:string = resultArray.join('')
      file.contents = Buffer.from(data)
      cb(returnErr, file)

    });
};

function handleline(lineobj: any) {
  lineobj.record.price = lineobj.record.price - (10/100)* lineobj.record.price;
  return lineobj;
}