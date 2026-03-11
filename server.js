import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
res.send("AIサーバーは正常に動いています");
});

app.post("/ai", async (req,res)=>{

const idea = req.body.idea;

try{

const response = await fetch("https://api.openai.com/v1/chat/completions",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${process.env.OPENAI_API_KEY}`
},

body:JSON.stringify({

model:"gpt-4o-mini",

messages:[{
role:"system",
content:"あなたは発明コンテストの審査員です。高校生の発明を評価してください。"
},
{
role:"user",
content:`次の発明アイデアを評価してください。

発明:
${idea}

以下の形式で回答してください。

①新規性（10点満点）
②実現可能性（10点満点）
③社会貢献（10点満点）
④改善アドバイス
`
}]

})

});

const data = await response.json();

const advice = data.choices[0].message.content;

res.json({advice: advice});

}catch(e){

res.json({
advice:"AI評価に失敗しました。APIキーを確認してください。"
});

}

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
console.log("server running");
});
