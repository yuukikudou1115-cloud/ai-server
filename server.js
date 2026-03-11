import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req,res)=>{
res.send("AIサーバーは正常に動いています");
});

app.post("/ai", async (req,res)=>{

try{

const idea = req.body.idea;

const completion = await client.chat.completions.create({
model:"gpt-4o-mini",
messages:[
{
role:"system",
content:"あなたは発明コンテストの審査員です。高校生の発明アイデアを評価してください。"
},
{
role:"user",
content:`次の発明アイデアを評価してください。

発明アイデア:
${idea}

以下の形式で答えてください。

①新規性（10点満点）
②実現可能性（10点満点）
③社会貢献（10点満点）
④改善アドバイス
`
}
]
});

res.json({
advice:completion.choices[0].message.content
});

}catch(error){

console.log(error);

res.json({
advice:"AI評価でエラーが発生しました"
});

}

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
console.log("server running");
});
