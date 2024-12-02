
// import dependancy modules

const express = require('express');
const path = require('path');



// connect to MongoDB

const MongoClient = require('mongodb').MongoClient;

const { ObjectId } = require('mongodb');

// require your router (defined on the next page)
var apiRouter = require("./routes/api_router.js");
const app  = express();

// directory that has the images
const ImagesDir = path.join(__dirname, '..', 'public', 'Images');

// midleware to serve static files
app.use ('/Images', express.static(ImagesDir))

// midleware to handle missing files
app.use('/Images/*', (req, res, next) =>{
    res.status(404).json({error: 'image not found!'});

});



 // logging middleware
app.use(function(req, res, next){ // middleware
    console.log("In comes a" + req.method + "to" + req.url);
    next();
});
app.use(express.json());
app.set('port', 3000)
app.use((req, res, next) =>{

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");


    next();
   
})



let db;

MongoClient.connect('mongodb+srv://lk669:Lesotho1726@cluster0.jocm7ve.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', (err, client) =>{

    if (err){
        console.log("failed to connect to mongoDB client:", err);
    }
    db = client.db('Jazka')

});


app.param('collectionName', (req, res, next, collectionName) =>{
    req.collection = db.collection(collectionName)
    return next();
})


app.get('/collection/:collectionName', (req, res, next) =>{
    req.collection.find({}).toArray((error, results) =>{
        if (error){
            res.status(500).send(error);
            return next(error);
        }else{
            res.send(results);
        }
    })
})


app.post('/collection/:collectionName', (req, res, next) =>{
    req.collection.insert(req.body, (error, results) =>{
        if (error){
            res.status(500).send(error);
            return next(error)
        }else{
            // 
            res.send(results.ops);
        }
    })
})



app.put('/collection/:collectionName/:id', (req, res, next) =>{
    req.collection.update(
        {_id: new ObjectId(req.params.id)},
        {$set: req.body },
        {safe: true, multi: false},
        (error, result) =>{
            if(error){
                return next(error)
            }
            else{
                res.send((result.result.n === 1) ? {msg: 'success'} : {msg: 'error'})
            }
        }
    )
})




app.delete('/collection/:collectionName/:id', (req, res, next) =>{
    req.collection.deleteOne(
        {_id: new ObjectId(req.params.id)}, (error, result) =>{

            if(error){
                return next(error)
            }
            else{
                res.send((result.result.n === 1) ? {msg: "success"} : {msg:'error'})
            }
        },
       
    )
})


app.get('/collection/:collectionName/search', async (req, res, next) =>{
    try{
        if(req.query.name){
            console.log("query name:", req.query.name);
            
            let results = []
            if(req.query.name.includes(',') || req.query.name.includes(' ')) {
                results = await req.collection
                .aggregate([
                    {
                        $search: {
                            index: 'autocomplete', // setting which index
                            autocomplete: {
                                query: req.query.name, // query of the what the user enters
                                path: 'name', // the search name stored in each document
                                fuzzy: {
                                    maxEdits: 1, // users can be atleast 1 letter off
                                },
                                tokenOrder: "sequential",
                            }
                            
                        },
                        
                      
                        // crrating a limit of search options to 5
                    },
                    {
                        $limit: 5
                    },
                    {
                          // what we will show the user
                          $project: {
                            searchName: 1,
                            name: 1,
                            price: 1,
                            rating: 1,
                            img: 1,
                            space: 1,
                            isPopular: 1,
                            location: 1


                        },
                    },
                    
                ])
                
                .toArray()
                console.log("Aggregation results:", results)

                if (results.length > 0){
                    return res.send(results);

                }
                

                

            }

        }
        
        res.send({message: "no products found"})

    }catch (error){
        console.error(error)
        res.send({message: "error occured"}) // sending error

    }
})


const port = process.env.PORT || 3000

app.use(express.static('../public'));


app.use('/api', apiRouter)

app.listen(port)
