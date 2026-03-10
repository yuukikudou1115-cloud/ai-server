import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req,res)=>{
res.send("AIサーバーは正常に動いています");
});

app.post("/api", async (req,res)=>{

let idea=req.body.idea;

let prompt=`
高校生の発明アイデアを評価してください。

1 社会課題
2 良い点
3 改良点
4 新しいアイデア

発明
${idea}
`;

const response = await fetch("https://api.openai.com/v1/chat/completions",{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":"Bearer "+process.env.OPENAI_API_KEY
},
body:JSON.stringify({
model:"gpt-4o-mini",
messages:[{role:"user",content:prompt}]
})
});

const data=await response.json();

res.json({
reply:data.choices[0].message.content
});

});

app.listen(3000,()=>{
console.log("server start");
});
