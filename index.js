import mysql2 from "mysql2";
import express from "express";
import bodyParser from "body-parser";

const connection = mysql2.createConnection({
    host: 'btrulvfcwwwirlzlddlt-mysql.services.clever-cloud.com',
    port: '3306',
    user: 'uisulxbknaj0shoi',
    password: '3DP00XWKuZwckMrm15GP',
    database: 'btrulvfcwwwirlzlddlt'
});

const app = express();
const PORT = 5000;
app.use(bodyParser.json())

initcon()
function initcon(){
app.listen(PORT,()=> {
    console.log("SERVER: http://localhost:${PORT}");
    connection.connect((err) =>{
        if(err) {
            console.log("DATABASE UNCONNECTED")
            throw err};
        console.log("DATABASE CONNECTED")
    })
})
}

app.use("/all",(req,res) =>{
    try {
    const sql_query = "select * from location";
    connection.query(sql_query,(err,result) =>{
        if (err) {
            console.log("DATABASE UNCONNECTED")
            if (connection = null)
                initcon()
           // throw err
        };
        const responseData = {
            success: true,
            data: result,
            message: "successfull"
            }
        res.send(responseData);
    })
    }
    catch (err) {
        const responseData = {
            success: false,
            data: null,
            message: err.message
        }
        res.status(500).json(responseData);
    }
})

 app.use("/list/:phoneNum", (req, res) => {
    try {
        const phoneNum = req.params.phoneNum;
        connection.query('SELECT * FROM location WHERE phoneNum = ?',[phoneNum], (err, result) => {
            if (err) {
                console.log("DATABASE UNCONNECTED")
                if (connection = null)
                    initcon()
                // throw err
            };
            const responseData = {
                success: true,
                data: result[0],
                message: "successfull"
            }
            res.send(responseData);
        })
    }
    catch (err) {
        const responseData = {
            success: false,
            data: null,
            message: err.message
        }
        res.status(500).json({ message: err.message });
    }
}) 

app.post('/',(req, res) => {
    var phoneNum = req.body.phoneNum;
    var lat = req.body.lat;
    var lng = req.body.lng;
    connection.query('INSERT INTO location (phoneNum,name,lastName,lat,lng,lastDate) VALUES ("' + phoneNum + '","","",' + lat + ',' + lng + ',null) ON DUPLICATE KEY UPDATE lat = ' + lat + ', lng = ' + lng + ', lastDate = date_add(now(), interval - 5 hour)', (err, results) => {
        if (err) {
            console.error(err);
            
                console.log("DATABASE UNCONNECTED")
                if (connection == null)
                    initcon()
                // throw err
            
            const responseData = {
                success: false,
                data: [],
                message: err.message
            }
            res.status(500).send(responseData);
        } else {
            const responseData = {
                success: true,
                data: [],
                message: "successfull"
            }
            res.status(200).send(responseData);
        }
    });
});