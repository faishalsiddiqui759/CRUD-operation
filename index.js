const express = require("express");
const app = express();
const { v4 : uuidv4 } = require("uuid");
let port = 8080;
const path = require("path");



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));

let posts = [
    {   id: uuidv4(),
        username: "Faishal Siddiqui",
        content: " I am pursuing b.tech degree from reputed institude 'NATIONAL INSTITUTE OF TECHNOLOGY,M SRINAGAR'"

    },
    {   id: uuidv4(),
        username: "Taufik Siddiqui",
        content: " I am currently working on youtube content"
    },
    {   id: uuidv4(),
        username: "Shafeeq Siddiqui",
        content: " Hello i there i am excited to share that i am creating youtube content."
    }
];

app.get("/posts", (req, res)=>{
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res)=>{
    res.render("new.ejs");
});

app.post("/posts", (req, res)=>{
  let {username, content} = req.body;
  let id = uuidv4();
  posts.push({username, content, id});
  res.redirect("http://localhost:8080/posts");
});

app.get("/posts/:id", (req, res)=>{
    let { id } = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("show.ejs", {post});
});

app.listen(port, ()=>{
    console.log("app is listening on port", port);
});