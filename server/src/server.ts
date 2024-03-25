import log from "./log"
import initializeMethod from "./methods/initialize";
import { RequestMessage } from "./types";

type Method = (message:RequestMessage ) => object;
const lookUpMethod: Record<string, Method> = {
  initialize: initializeMethod
}
let buffer = "";
process.stdin.on("data",(chunk)=>{

  // First we need to parse the chunk into a {id:number , method:string}
  //  We need to create buffer which can save the message because sometimes 
  // message is half way 
  buffer += chunk;    
  while (true){

    // Get the lenght of the message 
    const  lenghtContent = buffer.match(/Content-Length: (\d+)\r\n/);
    //Id there is no length stope reading  
    if (!lenghtContent) break;
    const lenght = parseInt(lenghtContent[1],10);
    const messgStart = buffer.indexOf("\r\n\r\n") + 4  

    // Continue until full message in the buffer
    // If buffer less than lengt of message means that message were proccessed  break
    if (buffer.length < messgStart + lenght) break;

    //[FILL IN]

    //process message
    const rawMessage = buffer.slice(messgStart , messgStart + lenght);
    const message = JSON.parse(rawMessage)

    // Write to file
    log.write({id:message.id , method:message.method})

    // Go find the method we need in the lookUpMethod oject 
    const method = lookUpMethod[message.method]

    //Respond to client with the specific method if exists
    if (method){
      response(method(message))
    }

    // Remover processed message from buffer  "" so it can break from the program
    buffer = buffer.slice(messgStart + lenght)
    }
});
