
import "reflect-metadata";
import application from "express"
import { json,urlencoded } from "express";
import cors from "cors";
import {Chain} from "./Chain"
import {Explorer} from "./Explorer"
//import { AppDataSource } from "./_datasource";
//import { apiv1 } from "./routes";
const app=application();
const port = process.env.PORT||3000
const chain= new Chain()
const explorer=new Explorer(chain)
app.use(urlencoded({extended: true}))
app.use(cors())
app.use(json())
//app.use(apiv1)
//const express = require('express');
const path = require('path')
const express=require("express")
app.use(express.static("/"))
app.get("/getAddress",(req,res)=>{
  let address:any=chain.createAddress()
  res.json(address)
})
app.post("/:sender/createTrans",(req,res)=>{
  let sender=req.params.sender
  let receiver=req.body.receiver
  let amount=req.body.amount
  chain.syncT()
  res.status(200).end("done")
})
app.get("/explore/AllTrans",(req,res)=>{
  res.json(explorer.getTrans())
})
app.use((error:any, req:any, res:any, next:any) => {
  console.log(error)
  console.log("Error Handling Middleware called")
  console.log('Path: ', req.path)
  next() // (optional) invoking next middleware
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;
