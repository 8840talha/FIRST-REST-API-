var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

const url = 'mongodb://localhost:27017/wikiDB';
mongoose.connect(url,{useUnifiedTopology:true,useNewUrlParser:true});
const articleSchema = {
    title:String,
    content:String

}

var Article=mongoose.model("Article",articleSchema)

app.get('/articles',(req,res)=>{
    Article.find({},function(err,foundArticles){
        if(!err){
            res.send(foundArticles);
        }
        if(err){
            throw err;
        }
    })
})
app.post('/articles',(req,res)=>{
    
    var newArticle = new Article({
         title : req.body.title,
         content : req.body.content
    })
    newArticle.save((err)=>{
        if(!err){
            res.send({talha:'rockstar'});
        }else{
            res.send(err);
        }
    });
})
app.delete('/articles',(req,res)=>{
    Article.deleteMany({},function(err){
    if(!err){
        res.send("deleted");
    }else{
        res.send(err);
    }    
    });

})

app.get('/articles/:Title',function(req,res){
    Article.findOne({title:req.params.Title},function(err,foundData){
        if(foundData){
            res.send(foundData)
        }else{
            res.send('not found')
        }
    })
})
app.put("/articles/:Title",function(req,res){
    Article.update({title:req.params.Title},{title:"shoulder",content:"deltoid"},function(err,foundItem){
        if(foundItem){
            res.send(foundItem)
        }else{
            res.send("error")
        }
    })
})
 
app.patch("/articles/:Title",function(req,res){
Article.findOneAndUpdate({title:req.params.Title},{content:req.body.content},function(err){
    if(!err){
        res.send("updated");
    }
})
})

app.delete("/articles/:Title",(req,res)=>{
    Article.deleteOne({title:req.params.Title},function(err){
        if(!err){
            res.send("Success")
        }else{
            res.send("Not deleted")
        }
    })
})
app.listen(3000,()=>{
    console.log('server running on 3000')
})