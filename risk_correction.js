// ############################### risk - TABLE ##################################################### 
app.get('/riskTable',(req,res) =>{
    var sql = "SELECT 	id, m_id_card, m_name, m_l_name, m_blood_type, weight, height, bml, career FROM table_military";
 //   console.log("riskCorrection :"+sql);
    connection.query(sql,(err,result) => {
        if (err) throw err;   
        res.json(result); 
    });
});

app.get('/getRiskUpdate/:id',(req, res) =>{
    var id = req.params.id;
    var sql = "SELECT * FROM table_military WHERE id = "+id;
    console.log("getRiskUpdate :"+sql);
 
    connection.query(sql,(err,result) => {
        if (err) throw err;   
        res.json(result); 
    });
});