const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
 
const request = require('request')
const mysql = require('mysql');
const jsonParser = bodyParser.json()

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods','POST, GET, PUT, PATCH, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers','Content-Type, x-access-token');
    res.header('Access-Control-Allow-Credentials', true);
   
    next();
});

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '12345678',
    database : 'urine'
});
 
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
 

  // date Time
  let ts = Date.now();

  let date_ob = new Date(ts);

  let hours = date_ob.getHours();
  let minu = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();

 // let date = date_ob.getDate();
 // let month = date_ob.getMonth() + 1;
 // let year = date_ob.getFullYear();

 let date = '24';
 let month = '02';
 let year = '2020';

  const  date_sum = year + "-" + month + "-" + date ;
  const  dateFull_sum = hours + ":" + minu + ":" + seconds;



  function isValidate (data){
    if(data == null || data == ''  || data == undefined) {
        return false;
    }
    return true;
}

// regiter
app.post('/api/regiter/addMility',jsonParser, inserMility);      //เพิ่มข้อมูลทหาร
app.post('/api/regiter/updateMility',jsonParser, updateMility);  //แก้ไขข้อมูลทหาร
//app.get('/api/deleteMility',);                          //ลบข้อมูลทหาร    ##########################################################

// Screen
app.get('/api/addColorURSersor', reqArduino); 
//app.get('/api/addColorURSersor',addColorUR_Sersor);
app.get('/api/ScreenTableAll', screenTablrAll); 
app.get('/api/Screen/boxCount', countBox);  

// patine  
app.get('/api/patinet/search/:platoon/:numPlatoon',searchPatinet);
app.get('/api/patinet/showTable',showTable);
app.get('/api/patinet/searchPatinetByID/:id',searchPatinetByID);
app.post('/api/patinet/add',jsonParser,addTablePatinet);
app.post('/api/patient/UpDate',jsonParser,upDatePatinet);

//***************** regiter ********************** 
function inserMility(req, res){
    var nTable  = [];
    var nValue  = [];

  //  console.log("req.body.name : "+req.body.m_narcotic);

        if(isValidate(req.body.m_name)){
            nTable.push("m_name" );
            nValue.push(`"`+req.body.m_name+ `"`);
        }

        if(isValidate(req.body.m_l_name)){
            nTable.push("m_l_name");
            nValue.push(`"`+req.body.m_l_name+ `"`);
        }

        if(isValidate(req.body.m_birthday)){
            nTable.push("m_birthday");
            nValue.push(`'`+req.body.m_birthday+ `'`);    
        }

        if(isValidate(req.body.m_district)){
            nTable.push("m_district");
            nValue.push(`"`+req.body.m_district+ `"`);    
        }

        if(isValidate(req.body.m_prefecture)){
            nTable.push("m_prefecture");
            nValue.push(`"`+req.body.m_prefecture+ `"`);    
        }

        if(isValidate(req.body.m_province)){
            nTable.push("m_province");
            nValue.push(`"`+req.body.m_province+ `"`);    
        }


        if(isValidate(req.body.m_weight)){
            nTable.push("m_weight");
            nValue.push(req.body.m_weight);
        }
        
        if(isValidate(req.body.m_high)){
            nTable.push("m_high");
            nValue.push(req.body.m_high);    
        }

        if(isValidate(req.body.m_bml)){
            nTable.push("m_bml");
            nValue.push(`"`+req.body.m_bml+ `"`);    
        }

        if(isValidate(req.body.m_blood_pressure)){
            nTable.push("m_blood_pressure");
            nValue.push(`"`+req.body.m_blood_pressure+ `"`);    
        }

        if(isValidate(req.body.m_pulse)){
            nTable.push("m_pulse");
            nValue.push(`"`+req.body.m_pulse+ `"`);    
        }

        if(isValidate(req.body.m_career)){
            nTable.push("m_career");
            nValue.push(`"`+req.body.m_career+ `"`);    
        }

        if(isValidate(req.body.m_congenital_disease)){
            nTable.push("m_congenitalDisease");
            nValue.push(`"`+req.body.m_congenital_disease+ `"`);    
        }

        if(isValidate(req.body.m_Illness)){
            nTable.push("m_Illness");
            nValue.push(`"`+req.body.m_Illness+ `"`);    
        }

        if(isValidate(req.body.m_medication)){
            nTable.push("m_medication");
            nValue.push(`"`+req.body.m_medication+ `"`);    
        }

        if(isValidate(req.body.m_drinking)){
            nTable.push("m_drinking");
            nValue.push(`"`+req.body.m_drinking+ `"`);    
        }

        if(isValidate(req.body.m_injury)){
            nTable.push("m_injury");
            nValue.push(`"`+req.body.m_injury+ `"`);    
        }

        if(isValidate(req.body.m_use_drugs)){
            nTable.push("m_use_drugs");
            nValue.push(`"`+req.body.m_use_drugs+ `"`);    
        }

        if(isValidate(req.body.m_narcotic)){
            nTable.push("m_narcotic");
            nValue.push(`"`+req.body.m_narcotic+ `"`);    
        }

        if(isValidate(req.body.m_weight_loss)){
            nTable.push("m_weight_loss");
            nValue.push(`"`+req.body.m_weight_loss+ `"`);    
        }
 

    const sql = `INSERT INTO table_military  (`+nTable+`) VALUES (`+nValue+`)`
        
    console.log("INSERT regiter : "+sql);
   /* connection.query(sql,(err,result) => {
        if (err) throw err;
            res.sendStatus(200);
    }); */

}

function updateMility(req, res){
    var nValue  = [];
    var id = 0;
        if(isValidate(req.body.id) == true){
            id = req.body.id
        }

        if(isValidate(req.body.cardID) == true){
            nValue.push("m_cardID = " +req.body.cardID);
        }

        if(isValidate(req.body.name) == true){
            nValue.push("m_name = "+req.body.name);
        }

        if(isValidate(req.body.lastName)){
            nValue.push("m_lastName = "+req.body.lastName);
        }

        if(isValidate(req.body.age)){
            nValue.push("m_age = "+req.body.age);
        }

        if(isValidate(req.body.weight)){
            nValue.push("m_weight = "+req.body.weight);
        }
        
        if(isValidate(req.body.height)){ 
            nValue.push("m_height = "+req.body.height); 
        }

        if(isValidate(req.body.bmi)){  
            nValue.push("m_bmi = "+req.body.bmi); 
        }

        if(isValidate(req.body.bloodType)){
            nValue.push("m_bloodType = "+req.body.bloodType);   
        }

        if(isValidate(req.body.birthday)){
            nValue.push("m_birthday = "+req.body.birthday);   
        }

        if(isValidate(req.body.prefecture)){
            nValue.push("m_prefecture = "+req.body.prefecture);     
        }

        if(isValidate(req.body.district)){  
            nValue.push("m_district = "+req.body.district);     
        }

        if(isValidate(req.body.m_province)){  
            nValue.push("m_province = "+req.body.province);      
        }

        if(isValidate(req.body.m_tel)){
            nValue.push("m_tel = "+req.body.tel);        
        }

        if(isValidate(req.body.m_pulse)){
            nValue.push("m_pulse = "+req.body.pulse);          
        }

        if(isValidate(req.body.m_bloodPressure)){
            nValue.push("m_bloodPressure = "+req.body.bloodPressure);            
        }

        if(isValidate(req.body.m_Illness)){ 
            nValue.push("m_Illness = "+req.body.Illness);
        }

        if(isValidate(req.body.m_status)){
            nValue.push("m_status = "+req.body.status);  
        }

        if(isValidate(req.body.m_maintenance_rights)){   
            nValue.push("m_maintenance_rights = "+req.body.maintenance_rights);  
        }

        const sql = `UPDATE table_militia
                     SET `+nValue+` WHERE ` +id

        console.log("UPDATE  Militia :"+sql);
        connection.query(sql,(err,result) => {
            if (err) throw err;
                res.sendStatus(200);
        }); 
}

//***************** screen ********************** 
function reqArduino(req, res) {
   // if(isValidate(req.query.numplatoon) || isValidate(req.query.sensorValue)){
        var queryNumPlatoon = req.query.numplatoon; //concat plutoon Ex `A33`
        var colorUR = req.query.colorUR;
        var platoon = queryNumPlatoon.slice(0, 1);
        var numplatoon = queryNumPlatoon.slice(1, 3);
        var valueTime;
        if(dateFull_sum >= '05:30:00' && dateFull_sum <= '07:30:00'){
            valueTime = 1
        }else if(dateFull_sum >= '11:30:00' && dateFull_sum <= '13:30:00'){
            valueTime = 2
        }else if(dateFull_sum >= '17:30:00' && dateFull_sum <= '23:30:00'){
            valueTime = 3
        }
    
        var  sql = ` 
            INSERT INTO  urine(   
                ur_id
                , ur_value
                , ur_date
                , time_id
                , m_id) 
            VALUES (
                    (SELECT m_id FROM table_militia   WHERE m_platoon = `+platoon+` AND m_numPlatoon = `+numplatoon+`)
                    ,`+colorUR+`
                    , `+date_sum+`
                    ,`+valueTime+`
                    , (SELECT m_id FROM table_militia   WHERE m_platoon = `+platoon+` AND m_numPlatoon = `+numplatoon+`)
                    )`

        console.log("reqArduino : "+sql);
        
}                                  

function screenTablrAll(req, res) {
    var  sql = `SELECT  
            m.m_id, 
            m.m_name, 
            m.m_lastName ,
            m.m_platoon,
            m.m_numPlatoon , 
            t.tem_value, 
            t.tem_date,
            t.time_id, 
            u.ur_value,
            u.ur_date,
            u.time_id
        FROM table_militia AS m 
        INNER JOIN temperature AS t ON t.tem_id = m.m_id 
        INNER JOIN urine AS u ON u.ur_id = m.m_id 
        WHERE  u.ur_date = '`+date_sum+`' AND t.tem_date = '`+date_sum+`'`

    console.log("screenTablrAll : "+sql);
    connection.query(sql,(err,result) => {
        if (err) throw err;
        res.json(result); 
    });
}


//***************** patinet ********************** 
function searchPatinet(req, res) {
    var m_platoon = isValidatedNull(req.params.platoon);
    var m_numPlatoon = isValidatedNull(req.params.numPlatoon);
    
    var sql = `SELECT * FROM table_military 
                WHERE 
                m_platoon = '`+m_platoon+`' 
                AND 
                m_numPlatoon = `+m_numPlatoon;

    console.log("searchPatinetSQL : "+sql);
    connection.query(sql,(err,result) => {
        if (err) throw err;   
            res.json(result); 
    });
}

function showTable(req, res) {
    
        var sql = `SELECT 
            m.id,
            m.m_platoon,
            m.m_numPlatoon,
            m.m_name,
            m.m_l_name,
            m.m_congenital_disease,
            p.patientId,
            p.p_temperature,
            p.p_pulse,
            p.p_respiration,
            p.p_blood_pressure,
            p.p_o2set,
            p.p_symptom,
            p.p_send,
            p.p_data_send
        FROM  table_patients AS p 
        INNER JOIN table_military AS m ON  m.id = p.patientId
        WHERE   p.p_send <> 'กลับไปฝึก' `

            console.log("showTable : "+sql);
            connection.query(sql,(err,result) => {
                if (err) throw err;
                res.json(result); 
            });
    
}

function addTablePatinet(req, res) {
    var nTable  = [];
    var nValue  = [];
    
    console.log('addTablePatinet'); 

    if(isValidate(req.body.patientId)){
        nTable.push("patientId" );
        nValue.push(req.body.patientId);
    }

    if(isValidate(req.body.p_temperature)){
        nTable.push("p_temperature" );
        nValue.push(`"`+req.body.p_temperature+ `"`);
    }

    if(isValidate(req.body.p_pulse)){
        nTable.push("p_pulse" );
        nValue.push(`"`+req.body.p_pulse+ `"`);
    }

    if(isValidate(req.body.p_respiration)){
        nTable.push("p_respiration" );
        nValue.push(`"`+req.body.p_respiration+ `"`);
    }

    if(isValidate(req.body.p_bood_pressure)){
        nTable.push("p_blood_pressure" );
        nValue.push(`"`+req.body.p_bood_pressure+ `"`);
    }

    if(isValidate(req.body.p_o2set)){
        nTable.push("p_o2set" );
        nValue.push(`"`+req.body.p_o2set+ `"`);
    }

    if(isValidate(req.body.p_symptom)){
        nTable.push("p_symptom" );
        nValue.push(`"`+req.body.p_symptom+ `"`);
    }

    if(isValidate(req.body.p_treatment)){
        nTable.push("p_treatment" );
        nValue.push(`"`+req.body.p_treatment+ `"`);
    }

    if(isValidate(req.body.p_DrOpinion)){
        nTable.push("p_DrOpinion" );
        nValue.push(`"`+req.body.p_DrOpinion+ `"`);
    }

    if(isValidate(req.body.p_send)){
        nTable.push("p_send" );
        nValue.push(`"`+req.body.p_send+ `"`);
    }

    if(isValidate(req.body.p_data_send)){
        nTable.push("p_data_send" );
        nValue.push(`'`+req.body.p_data_send+ `'`);
    }

    if(isValidate(req.body.p_operative)){
        nTable.push("p_operative" );
        nValue.push(`"`+req.body.p_operative+ `"`);
    }

    var sql = `INSERT INTO table_patients ( `+nTable+`) VALUES ( `+nValue+` )`
    console.log('SQL : ' +sql);

   connection.query(sql,(err,result) => {
        if (err) throw err;
               res.json(result); 
    });  
}

function upDatePatinet(req, res) {
    var nTable  = [];
    var nValue  = [];
    
    console.log('addTablePatinet'); 

    if(isValidate(req.body.patientId)){
        nTable.push("patientId" );
        nValue.push(req.body.patientId);
    }

    if(isValidate(req.body.p_temperature)){
        nTable.push("p_temperature" );
        nValue.push(`"`+req.body.p_temperature+ `"`);
    }

    if(isValidate(req.body.p_pulse)){
        nTable.push("p_pulse" );
        nValue.push(`"`+req.body.p_pulse+ `"`);
    }

    if(isValidate(req.body.p_respiration)){
        nTable.push("p_respiration" );
        nValue.push(`"`+req.body.p_respiration+ `"`);
    }

    if(isValidate(req.body.p_bood_pressure)){
        nTable.push("p_blood_pressure" );
        nValue.push(`"`+req.body.p_bood_pressure+ `"`);
    }

    if(isValidate(req.body.p_o2set)){
        nTable.push("p_o2set" );
        nValue.push(`"`+req.body.p_o2set+ `"`);
    }

    if(isValidate(req.body.p_symptom)){
        nTable.push("p_symptom" );
        nValue.push(`"`+req.body.p_symptom+ `"`);
    }

    if(isValidate(req.body.p_treatment)){
        nTable.push("p_treatment" );
        nValue.push(`"`+req.body.p_treatment+ `"`);
    }

    if(isValidate(req.body.p_DrOpinion)){
        nTable.push("p_DrOpinion" );
        nValue.push(`"`+req.body.p_DrOpinion+ `"`);
    }

    if(isValidate(req.body.p_send)){
        nTable.push("p_send" );
        nValue.push(`"`+req.body.p_send+ `"`);
    }

    if(isValidate(req.body.p_data_send)){
        nTable.push("p_data_send" );
        nValue.push(`'`+req.body.p_data_send+ `'`);
    }

    if(isValidate(req.body.p_operative)){
        nTable.push("p_operative" );
        nValue.push(`"`+req.body.p_operative+ `"`);
    }

    var sql = `UPDATE table_patients SET ` +nTable +` = ` + nValue+ ` WHERE  patientId = `+req.body.patientId;
    console.log('SQL : ' +sql);

   connection.query(sql,(err,result) => {
        if (err) throw err;
               res.json(result); 
    });  
}

function searchPatinetByID(req, res) {
    var ids = req.params.id

        var sql = `SELECT 
                m.id,
                m.m_platoon,
                m.m_numPlatoon,
                m.m_name,
                m.m_l_name,
                m.m_id_card,
                m.m_maintenance_rights,
                m.m_congenital_disease,
                m.m_weight,
                m.m_high,
                m.m_bml,
                m.m_age,
                m.allergy,

                p.patientId,
                p.p_temperature,
                p.p_pulse,
                p.p_respiration,
                p.p_blood_pressure,
                p.p_o2set,
                p.p_symptom,
                p.p_treatment,
                p.p_DrOpinion,
                p.p_send,
                p.p_data_send,
                p.p_operative
            FROM  table_patients AS p 
            INNER JOIN table_military AS m ON  m.id = p.patientId
            WHERE   p.patientId = `+ids;
            
 console.log("searchPatinetByID :" +sql);
    connection.query(sql,(err,result) => {
        if (err) throw err;   
            res.json(result); 
    });
}



function countBox() {
    const sql = `
    `;

     connection.query(sql,(err,result) => {
            if (err) throw err;
                   res.json(result); 
        }); 

}

 // ############################  addColorUR_Sersor ####################################
 function addColorUR(req, res) {
    var sql;
    var queryNumPlatoon = req.query.numplatoon; //concat plutoon Ex `A33`
    var colorUR = req.query.sensorValue;
    var platoon = queryNumPlatoon.slice(0, 1);
    var numplatoon = queryNumPlatoon.slice(1, 3);
    var tableName = 'null';
    var tableDataName = 'null';
    var colorName = 'null';

    const words = dateFull_sum.split(':');
    console.log("Time :"+words[0])
//  moring
    if( words[0] >= 8 && words[0] <= 12 ){
        tableName = 'table_urine_mor';
        tableDataName = 'u_m_date';
        colorName = 'u_m_urineColor';
       console.log(" A ")
    }
//  noon
    if(words[0] >= '11' && words[1] == '30' &&   words[2] == '00' && words[0] <= '13' && words[1] == '30' &&   words[2] == '00' ){
        tableName == 'table_urine_noon';
        tableDataName == 'u_n_date';
        colorName == 'u_n_urineColor';
       console.log(" B ")
    }
// eve
    if(words[0] >= '18' && words[1] == '00' &&   words[2] == '00' && words[0] <= '19' && words[1] == '30' &&   words[2] == '00' ){
        tableName == 'table_urine_eve';
        tableDataName == 'u_eve_date';
        colorName == 'u_eve_urineColor';
       console.log(" C ")
    }

    if(platoon == 'A'){
        platoon = 1;
    }
    if(platoon =='B'){
        platoon = 2;
    }
    if(platoon =='C'){
        platoon = 3;
    }
    if(platoon =='D'){
        platoon = 4;
    }


    console.log("addColorUR_SQL : "+numplatoon+":"+colorUR);
    sql = `
    SELECT colorID 
    FROM table_urine_noon
    WHERE colorID  IN (SELECT id FROM table_military WHERE m_platoon = `+platoon+` and m_numPlatoon = `+numplatoon+`)  and u_n_date = '`+date_sum+`'
    `;
 //   console.log("sql : "+ sql);
    connection.query(sql,(err, result, fields)=>{
        if(err) throw err;

        Object.keys(result).forEach((key) =>{
            var row = result[key];
       
 //       บันทึกสีปัสสาวะ
            getInsetcolorUrine(tableName, row.colorID, colorName, tableDataName, colorUR, date_sum);
        }) 

//        console.log('addColorUR serchBYid SUCCESS')
        });

} 

//*********************************************** */


app.get('/api/getBMI',getBMI);
app.get('/api/getDisease',getDisease);
app.get('/api/getNarcotic',getNarcotic);
app.get('/api/getTraining',getTraining);
app.get('/api/getBMI',getBMI);
app.get('/api/getHeatStroke',getHeatStroke);

// ###########################    table Color Urine   ##############################################
  

    // ############################  addColorUR_Sersor ####################################
    app.get('/api/addColorURSersor', function addColorUR_Sersor(req, res) {

        var queryNumPlatoon = req.query.numplatoon; //concat plutoon Ex `A33`
        var colorUR = req.query.data;
     // var colorUR = 'A';
        var platoon = queryNumPlatoon.slice(0, 1);
        var numplatoon = queryNumPlatoon.slice(1, 3);
        var tableName = 'null';
        var tableDataName = 'null';
        var colorName = 'null';

        const words = dateFull_sum.split(':');
        console.log("Time :"+words[0])
//  moring
        if( words[0] >= 8 && words[0] <= 12 ){
            tableName = 'table_urine_mor';
            tableDataName = 'u_m_date';
            colorName = 'u_m_urineColor';
           console.log(" A ")
        }
//  noon
        if(words[0] >= '11' && words[1] == '30' &&   words[2] == '00' && words[0] <= '13' && words[1] == '30' &&   words[2] == '00' ){
            tableName == 'table_urine_noon';
            tableDataName == 'u_n_date';
            colorName == 'u_n_urineColor';
           console.log(" B ")
        }
// eve
        if(words[0] >= '18' && words[1] == '00' &&   words[2] == '00' && words[0] <= '19' && words[1] == '30' &&   words[2] == '00' ){
            tableName == 'table_urine_eve';
            tableDataName == 'u_eve_date';
            colorName == 'u_eve_urineColor';
           console.log(" C ")
        }
/*
        if(platoon == 'A'){
            platoon = 1;
        }
        if(platoon =='B'){
            platoon = 2;
        }
        if(platoon =='C'){
            platoon = 3;
        }
        if(platoon =='D'){
            platoon = 4;
        }
*/

        console.log("addColorUR_SQL : "+numplatoon+":"+colorUR);
        sql = `
        SELECT colorID 
        FROM table_urine_noon
        WHERE colorID  IN (SELECT id FROM table_military WHERE m_platoon = `+platoon+` and m_numPlatoon = `+numplatoon+`)  and u_n_date = '`+date_sum+`'
        `;
     //   console.log("sql : "+ sql);
   /*  if(numplatoon != "" ||colorUR != "" ){
       connection.query(sql,(err, result, fields)=>{
        if(err) throw err;

        Object.keys(result).forEach((key) =>{
            var row = result[key];
       
 //       บันทึกสีปัสสาวะ
            getInsetcolorUrine(tableName, row.colorID, colorName, tableDataName, colorUR, date_sum);
        }) 

//        console.log('addColorUR serchBYid SUCCESS')
        }
        );
} */
        
    }); 

app.get('/tableColorAll/:platoon/:name/:l_name/:time/:colorUrine/:tempar',(req,res) => {

    var sql;
    var platoon = isValidatedNull(req.params.platoon);
    var name = isValidatedNull(req.params.name);
    var l_name = isValidatedNull(req.params.l_name);
    
    var time = isValidatedNull(req.params.time);
    var colorUrine = isValidatedNull(req.params.colorUrine);
    var tempar = isValidatedNull(req.params.tempar);

   // console.log("tableColorAll/"+platoon+"/"+name+"/"+l_name+"/"+time+"/"+colorUrine+"/"+tempar);
   
    if( platoon == "null" &&  name == "null" && l_name == "null" && colorUrine =="null" && tempar == "null" && time != "null"){
        sql = `
        SELECT table_military.m_name
            , table_military.m_l_name
            , table_military.m_platoon
            , table_military.m_numPlatoon
            , table_urine_mor.u_m_urineColor
            , table_urine_mor.u_m_temperuture
            , table_urine_noon.u_n_urineColor
            , table_urine_noon.u_n_temperuture
            , table_urine_eve.u_eve_urineColor
            , table_urine_eve.u_eve_temperuture 
        FROM table_military 
        INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID 
        INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID 
        INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID 
            WHERE table_urine_mor.u_m_date = '`+time+`' 
            AND table_urine_noon.u_n_date = '`+time+`' 
            AND table_urine_eve.u_eve_date = '`+time+`'
        `
        console.log("time");
    }
    if( platoon == "null" &&  name == "null" && l_name == "null" && colorUrine !="null" && tempar == "null" && time != "null"){
        sql = `
        SELECT table_military.m_name
            , table_military.m_l_name
            , table_urine_mor.u_m_urineColor
            , table_urine_mor.u_m_temperuture
            , table_urine_noon.u_n_urineColor
            , table_urine_noon.u_n_temperuture
            , table_urine_eve.u_eve_urineColor
            , table_urine_eve.u_eve_temperuture 
        FROM table_military 
        INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID 
        INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID 
        INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID 
            WHERE (table_urine_mor.u_m_date = '`+time+`' 
                AND table_urine_noon.u_n_date = '`+time+`' 
                AND table_urine_eve.u_eve_date = '`+time+`')
            AND
                ( table_urine_mor.u_m_urineColor  = '`+colorUrine+`'
                OR table_urine_noon.u_n_urineColor = '`+colorUrine+`'
                OR table_urine_eve.u_eve_urineColor  = '`+colorUrine+`')
        `
        console.log("colorUrine");
    }
    if( platoon == "null" &&  name == "null" && l_name == "null" && colorUrine =="null" && tempar != "null" && time == "null"){
        sql = `
        SELECT table_military.m_name
            , table_military.m_l_name
            , table_urine_mor.u_m_urineColor
            , table_urine_mor.u_m_temperuture
            , table_urine_noon.u_n_urineColor
            , table_urine_noon.u_n_temperuture
            , table_urine_eve.u_eve_urineColor
            , table_urine_eve.u_eve_temperuture 
        FROM table_military 
        INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID 
        INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID 
        INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID 
            WHERE (table_urine_mor.u_m_date = '`+date_sum+`' 
            AND table_urine_noon.u_n_date = '`+date_sum+`' 
            AND table_urine_eve.u_eve_date = '`+date_sum+`')
        OR table_urine_mor.u_m_temperuture  `+tempar+`
        OR table_urine_noon.u_n_temperuture `+tempar+`
        OR table_urine_eve.u_eve_temperuture `+tempar+`
        `
        console.log("tempar");
    }

    if( platoon == "null" &&  name == "null" && l_name == "null" && colorUrine !="null" && tempar != "null" && time != "null"){
        sql = `
        SELECT table_military.m_name
            , table_military.m_l_name
            , table_urine_mor.u_m_urineColor
            , table_urine_mor.u_m_temperuture
            , table_urine_noon.u_n_urineColor
            , table_urine_noon.u_n_temperuture
            , table_urine_eve.u_eve_urineColor
            , table_urine_eve.u_eve_temperuture 
        FROM table_military 
        INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID 
        INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID 
        INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID 
            WHERE (table_urine_mor.u_m_date = '`+time+`' 
                    AND table_urine_noon.u_n_date = '`+time+`' 
                    AND table_urine_eve.u_eve_date = '`+time+`')
            AND (table_urine_mor.u_m_urineColor  = '`+colorUrine+`'
                    OR table_urine_noon.u_n_urineColor = '`+colorUrine+`'
                    OR table_urine_eve.u_eve_urineColor  = '`+colorUrine+`')
            AND (table_urine_mor.u_m_temperuture  `+tempar+`
                    OR table_urine_noon.u_n_temperuture `+tempar+`
                    OR table_urine_eve.u_eve_temperuture `+tempar+`)
        `
        console.log("colorUrine, tempar, time");
    }
    

    if( platoon == "null" &&  name == "null" && l_name == "null" && colorUrine !="null" && tempar != "null" && time == "null"){
        sql = `
        SELECT table_military.m_name
            , table_military.m_l_name
            , table_urine_mor.u_m_urineColor
            , table_urine_mor.u_m_temperuture
            , table_urine_noon.u_n_urineColor
            , table_urine_noon.u_n_temperuture
            , table_urine_eve.u_eve_urineColor
            , table_urine_eve.u_eve_temperuture 
        FROM table_military 
        INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID 
        INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID 
        INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID 
        WHERE (table_urine_mor.u_m_date = '`+date_sum+`' 
        AND table_urine_noon.u_n_date = '`+date_sum+`' 
        AND table_urine_eve.u_eve_date = '`+date_sum+`')
        AND (table_urine_mor.u_m_urineColor  = '`+colorUrine+`'
        OR table_urine_noon.u_n_urineColor = '`+colorUrine+`'
        OR table_urine_eve.u_eve_urineColor  = '`+colorUrine+`')
        AND (table_urine_mor.u_m_temperuture  `+tempar+`
        OR table_urine_noon.u_n_temperuture `+tempar+`
        OR table_urine_eve.u_eve_temperuture `+tempar+`)
        `
        console.log("colorUrine, tempar");
    }

    if( platoon == "null" &&  name == "null" && l_name == "null" && colorUrine !="null" && tempar == "null" && time == "null"){
        sql = `
        SELECT table_military.m_name
        , table_military.m_l_name
        , table_urine_mor.u_m_urineColor
        , table_urine_mor.u_m_temperuture
        , table_urine_noon.u_n_urineColor
        , table_urine_noon.u_n_temperuture
        , table_urine_eve.u_eve_urineColor
        , table_urine_eve.u_eve_temperuture 
        FROM table_military 
        INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID 
        INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID 
        INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID 
        WHERE (table_urine_mor.u_m_date = '`+date_sum+`' 
        AND table_urine_noon.u_n_date = '`+date_sum+`' 
        AND table_urine_eve.u_eve_date = '`+date_sum+`')
        AND
        ( table_urine_mor.u_m_urineColor  = '`+colorUrine+`'
        OR table_urine_noon.u_n_urineColor = '`+colorUrine+`'
        OR table_urine_eve.u_eve_urineColor  = '`+colorUrine+`')
        `
        console.log("colorUrine");
    }

    if( platoon == "null" &&  name == "null" && l_name != "null" && colorUrine =="null" && tempar == "null" && time != "null"){
        sql = `
        SELECT table_military.m_name
        , table_military.m_l_name
        , table_urine_mor.u_m_urineColor
        , table_urine_mor.u_m_temperuture
        , table_urine_noon.u_n_urineColor
        , table_urine_noon.u_n_temperuture
        , table_urine_eve.u_eve_urineColor
        , table_urine_eve.u_eve_temperuture 
        FROM table_military 
        INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID 
        INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID 
        INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID 
        WHERE (table_urine_mor.u_m_date = '`+time+`' 
        AND table_urine_noon.u_n_date = '`+time+`' 
        AND table_urine_eve.u_eve_date = '`+time+`')
        AND table_military.m_l_name = '`+l_name+`'
        `
        console.log("l_name");
    }

    if( platoon == "null" &&  name == "null" && l_name != "null" && colorUrine =="null" && tempar != "null" && time == "null"){
        sql = `
        SELECT table_military.m_name
        , table_military.m_l_name
        , table_urine_mor.u_m_urineColor
        , table_urine_mor.u_m_temperuture
        , table_urine_noon.u_n_urineColor
        , table_urine_noon.u_n_temperuture
        , table_urine_eve.u_eve_urineColor
        , table_urine_eve.u_eve_temperuture 
        FROM table_military 
        INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID 
        INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID 
        INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID 
        WHERE (table_urine_mor.u_m_date = '`+date_sum+`' 
        AND table_urine_noon.u_n_date = '`+date_sum+`' 
        AND table_urine_eve.u_eve_date = '`+date_sum+`')
        AND table_military.m_l_name = '`+l_name+`'
        AND (table_urine_mor.u_m_temperuture  `+tempar+`
        OR table_urine_noon.u_n_temperuture `+tempar+`
        OR table_urine_eve.u_eve_temperuture `+tempar+`)
        `
        console.log("l_name, tempar");
    }


    if( platoon == "null" &&  name == "null" && l_name != "null" && colorUrine !="null" && tempar == "null" && time == "null"){
        sql = `
        SELECT table_military.m_name
        , table_military.m_l_name
        , table_urine_mor.u_m_urineColor
        , table_urine_mor.u_m_temperuture
        , table_urine_noon.u_n_urineColor
        , table_urine_noon.u_n_temperuture
        , table_urine_eve.u_eve_urineColor
        , table_urine_eve.u_eve_temperuture 
        FROM table_military 
        INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID 
        INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID 
        INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID 
        WHERE (table_urine_mor.u_m_date = '`+date_sum+`' 
        AND table_urine_noon.u_n_date = '`+date_sum+`' 
        AND table_urine_eve.u_eve_date = '`+date_sum+`')
        AND table_military.m_l_name = '`+l_name+`'
        AND (table_urine_mor.u_m_urineColor  = '`+colorUrine+`'
        OR table_urine_noon.u_n_urineColor = '`+colorUrine+`'
        OR table_urine_eve.u_eve_urineColor  = '`+colorUrine+`')
        `
        console.log("l_name, colorUrine");
    }

    if( platoon == "null" &&  name == "null" && l_name != "null" && colorUrine =="null" && tempar == "null" && time == "null"){
        sql = `
        SELECT table_military.m_name
        , table_military.m_l_name
        , table_urine_mor.u_m_urineColor
        , table_urine_mor.u_m_temperuture
        , table_urine_noon.u_n_urineColor
        , table_urine_noon.u_n_temperuture
        , table_urine_eve.u_eve_urineColor
        , table_urine_eve.u_eve_temperuture 
        FROM table_military 
        INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID 
        INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID 
        INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID 
        WHERE table_urine_mor.u_m_date = '`+date_sum+`' 
        AND table_urine_noon.u_n_date = '`+date_sum+`' 
        AND table_urine_eve.u_eve_date = '`+date_sum+`'
        AND table_military.m_l_name = '`+l_name+`'
        `
        console.log("l_name");
    }

    if( platoon == "null" &&  name != "null" && l_name != "null" && colorUrine !="null" && tempar != "null" && time != "null"){
        sql = `
        SELECT table_military.m_name
        , table_military.m_l_name
        , table_urine_mor.u_m_urineColor
        , table_urine_mor.u_m_temperuture
        , table_urine_noon.u_n_urineColor
        , table_urine_noon.u_n_temperuture
        , table_urine_eve.u_eve_urineColor
        , table_urine_eve.u_eve_temperuture 
        FROM table_military 
        INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID 
        INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID 
        INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID 
        WHERE (table_urine_mor.u_m_date = '`+time+`' 
        AND table_urine_noon.u_n_date = '`+time+`' 
        AND table_urine_eve.u_eve_date = '`+time+`')
        AND table_military.m_name = '`+name+`'
        AND table_military.m_l_name = '`+l_name+`'
        AND (table_urine_mor.u_m_urineColor  = '`+colorUrine+`'
        OR table_urine_noon.u_n_urineColor = '`+colorUrine+`'
        OR table_urine_eve.u_eve_urineColor  = '`+colorUrine+`')
        AND (table_urine_mor.u_m_temperuture  `+tempar+`
        OR table_urine_noon.u_n_temperuture `+tempar+`
        OR table_urine_eve.u_eve_temperuture `+tempar+`)
        `
        console.log("m_name, m_l_name, colorUrine, tempar, tempar");
    }

    if( platoon == "null" &&  name != "null" && l_name != "null" && colorUrine !="null" && tempar != "null" && time == "null"){
        sql = `
        SELECT table_military.m_name
        , table_military.m_l_name
        , table_urine_mor.u_m_urineColor
        , table_urine_mor.u_m_temperuture
        , table_urine_noon.u_n_urineColor
        , table_urine_noon.u_n_temperuture
        , table_urine_eve.u_eve_urineColor
        , table_urine_eve.u_eve_temperuture 
        FROM table_military 
        INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID 
        INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID 
        INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID 
        WHERE (table_urine_mor.u_m_date = '`+date_sum+`' 
        AND table_urine_noon.u_n_date = '`+date_sum+`' 
        AND table_urine_eve.u_eve_date = '`+date_sum+`')
        AND table_military.m_name = '`+name+`'
        AND table_military.m_l_name = '`+l_name+`'
        AND (table_urine_mor.u_m_urineColor  = '`+colorUrine+`'
        OR table_urine_noon.u_n_urineColor = '`+colorUrine+`'
        OR table_urine_eve.u_eve_urineColor  = '`+colorUrine+`')
        AND (table_urine_mor.u_m_temperuture  `+tempar+`
        OR table_urine_noon.u_n_temperuture `+tempar+`
        OR table_urine_eve.u_eve_temperuture `+tempar+`)
        `
        console.log("m_name, m_l_name, colorUrine, tempar");
    }
    if( platoon == "null" &&  name != "null" && l_name != "null" && colorUrine !="null" && tempar == "null" && time == "null"){
        sql = `
        SELECT table_military.m_name
        , table_military.m_l_name
        , table_urine_mor.u_m_urineColor
        , table_urine_mor.u_m_temperuture
        , table_urine_noon.u_n_urineColor
        , table_urine_noon.u_n_temperuture
        , table_urine_eve.u_eve_urineColor
        , table_urine_eve.u_eve_temperuture 
        FROM table_military 
        INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID 
        INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID 
        INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID 
        WHERE (table_urine_mor.u_m_date = '`+date_sum+`' 
        AND table_urine_noon.u_n_date = '`+date_sum+`' 
        AND table_urine_eve.u_eve_date = '`+date_sum+`')
        AND table_military.m_name = '`+name+`'
        AND table_military.m_l_name = '`+l_name+`'
        AND (table_urine_mor.u_m_urineColor  = '`+colorUrine+`'
        OR table_urine_noon.u_n_urineColor = '`+colorUrine+`'
        OR table_urine_eve.u_eve_urineColor  = '`+colorUrine+`')
        `
        console.log("m_name, m_l_name, colorUrine");
    }
    if( platoon == "null" &&  name != "null" && l_name != "null" && colorUrine =="null" && tempar == "null" && time == "null"){
        sql = `
        SELECT table_military.m_name
        , table_military.m_l_name
        , table_urine_mor.u_m_urineColor
        , table_urine_mor.u_m_temperuture
        , table_urine_noon.u_n_urineColor
        , table_urine_noon.u_n_temperuture
        , table_urine_eve.u_eve_urineColor
        , table_urine_eve.u_eve_temperuture 
        FROM table_military 
        INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID 
        INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID 
        INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID 
        WHERE (table_urine_mor.u_m_date = '`+date_sum+`' 
        AND table_urine_noon.u_n_date = '`+date_sum+`' 
        AND table_urine_eve.u_eve_date = '`+date_sum+`')
        AND table_military.m_name = '`+name+`'
        AND table_military.m_l_name = '`+l_name+`'
        `
        console.log("m_name, m_l_name");
    }
    if(   name != "null" && platoon == "null" && l_name == "null" && colorUrine =="null" && tempar == "null" && time == "null"){
        sql = `
        SELECT table_military.m_name
        , table_military.m_l_name
        , table_urine_mor.u_m_urineColor
        , table_urine_mor.u_m_temperuture
        , table_urine_noon.u_n_urineColor
        , table_urine_noon.u_n_temperuture
        , table_urine_eve.u_eve_urineColor
        , table_urine_eve.u_eve_temperuture 
        FROM table_military 
        INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID 
        INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID 
        INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID 
        WHERE (table_urine_mor.u_m_date = '`+date_sum+`' 
        AND table_urine_noon.u_n_date = '`+date_sum+`' 
        AND table_urine_eve.u_eve_date = '`+date_sum+`')
        AND table_military.m_name = '`+name+`'
        `
        console.log("m_name");
    }

    if( platoon != "null" &&  name == "null" && l_name == "null" && colorUrine =="null" && tempar == "null" && time != "null"){
        sql = `
        SELECT table_military.m_name
        , table_military.m_l_name
        , table_urine_mor.u_m_urineColor
        , table_urine_mor.u_m_temperuture
        , table_urine_noon.u_n_urineColor
        , table_urine_noon.u_n_temperuture
        , table_urine_eve.u_eve_urineColor
        , table_urine_eve.u_eve_temperuture 
        FROM table_military 
        INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID 
        INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID 
        INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID 
        WHERE (table_urine_mor.u_m_date = '`+time+`' 
        AND table_urine_noon.u_n_date = '`+time+`' 
        AND table_urine_eve.u_eve_date = '`+time+`')
        AND table_military.m_platoon = `+platoon+`
        `
        console.log("platoon, tempar");
    }

    if( platoon != "null" &&  name == "null" && l_name == "null" && colorUrine =="null" && tempar != "null" && time == "null"){
        sql = `
        SELECT table_military.m_name
        , table_military.m_l_name
        , table_urine_mor.u_m_urineColor
        , table_urine_mor.u_m_temperuture
        , table_urine_noon.u_n_urineColor
        , table_urine_noon.u_n_temperuture
        , table_urine_eve.u_eve_urineColor
        , table_urine_eve.u_eve_temperuture 
        FROM table_military 
        INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID 
        INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID 
        INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID 
        WHERE (table_urine_mor.u_m_date = '`+date_sum+`' 
        AND table_urine_noon.u_n_date = '`+date_sum+`' 
        AND table_urine_eve.u_eve_date = '`+date_sum+`')
        AND table_military.m_platoon = `+platoon+`
        AND (table_urine_mor.u_m_temperuture  `+tempar+`
        OR table_urine_noon.u_n_temperuture `+tempar+`
        OR table_urine_eve.u_eve_temperuture `+tempar+`)
        `
        console.log("platoon, tempar");
    }

    if( platoon != "null" &&  name == "null" && l_name == "null" && colorUrine !="null" && tempar == "null" && time == "null"){
        sql = `
        SELECT table_military.m_name
        , table_military.m_l_name
        , table_urine_mor.u_m_urineColor
        , table_urine_mor.u_m_temperuture
        , table_urine_noon.u_n_urineColor
        , table_urine_noon.u_n_temperuture
        , table_urine_eve.u_eve_urineColor
        , table_urine_eve.u_eve_temperuture 
        FROM table_military 
        INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID 
        INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID 
        INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID 
        WHERE (table_urine_mor.u_m_date = '`+date_sum+`' 
        AND table_urine_noon.u_n_date = '`+date_sum+`' 
        AND table_urine_eve.u_eve_date = '`+date_sum+`')
        AND table_military.m_platoon = `+platoon+`
        AND (table_urine_mor.u_m_urineColor  = '`+colorUrine+`'
        OR table_urine_noon.u_n_urineColor = '`+colorUrine+`'
        OR table_urine_eve.u_eve_urineColor  = '`+colorUrine+`')
        `
        console.log("platoon, colorUrine");
    }

    if( platoon != "null" &&  name == "null" && l_name != "null" && colorUrine =="null" && tempar == "null" && time == "null"){
        sql = `
        SELECT table_military.m_name
        , table_military.m_l_name
        , table_urine_mor.u_m_urineColor
        , table_urine_mor.u_m_temperuture
        , table_urine_noon.u_n_urineColor
        , table_urine_noon.u_n_temperuture
        , table_urine_eve.u_eve_urineColor
        , table_urine_eve.u_eve_temperuture 
        FROM table_military 
        INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID 
        INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID 
        INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID 
        WHERE (table_urine_mor.u_m_date = '`+date_sum+`' 
        AND table_urine_noon.u_n_date = '`+date_sum+`' 
        AND table_urine_eve.u_eve_date = '`+date_sum+`')
        AND table_military.m_platoon = `+platoon+`
        AND table_military.m_l_name = '`+l_name+`'
        `
        console.log("m_platoon, m_l_name");
    }

    if( platoon != "null" &&  name != "null" && l_name != "null" && colorUrine !="null" && tempar != "null" && time != "null"){
        sql = `
        SELECT table_military.m_name
        , table_military.m_l_name
        , table_urine_mor.u_m_urineColor
        , table_urine_mor.u_m_temperuture
        , table_urine_noon.u_n_urineColor
        , table_urine_noon.u_n_temperuture
        , table_urine_eve.u_eve_urineColor
        , table_urine_eve.u_eve_temperuture 
        FROM table_military 
        INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID 
        INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID 
        INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID 
        WHERE (table_urine_mor.u_m_date = '`+date_sum+`' 
        AND table_urine_noon.u_n_date = '`+date_sum+`' 
        AND table_urine_eve.u_eve_date = '`+date_sum+`')
        AND table_military.m_platoon = `+platoon+`
        AND table_military.m_name = '`+name+`'
        AND table_military.m_l_name = '`+l_name+`'
        AND (table_urine_mor.u_m_urineColor  = '`+colorUrine+`'
        OR table_urine_noon.u_n_urineColor = '`+colorUrine+`'
        OR table_urine_eve.u_eve_urineColor  = '`+colorUrine+`')
        AND (table_urine_mor.u_m_temperuture  `+tempar+`
        OR table_urine_noon.u_n_temperuture `+tempar+`
        OR table_urine_eve.u_eve_temperuture `+tempar+`)
        `
        console.log("platoon, m_name, m_l_name, tempar, time");
    }

    if( platoon != "null" &&  name != "null" && l_name != "null" && colorUrine !="null" && tempar != "null" && time == "null"){
        sql = `
        SELECT table_military.m_name
            , table_military.m_l_name
            , table_urine_mor.u_m_urineColor
            , table_urine_mor.u_m_temperuture
            , table_urine_noon.u_n_urineColor
            , table_urine_noon.u_n_temperuture
            , table_urine_eve.u_eve_urineColor
            , table_urine_eve.u_eve_temperuture 
        FROM table_military 
            INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID 
            INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID 
            INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID 
            WHERE (table_urine_mor.u_m_date = '`+date_sum+`' 
                AND table_urine_noon.u_n_date = '`+date_sum+`' 
                AND table_urine_eve.u_eve_date = '`+date_sum+`')
                AND table_military.m_platoon = `+platoon+`
                AND table_military.m_name = '`+name+`'
                AND table_military.m_l_name = '`+l_name+`'
                AND (table_urine_mor.u_m_urineColor  = '`+colorUrine+`'
                    OR table_urine_noon.u_n_urineColor = '`+colorUrine+`'
                    OR table_urine_eve.u_eve_urineColor  = '`+colorUrine+`')
                AND (table_urine_mor.u_m_temperuture  `+tempar+`
                    OR table_urine_noon.u_n_temperuture `+tempar+`
                    OR table_urine_eve.u_eve_temperuture `+tempar+`)
        `
        console.log("platoon, m_name, m_l_name, tempar");
    }

    if( platoon != "null" &&  name != "null" && l_name != "null" && colorUrine !="null" && tempar == "null" && time == "null"){
        sql = `
        SELECT table_military.m_name
            , table_military.m_l_name
            , table_urine_mor.u_m_urineColor
            , table_urine_mor.u_m_temperuture
            , table_urine_noon.u_n_urineColor
            , table_urine_noon.u_n_temperuture
            , table_urine_eve.u_eve_urineColor
            , table_urine_eve.u_eve_temperuture 
        FROM table_military 
        INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID 
        INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID 
        INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID 
        WHERE (table_urine_mor.u_m_date = '`+date_sum+`' 
            AND table_urine_noon.u_n_date = '`+date_sum+`' 
            AND table_urine_eve.u_eve_date = '`+date_sum+`')
            AND table_military.m_platoon = `+platoon+`
            AND table_military.m_name = '`+name+`'
            AND table_military.m_l_name = '`+l_name+`'
            AND  (table_urine_mor.u_m_urineColor  = '`+colorUrine+`'
                OR  table_urine_noon.u_n_urineColor = '`+colorUrine+`'
                OR  table_urine_eve.u_eve_urineColor  = '`+colorUrine+`')
        `
        console.log("platoon, m_name, m_l_name");
    }

    if( platoon != "null" &&  name != "null" && l_name != "null" && colorUrine =="null" && tempar == "null" && time == "null"){
        sql = `
        SELECT table_military.m_name
        , table_military.m_l_name
        , table_urine_mor.u_m_urineColor
        , table_urine_mor.u_m_temperuture
        , table_urine_noon.u_n_urineColor
        , table_urine_noon.u_n_temperuture
        , table_urine_eve.u_eve_urineColor
        , table_urine_eve.u_eve_temperuture 
        FROM table_military 
        INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID 
        INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID 
        INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID 
        WHERE (table_urine_mor.u_m_date = '`+date_sum+`' 
        AND table_urine_noon.u_n_date = '`+date_sum+`' 
        AND table_urine_eve.u_eve_date = '`+date_sum+`')
        AND table_military.m_platoon = `+platoon+`
        AND table_military.m_name = '`+name+`'
        AND table_military.m_l_name = '`+l_name+`'
        `
        console.log("platoon, m_name, m_l_name");
    }

    if( platoon != "null" &&  name != "null" && l_name == "null" && colorUrine =="null" && tempar == "null" && time == "null"){
        sql = `
        SELECT table_military.m_name
        , table_military.m_l_name
        , table_urine_mor.u_m_urineColor
        , table_urine_mor.u_m_temperuture
        , table_urine_noon.u_n_urineColor
        , table_urine_noon.u_n_temperuture
        , table_urine_eve.u_eve_urineColor
        , table_urine_eve.u_eve_temperuture 
        FROM table_military 
        INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID 
        INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID 
        INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID 
        WHERE (table_urine_mor.u_m_date = '`+date_sum+`' 
        AND table_urine_noon.u_n_date = '`+date_sum+`' 
        AND table_urine_eve.u_eve_date = '`+date_sum+`')
        AND table_military.m_platoon = `+platoon+`
        AND table_military.m_name = '`+name+`'
        `
        console.log("platoon, m_name");
    }

    if( platoon != "null" &&  name == "null" && l_name == "null" && colorUrine =="null" && tempar == "null" && time == "null"){
        sql = `
        SELECT table_military.m_name
        , table_military.m_l_name
        , table_urine_mor.u_m_urineColor
        , table_urine_mor.u_m_temperuture
        , table_urine_noon.u_n_urineColor
        , table_urine_noon.u_n_temperuture
        , table_urine_eve.u_eve_urineColor
        , table_urine_eve.u_eve_temperuture 
        FROM table_military 
        INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID 
        INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID 
        INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID 
        WHERE (table_urine_mor.u_m_date = '`+date_sum+`' 
        AND table_urine_noon.u_n_date = '`+date_sum+`' 
        AND table_urine_eve.u_eve_date = '`+date_sum+`')
        AND table_military.m_platoon = `+platoon+`
        `
        console.log("platoon");
    }

    if( platoon == "null" &&  name == "null" && l_name == "null" && colorUrine =="null" && tempar == "null" && time == "null"){
        sql = `
        SELECT table_military.m_name
        , table_military.m_l_name
        , table_military.m_platoon
        , table_military.m_numPlatoon
        , table_urine_mor.u_m_urineColor
        , table_urine_mor.u_m_temperuture
        , table_urine_noon.u_n_urineColor
        , table_urine_noon.u_n_temperuture
        , table_urine_eve.u_eve_urineColor
        , table_urine_eve.u_eve_temperuture 
        FROM table_military 
        INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID 
        INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID 
        INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID 
        WHERE table_urine_mor.u_m_date = '`+date_sum+`' 
        AND table_urine_noon.u_n_date = '`+date_sum+`' 
        AND table_urine_eve.u_eve_date = '`+date_sum+`'
        `
        console.log("all to null");
    }
 
    // test to dev
    var sql1 =`SELECT table_military.m_name
    , table_military.m_l_name
    , table_military.m_platoon
    , table_military.m_numPlatoon
    , table_urine_mor.u_m_urineColor
    , table_urine_mor.u_m_temperuture
    , table_urine_mor.u_m_editUR
    , table_urine_mor.u_m_editT

    , table_urine_noon.u_n_urineColor
    , table_urine_noon.u_n_temperuture
    , table_urine_noon.u_n_editUR
    , table_urine_noon.u_n_editT

    , table_urine_eve.u_eve_urineColor
    , table_urine_eve.u_eve_temperuture 
    , table_urine_eve.u_eve_editUR
    , table_urine_eve.u_eve_editT
    
    FROM table_military 
    INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID 
    INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID 
    INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID 
    WHERE table_urine_mor.u_m_date = '2019-12-19' 
    AND table_urine_noon.u_n_date = '2019-12-19' 
    AND table_urine_eve.u_eve_date = '2019-12-19'`

    console.log("tableColorAll :"+sql1);
    connection.query(sql1,(err,result) => {
        if (err) throw err;
        res.json(result); 
    });
});

app.get('/boxColorO/morning',(req,res) => {
    var sql = "SELECT  table_urine_mor.u_m_urineColor, table_urine_mor.u_m_temperuture FROM table_military INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID WHERE table_urine_mor.u_m_date = '"+date_sum+"' AND table_urine_mor.u_m_urineColor = 'O' ";
    connection.query(sql,(err,result) => {
        if (err) throw err;
    //    console.log("boxColorO/morning :"+sql);
        res.json(result); 
    });
});

app.get('/boxColorO/noon',(req,res) => {
    var sql = "SELECT table_urine_noon.u_n_urineColor, table_urine_noon.u_n_urineColor FROM table_military INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID WHERE  table_urine_noon.u_n_date  = '"+date_sum+"' AND  table_urine_noon.u_n_urineColor = 'O' ";
          //  console.log("boxColorO/noon :"+sql);
    connection.query(sql,(err,result) => {
        if (err) throw err;
        res.json(result); 
    });
});

app.get('/boxColorO/eve',(req,res) => {
    var sql = "SELECT table_urine_eve.u_eve_urineColor, table_urine_eve.u_eve_temperuture FROM table_military INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID WHERE table_urine_eve.u_eve_date = '"+date_sum+"' AND table_urine_eve.u_eve_urineColor = 'O' ";
       //     console.log("boxColorO/eve :"+sql);
    connection.query(sql,(err,result) => {
        if (err) throw err;
        res.json(result); 
    });
});


app.get('/boxColorA/morning',(req,res) => {
    var sql = "SELECT table_urine_mor.u_m_urineColor, table_urine_mor.u_m_temperuture FROM table_military INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID WHERE table_urine_mor.u_m_date = '"+date_sum+"' AND table_urine_mor.u_m_urineColor = 'A' ";
         //  console.log("boxColorA/morning :"+sql);
    connection.query(sql,(err,result) => {
        if (err) throw err;
        res.json(result); 
    });
});

app.get('/boxColorA/noon',(req,res) => {
    var sql = "SELECT table_urine_noon.u_n_urineColor, table_urine_noon.u_n_urineColor FROM table_military INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID WHERE  table_urine_noon.u_n_date  = '"+date_sum+"' AND  table_urine_noon.u_n_urineColor = 'A' ";
          //console.log("boxColorA/noon :"+sql);
    connection.query(sql,(err,result) => {
        if (err) throw err;
        res.json(result); 
    });
});

app.get('/boxColorA/eve',(req,res) => {
    var sql = "SELECT table_urine_eve.u_eve_urineColor, table_urine_eve.u_eve_temperuture FROM table_military INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID WHERE table_urine_eve.u_eve_date = '"+date_sum+"' AND table_urine_eve.u_eve_urineColor = 'A' ";
  //  console.log("boxColorA/eve :"+sql);
    connection.query(sql,(err,result) => {
        if (err) throw err;
        res.json(result); 
    });
});

app.get('/boxColorB/morning',(req,res) => {
    var sql = "SELECT table_urine_mor.u_m_urineColor, table_urine_mor.u_m_temperuture FROM table_military INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID WHERE table_urine_mor.u_m_date = '"+date_sum+"' AND table_urine_mor.u_m_urineColor = 'B' ";
        //   console.log("boxColorB/morning :"+sql);
    connection.query(sql,(err,result) => {
        if (err) throw err;
        res.json(result); 
    });
});

app.get('/boxColorB/noon',(req,res) => {
    var sql = "SELECT table_urine_noon.u_n_urineColor, table_urine_noon.u_n_urineColor FROM table_military INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID WHERE  table_urine_noon.u_n_date  = '"+date_sum+"' AND  table_urine_noon.u_n_urineColor = 'B' ";
          //  console.log("boxColorB/noon :"+sql);
    connection.query(sql,(err,result) => {
        if (err) throw err;
        res.json(result); 
    });
});

app.get('/boxColorB/eve',(req,res) => {
    var sql = "SELECT table_urine_eve.u_eve_urineColor, table_urine_eve.u_eve_temperuture FROM table_military INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID WHERE table_urine_eve.u_eve_date = '"+date_sum+"' AND table_urine_eve.u_eve_urineColor = 'B' ";
          //  console.log("boxColorB/eve :"+sql);
    connection.query(sql,(err,result) => {
        if (err) throw err;
        res.json(result); 
    });
});


app.get('/boxColorC/morning',(req,res) => {
    var sql = "SELECT table_urine_mor.u_m_urineColor, table_urine_mor.u_m_temperuture FROM table_military INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID WHERE table_urine_mor.u_m_date = '"+date_sum+"' AND table_urine_mor.u_m_urineColor = 'C' ";
       //  console.log(result.length);
    connection.query(sql,(err,result) => {
        if (err) throw err;
        res.json(result); 
    });
});

app.get('/boxColorC/noon',(req,res) => {
    var sql = "SELECT  table_urine_noon.u_n_urineColor, table_urine_noon.u_n_urineColor FROM table_military INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID WHERE  table_urine_noon.u_n_date  = '"+date_sum+"' AND  table_urine_noon.u_n_urineColor = 'C' ";
     //  console.log("boxColorC/morning :"+sql);
    connection.query(sql,(err,result) => {
        if (err) throw err;
        res.json(result); 
    });
});

app.get('/boxColorC/eve',(req,res) => {
    var sql = "SELECT * FROM table_military INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID WHERE table_urine_eve.u_eve_date = '"+date_sum+"' AND table_urine_eve.u_eve_urineColor = 'C' ";
    //  console.log("boxColorC/eve :"+sql);
    connection.query(sql,(err,result) => {
        if (err) throw err;
        res.json(result); 
    });
});

app.get('/boxColorD/morning',(req,res) => {
    var sql = "SELECT * FROM table_military INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID WHERE table_urine_mor.u_m_date = '"+date_sum+"' AND table_urine_mor.u_m_urineColor = 'D' ";
        //   console.log("boxColorD/morning :"+sql);
    connection.query(sql,(err,result) => {
        if (err) throw err;
        res.json(result); 
    });
});

app.get('/boxColorD/noon',(req,res) => {
    var sql = "SELECT * FROM table_military INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID WHERE  table_urine_noon.u_n_date  = '"+date_sum+"' AND  table_urine_noon.u_n_urineColor = 'D' ";
    //    console.log("boxColorD/noon :"+sql);
    connection.query(sql,(err,result) => {
        if (err) throw err;
        res.json(result); 
    });
});

app.get('/boxColorD/eve',(req,res) => {
    var sql = "SELECT * FROM table_military INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID WHERE table_urine_eve.u_eve_date = '"+date_sum+"' AND table_urine_eve.u_eve_urineColor = 'D' ";
    //    console.log("boxColorD/eve :"+sql);
    connection.query(sql,(err,result) => {
        if (err) throw err;
        res.json(result); 
    });
});


app.get('/showDataPrint/:id',(req,res) =>{
    var ids = req.params.id
    var sql = "SELECT * FROM table_military  INNER JOIN table_patients  ON table_military.id = table_patients.patientId WHERE " +ids;
 //   console.log("showDataPrint :"+sql);
    connection.query(sql,(err,result) => {
        if (err) throw err;
            res.json(result); 
    });
});



// ############################### patient ##################################################### 

// test-call-table-patient
app.get('/api/showDataPrint',(req,res) =>{
    var ids = req.params.id
    var sql = "SELECT * FROM table_military INNER JOIN table_patients ON table_military.id = table_patients.patientId WHERE table_patients.p_data_time = '2019-12-23' ";
 //   console.log("showDataPrint :"+sql);
    connection.query(sql,(err,result) => {
        if (err) throw err;       
            res.json(result); 
    });
});

/*
function showDataPrint(res,req){
    sql = `SELECT * 
    FROM `table_urine_noon` 
    where `colorID` in (SELECT id FROM `table_military` 
                                    WHERE `m_platoon` = '3' 
                                    AND `m_numPlatoon` = '34')  
    AND `u_n_date` = '2020-01-15'`;

    con.query(sql,(err,result) =>{
        if (err) throw err;
        res.json(result); 
    });
} */

app.post('/api/addDataPrint',jsonParser, (req, res) => {
    var patientId = req.body.patientId;
    var p_symptom = req.body.p_symptom;
    var p_hospital = req.body.p_hospital;
    var p_delivery = req.body.p_delivery;
    var p_come_back = req.body.p_come_back;
    var p_temperature = req.body.p_temperature;
    var p_respiration = req.body.p_respiration;
    var p_oxygen = req.body.p_oxygen;
    var p_pulse = req.body.p_pulse;
    var p_data_time = req.body.p_data_time;
    var p_bood_pressure = req.body.p_bood_pressure;
    var p_record = req.body.p_record;
    var p_primary_treatment = req.body.p_primary_treatment;
    var start_time = req.body.start_time;
    var end_time = req.body.end_time;

    var sql = "INSERT INTO table_military (m_id_card, m_name, m_l_name,  m_weight,  m_height,  m_bml,  m_blood_pressure,  m_pulse,  m_career,  m_Illness)  VALUES ('"+m_id_card+"','"+m_name+"','"+m_l_name+"',"+m_weight+","+m_height+","+m_bml+",'"+m_blood_pressure+"','"+m_pulse+"','"+m_career+"','"+m_Illness+"') ";
    //   console.log("getRiskUpdate :"+sql);
    connection.query(sql,(err,result) => {
        if (err) throw err;   
            res.sendStatus(200); 
    });
 
});

// ############################### risk ##################################################### 
app.get('/riskCorrection',(req,res) =>{
    var sql = "SELECT id, m_name, m_l_name FROM table_military";
 //   console.log("riskCorrection :"+sql);
    connection.query(sql,(err,result) => {
        if (err) throw err;   
        res.json(result); 
    });
});

app.post('/risksAdd',jsonParser, (req, res) => {
    var m_id_card = req.body.m_id_card;
    var m_name = req.body.m_name;
    var m_l_name = req.body.m_l_name;
    var m_weight = req.body.m_weight;
    var m_height = req.body.m_height;
    var m_bml = req.body.m_bml;
    var m_blood_pressure = req.body.m_blood_pressure;
    var m_pulse = req.body.m_pulse;
    var m_career = req.body.m_career;
    var m_Illness = req.body.m_Illness;

    var sql = "INSERT INTO table_military (m_id_card, m_name, m_l_name,  m_weight,  m_height,  m_bml,  m_blood_pressure,  m_pulse,  m_career,  m_Illness)  VALUES ('"+m_id_card+"','"+m_name+"','"+m_l_name+"',"+m_weight+","+m_height+","+m_bml+",'"+m_blood_pressure+"','"+m_pulse+"','"+m_career+"','"+m_Illness+"') ";
    //   console.log("getRiskUpdate :"+sql);
    connection.query(sql,(err,result) => {
        if (err) throw err;   
            res.sendStatus(200); 
    });
 
});


// ############################### risk - TABLE  ##################################################### 
//regiter : table  13/4/20
app.get('/api/MilitaryInformation',(req,res) =>{
    var sql = "SELECT * FROM table_military";
 //   console.log("riskCorrection :"+sql);
    connection.query(sql,(err,result) => {
        if (err) throw err;   
            res.json(result); 
    });
});

//regiter : table  13/4/20
app.post('/api/updateMility',jsonParser,(req, res) =>{
    console.log("updateMility :"+req.body.id);
    let id = req.body.id;
    var id_card = req.body.m_id_card;
    var m_platoon = req.body.m_numPlatoon;
    var m_name = req.body.m_name;
    var m_l_name = req.body.m_l_name;
    var m_birthday = req.body.m_birthday;
    var m_prefecture = req.body.m_prefecture;
    var m_district = req.body.m_district;
    var m_province = req.body.m_province;
    var m_postal_code = req.body.m_postal_code;
    var m_tel = req.body.m_tel;
    var m_relative_tel = req.body.m_relative_tel;
    var m_career = req.body.m_career;
    var m_Illness = req.body.m_Illness;
    var m_maintenance_rights = req.body.m_maintenance_rights;

    var sql = "UPDATE table_military SET m_id_card = '"+id_card+"', m_platoon = '"+m_platoon+"', m_name = '"+m_name+"', m_l_name = '"+m_l_name+"', m_birthday = '"+m_birthday+"', m_prefecture = '"+m_prefecture+"', m_district = '"+m_district+"', m_province = '"+m_province+"', m_postal_code = '"+m_postal_code+"', m_tel = '"+m_tel+"',  m_relative_tel ='"+m_relative_tel+"', m_career = '"+m_career+"', m_Illness = '"+m_Illness+"', m_maintenance_rights = '"+m_maintenance_rights+"'  WHERE id = "+id;
   console.log("getRiskUpdate :"+sql);
    connection.query(sql,(err,result) => {
        if (err) throw err;   
            res.json(result); 
    });
});

//regiter : update 13/4/20
app.get('/api/MilitaryInformation/:id',(req, res) =>{
    var id = req.params.id;
    var sql = "SELECT * FROM table_military WHERE id = "+id;
 //   console.log("getRiskUpdate :"+sql);
    connection.query(sql,(err,result) => {
        if (err) throw err;   
            res.json(result); 
    });
});

// ###########   update_urine_NO_WHERE #######################################   14/01/2563 //
app.post('/api/updateUrine',jsonParser,(req, res) =>{
    var sql;
    console.log("updateUrine :"+req.body.id);
    var id = req.body.id;
    var Vplatoon = req.body.platoon;
    var Vurine = req.body.urine;
    var Vtemper = req.body.temper;

    var table_urine;
    var platoon;
    var urine;
    var temper;


   // var sql = "UPDATE table_military SET m_id_card = '"+id_card+"', m_platoon = '"+m_platoon+"', m_name = '"+m_name+"', m_l_name = '"+m_l_name+"', m_birthday = '"+m_birthday+"', m_prefecture = '"+m_prefecture+"', m_district = '"+m_district+"', m_province = '"+m_province+"', m_postal_code = '"+m_postal_code+"', m_tel = '"+m_tel+"',  m_relative_tel ='"+m_relative_tel+"', m_career = '"+m_career+"', m_Illness = '"+m_Illness+"', m_maintenance_rights = '"+m_maintenance_rights+"'  WHERE id = "+id;
        sql =`
        INSERT INTO
        FROM 
        WHERE
        `
   console.log("updateUrine :"+sql);
    connection.query(sql,(err,result) => {
        if (err) throw err;   
            res.json(result); 
    });
});


// ####################### getAll_urine ############################################## 
app.get('/api/updateUrineALL/:tables/:id',(req, res) =>{
    var dataTest = req.params.tables
    var id = req.params.id

    var table ;
    var urineColor ;
    var temperuture;
    var u_date;
    var sql ;
    if(dataTest == '1'){
        table = 'table_urine_eve'
        urineColor = 'u_eve_urineColor'
        temperuture = '	u_eve_temperuture'
        u_date = `u_eve_date`
    }if(dataTest == '2'){
        table = 'table_urine_mor'
        urineColor = 'u_m_urineColor'
        temperuture = '	u_m_temperuture'
        u_date = `u_m_date`
    }if(dataTest == '3'){
        table = 'table_urine_noon'
        urineColor = 'u_n_urineColor'
        temperuture = '	u_n_temperuture'
        u_date = `u_n_date`
    }
    
    if(id != " " || id != 'null' || id != 'undefined'){
    sql = `SELECT 
                table_military.id,
                table_military.m_name,
                table_military.m_l_name,
                `+table+`.`+urineColor+`,
                `+table+`.`+temperuture+`
            FROM table_military
            INNER JOIN `+table+` ON table_military.id = `+table+`.colorID 
            WHERE `+table+`.`+u_date+` = '`+date_sum+`'
            AND table_military.id = '`+id+`'
        `
     ;
    }else{
        sql = `SELECT 
                table_military.id,
                table_military.m_name,
                table_military.m_l_name,
                `+table+`.`+urineColor+`,
                `+table+`.`+temperuture+`
            FROM table_military
            INNER JOIN `+table+` ON table_military.id = `+table+`.colorID 
            WHERE `+table+`.`+u_date+` = '`+date_sum+`'`;
    }
    
    console.log("updateUrineALL :"+sql);

        connection.query(sql,(err,result) => {
            if (err) throw err;   
                res.json(result); 
        });
});

// ################### adruno #####################
app.get('/api/inputBord/:p/:mp/:ur',(req, res) =>{
    var p = req.params.p;
    var mp = req.params.mp;
    var ur = req.params.ur;
    console.log('parametter: '+dataTest);

    var sql = `SELECT 
                table_military.id,
                table_military.m_name,
                table_military.m_l_name,
                `+table+`.`+urineColor+`,
                `+table+`.`+temperuture+`
            FROM table_military
            INNER JOIN `+table+` ON table_military.id = `+table+`.colorID 
            WHERE `+table+`.`+u_date+` = '`+date_sum+`'`;
    console.log("updateUrineALL :"+sql);
        connection.query(sql,(err,result) => {
            if (err) throw err;   
                res.json(result); 
        });
});




//  validated value
function isValidatedNull(params) {
    var value1 = params;
    if (value1 !== 'undefined')  {
        return value1; 
    }
    return value1 = "null"; 
}

function scheduTemper() {
  var sql = `
        SELECT 
          table_military.m_name
        , table_military.m_l_name
        , table_urine_mor.u_m_urineColor
        , table_urine_mor.u_m_temperuture
        , table_urine_noon.u_n_urineColor
        , table_urine_noon.u_n_temperuture
        , table_urine_eve.u_eve_urineColor
        , table_urine_eve.u_eve_temperuture 
        FROM table_military 
        INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID 
        INNER JOIN table_urine_noon ON table_military.id = table_urine_noon.colorID 
        INNER JOIN table_urine_eve ON table_military.id = table_urine_eve.colorID 
        WHERE table_urine_mor.u_m_date = '`+date_sum+`' 
        OR table_urine_noon.u_n_date = '`+date_sum+`' 
        OR table_urine_eve.u_eve_date = '`+date_sum+`'
        `
        connection.query(sql,(err,result) => {
        if (err) throw err;
        return result ;
    });

}

// ############################## dashboard ###################################

function getBMI(){
    var sql = ``;
    connection.query(sql,(err,result)=>{
        if (err) throw err;
        return result ;
    })
}

function getDisease(){
    var sql = ``;
    connection.query(sql,(err,result)=>{
        if (err) throw err;
        return result ;
    })
}

function getNarcotic(){
    var sql = ``;
    connection.query(sql,(err,result)=>{
        if (err) throw err;
        return result ;
    })
}

function getTraining(){
    var sql = ``;
    connection.query(sql,(err,result)=>{
        if (err) throw err;
        return result ;
    })
}

function getHeatStroke(){
    var sql = ``;
    connection.query(sql,(err,result)=>{
        if (err) throw err;
        return result ;
    })
}


// ########################### API LINE NOTI #######################################//#endregion
function getAPI_LINE(params1, params2, params3, params4) {

    request({
        method: 'POST',
        uri: 'https://notify-api.line.me/api/notify',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          bearer: 'GX8jBnkw36xAosJn8YrXOmazEb7wI1Mt3zbeyP6zkce', //token
        },
        form: {
            
          message: '\n ชื่อ :  '+params1+' '+params2+' \n สีปัสสาวะ : '+params3+`\n อุณหภูมิ : `+params4 , //ข้อความที่จะส่ง
        },
      }, (err, httpResponse, body) => {
        if (err) {
          console.log(err)
        } else {
          console.log(body)
        }
      })
}

function callDataLINE(tems) {

    const words = tems.split(':');

    var nameTable;
    var urineColor;
    var temperuture;
    var date;
   // console.log("CallDataLINE 1:"+words[0]);
  //  console.log("CallDataLINE 2:"+words[1]);

    // ทดสอบ  
    if(words[0] == '11' && words[1] == '30'){
        nameTable = 'table_urine_mor' ;
        urineColor = 'u_m_urineColor';
        temperuture = 'u_m_temperuture';
        date = 'u_m_date';
        console.log("CallDataLINE Sessuss");
    }

    console.log("CallDataLINE FALS");

    var sql = `
    SELECT 
          table_military.m_name
        , table_military.m_l_name
        , table_urine_mor.u_m_urineColor
        , table_urine_mor.u_m_temperuture
    FROM table_military 
        INNER JOIN table_urine_mor ON table_military.id = table_urine_mor.colorID 
    WHERE   
    table_urine_mor.u_m_date = '`+date_sum+`' 
    `;
console.log("line "+sql)
    connection.query(sql,(err, result, fields)=>{
        if (err) throw err;

        Object.keys(result).forEach(function(key) {
            var row = result[key];
       
        if(row.u_m_urineColor =='C' || row.u_m_urineColor == 'D'){
           getAPI_LINE(row.m_name, row.m_l_name, row.u_m_urineColor, row.u_m_temperuture);
        }
    }) 
}) 
}

 
function getInsetcolorUrine(tableName, ID, colorName, dataTimename, colorUR_value, dataTime_value ) {

    if(tableName != 'null' || ID != 'null' || colorName != 'null' || dataTimename != 'null' || colorUR_value != 'null' || dataTime_value != 'null'){
        var sql = `
        INSERT INTO `+tableName+`(colorID, `+colorName+`, `+dataTimename+`) 
        VALUES (`+ID+`,'`+colorUR_value+`','`+dataTime_value+`')
        `
        console.log(" getInsetcolorUrine : "+sql);

      connection.query(sql,(err, result, fields)=>{
            if (err) throw err;
            
        }); 
    }else{
        console.log("Error paramiter Null: ");
        throw err;
    }
} 
/*
//function to check that name can not be empty
function checkempty(v) { 
    if (v == null ||  
        v == undefined || 
        v.length == 0) { 
        
        alert("Name cannot be empty\n"); 
        return false; 
    } else { 
        alert("Your response has been recorded\n"); 
        return true; 
    } 
} */

//setTimeout(callDataLINE, 1500, dateFull_sum);
//app.listen(port, '192.168.43.40');
app.listen(port, '192.168.2.107');