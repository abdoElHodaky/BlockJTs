import Router from "express"
import {chain,explorer} from "./app"
import {Address} from "./User"
export const routes=Router()
let request=require("request")
routes.get("/genAddress",(req,res)=>{
  /*
   #swagger.tags=["Wallet"]
   
  */
  let address=chain.createAddress()
  console.log(address)
  res.json({
    address: address
  })
})

routes.post("/createTrans",(req,res)=>{
  /*
   #swagger.tags=["Wallet"]
   #swagger.parameters["body"]={
    in :'body',
    schema:{
      $amount:300,
      sender:{
        $address:"88"
      },
      receiver:{
        $address:"99"
      }
    }
   }
  */
  let sender=req.body.sender
  let receiver=req.body.receiver
  let amount:number=req.body.amount
  //let addsender=new Address(sender)
 // addsender.
  sender.setTransfer(chain)
  receiver.setTransfer(chain)
  sender.transferTo(receiver,amount)
  request.post({
    url:"/confirm",
    function (error, response, body){
      res.send(body)
    }
  })
  res.status(200).json(
    [...sender.transferHistory.reverse()]
  )
})

routes.get("/explorer/AllTrans",(req,res)=>{
  /*
    #swagger.tags=["Explorer"]
  */
  res.json(explorer.getTrans())
})

routes.post("/confirm",(req,res)=>{
  if(chain.pending_trans.length>=chain.maxTrans)
  { chain.confirm()
    chain.syncT()
    res.end("confirmed")
  }
  else
    res.end("")
  
})
