import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req,res)=>{
res.send("AIサーバーは正常に動いています");
});

app.post("/api",(req,res)=>{
res.json({reply:"AIテスト成功"});
});

app.listen(3000,()=>{
console.log("server start");
});
