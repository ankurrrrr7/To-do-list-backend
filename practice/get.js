const express = require("express");
const app = express();


const users = [{
    name:"Deepanshu",
    Kidneys: [{
            healthy: false
    }]
 }]
app.use(express.json());
app.get("/", function(req,res){
    const Deepanshukidneys = users[0].Kidneys;
    const numberOfKidneys = Deepanshukidneys.length;
    let healthyKidneys =0;
    for(let i =0; i<numberOfKidneys; i++){
        if(Deepanshukidneys[i].healthy){
            healthyKidneys = healthyKidneys+1;
        }
    }
    const numberOfUnhealthykidneys = numberOfKidneys - healthyKidneys;

    res.json({
        numberOfKidneys,
        healthyKidneys,
        numberOfUnhealthykidneys
    })
})
app.post("/", function(req,res){
    const ishealthy = req.body.ishealthy;
    users[0].Kidneys.push(
        {
            healthy: ishealthy
        }
    )
    res.json({
        msg: "Done"
    })
})
app.put("/", function(req, res){
    for(let i =0; i<users[0].Kidneys.length; i++){
        users[0].Kidneys[i].healthy = true;
    }
    res.json({})
})
app.delete("/", function(req, res){
    if(isThereAnyUnhealthyKidney()){
        const newKidneys =[]
        for(let i =0; i<users[0].Kidneys.length; i++){
            if(users[0].Kidneys[i].healthy){
                newKidneys.push({
                    healthy: true
                })
            }
    
        }
        users[0].Kidneys = newKidneys;
        res.json({msg : "done"})
    }  
    else{
        res.status(411).json({
            msg:"Syntax error"
        })
    }
})


function isThereAnyUnhealthyKidney(){
    let atleasonehealthykidney = false;
    for(let i =0; i<users[0].Kidneys.length; i++){
        if(!users[0].Kidneys[i].healthy){
            atleasonehealthykidney = true;
        }
    }       
    return atleasonehealthykidney;
}
 app.listen(3000)