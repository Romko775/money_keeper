//підключаємо бібліотеки
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = '8000'; //вибираємо порт >5000
const mysql = require('mysql');

//клієнтська частина сайту знаходитиметься у папці public
app.use(express.static(__dirname + '/public')); //сервер буде використовувати статичну папку "public" як сайт
//стандарти кодування
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));



//MYSQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'project'
});


// create table USERS
let usersTable = function () {
    connection.query('' +
        'CREATE TABLE IF NOT EXISTS users (' +
        'id int(11) NOT NULL AUTO_INCREMENT,' +
        'login varchar(50), ' +
        'password varchar(50), ' +
        'name varchar(50), ' +
        'surname varchar(50), ' +
        'email varchar(80), ' +
        'image varchar(50),' +
        'PRIMARY KEY(id), ' +
        'UNIQUE INDEX `login_UNIQUE` (`login` ASC))',
        function (err) {
            if (err) throw err;
            console.log('CREATE TABLE IF NOT EXISTS users')
       
    //заповнюємо таблицю 1 рядок
    connection.query('SELECT * FROM users  WHERE login = "admin"', function (err, rows) {
        if (err) throw err;
        //якщо адміна не знайдено
        if (rows[0] == undefined) {
       connection.query('INSERT INTO users (id, login, password, name, surname, email, image) VALUES( "1", "admin", "123", "Oleh", "Tarasiv", "some.admin@gmail.com", null);',
                function (err) {
        if (err) throw err;
            console.log('CREATED admin')
                                    });
        }else{
            //оновити дані про адміна
            connection.query('SELECT * FROM users  WHERE login = "admin"', function (err, rows) {
                if (err) throw err;
            });
        }
    })
    //
         });
};

usersTable();

// create table SAVES  //card cash bank і їх суми
let savesTable = function () {
    connection.query('' +
        'CREATE TABLE IF NOT EXISTS saves (' +
        'id int(11) NOT NULL AUTO_INCREMENT,' +
        'name varchar(50), ' +
        'sum varchar(50), ' +
        'users_id int(11),' +
        'PRIMARY KEY(id), '+
        'UNIQUE INDEX `id_UNIQUE` (`id` ASC))',
        function (err) {
            if (err) throw err;
            console.log('CREATE TABLE IF NOT EXISTS saves')
       
    //заповнюємо таблицю 1 рядок
    connection.query('SELECT * FROM saves  WHERE name = "card"', function (err, rows) {
        if (err) throw err;
        //якщо card не знайдено
        if (rows[0] == undefined) {
       connection.query('INSERT INTO saves (id, name, sum, users_id) VALUES( "1", "card", "100", 1);',
                function (err) {
        if (err) throw err;
            console.log('CREATED card')
                                    });
        }else{
            //оновити дані про card
            connection.query('SELECT * FROM saves  WHERE name = "card"', function (err, rows) {
                if (err) throw err;
            });
        }
    })

    //заповнюємо таблицю 2 рядок
      connection.query('SELECT * FROM saves  WHERE name = "bank"', function (err, rows) {
            if (err) throw err;
        //якщо bank не знайдено
        if (rows[0] == undefined) {
       connection.query('INSERT INTO saves (id, name, sum, users_id) VALUES("2", "bank", "200", 1);',
                function (err) {
        if (err) throw err;
            console.log('CREATED bank')
                        });
        }else{
            //оновити дані про bank
            connection.query('SELECT * FROM saves  WHERE name = "bank"', function (err, rows) {
                if (err) throw err;
            });
        }
    })
    //заповнюємо таблицю 3 рядок
      connection.query('SELECT * FROM saves  WHERE name = "cash"', function (err, rows) {
            if (err) throw err;
        //якщо cash не знайдено
        if (rows[0] == undefined) {
       connection.query('INSERT INTO saves (id, name, sum, users_id) VALUES("3", "cash", "300", 1);',
                function (err) {
        if (err) throw err;
            console.log('CREATED cash')
                        });
        }else{
            //оновити дані про cash
            connection.query('SELECT * FROM saves  WHERE name = "cash"', function (err, rows) {
                if (err) throw err;
            });
        }
    })
    //
      }); 
};

savesTable();

// create table CATEGORY EXPENcES // food clothes other
let categoryExpTable = function () {
    connection.query('' +
        'CREATE TABLE IF NOT EXISTS categoryExp (' +
        'id int(11) NOT NULL AUTO_INCREMENT,' +
        'name varchar(50), ' +
        'users_id int(11),' +
        'PRIMARY KEY(id), ' +
        'UNIQUE INDEX `id_UNIQUE` (`id` ASC))',
        function (err) {
            if (err) throw err;
            console.log('CREATE TABLE IF NOT EXISTS categoryExp')
        
    //заповнюємо таблицю 1 рядок
        connection.query('SELECT * FROM categoryExp  WHERE name = "food"', function (err, rows) {
            if (err) throw err;
          //якщо food не знайдено
        if (rows[0] == undefined) {
       connection.query('INSERT INTO categoryExp (id, name, users_id) VALUES("1", "food", 1);',
                function (err) {
        if (err) throw err;
            console.log('CREATED food')
                                    });
        }else{
          //оновити дані про food
            connection.query('SELECT * FROM categoryExp  WHERE name = "food"', function (err, rows) {
                if (err) throw err;
            });
        }
    })
    //заповнюємо таблицю 2 рядок
        connection.query('SELECT * FROM categoryExp  WHERE name = "clothes"', function (err, rows) {
            if (err) throw err;
        //якщо clothes не знайдено
        if (rows[0] == undefined) {
       connection.query('INSERT INTO categoryExp (id, name, users_id) VALUES("2", "clothes", 1);',
                function (err) {
        if (err) throw err;
            console.log('CREATED clothes')
                                    });
        }else{
         //оновити дані про clothes
            connection.query('SELECT * FROM categoryExp  WHERE name = "clothes"', function (err, rows) {
                if (err) throw err;
            });
        }
    })
     //заповнюємо таблицю 3 рядок
        connection.query('SELECT * FROM categoryExp  WHERE name = "others"', function (err, rows) {
            if (err) throw err;
        //якщо others не знайдено
        if (rows[0] == undefined) {
       connection.query('INSERT INTO categoryExp (id, name, users_id) VALUES("3", "others", 1);',
                function (err) {
        if (err) throw err;
            console.log('CREATED others')
                                    });
        }else{
         //оновити дані про others
            connection.query('SELECT * FROM categoryExp  WHERE name = "others"', function (err, rows) {
                if (err) throw err;
            });
        }
    })
    //
        });
};

categoryExpTable();

// create table EXPENcES 
let expencesTable = function () {
    connection.query('' +
        'CREATE TABLE IF NOT EXISTS expences (' +
        'id int(11) NOT NULL AUTO_INCREMENT,' +
        'day varchar(2), ' + 
        'month varchar(2), ' + 
        'year varchar(4), ' + 
        'sum varchar(50), ' + 
        'users_id int(11),' +
        'saves_id varchar(50),' +
        'categoryExp_id varchar(50),' +
        'PRIMARY KEY(id), ' +
        'UNIQUE INDEX `id_UNIQUE` (`id` ASC))',
        function (err) {
            if (err) throw err;
            console.log('CREATE TABLE IF NOT EXISTS expences')
        });
};

expencesTable();

// create table SOURcES // salary work frilance перелік
let sourcesTable = function () {
    connection.query('' +
        'CREATE TABLE IF NOT EXISTS sources (' +
        'id int(11) NOT NULL AUTO_INCREMENT,' +
        'name varchar(50), ' +
        'users_id int(11),' +
        'PRIMARY KEY(id), ' +
        'UNIQUE INDEX `id_UNIQUE` (`id` ASC))',
        function (err) {
            if (err) throw err;
            console.log('CREATE TABLE IF NOT EXISTS sources')
        });
        //заповнюємо таблицю 1 рядок
        connection.query('SELECT * FROM sources  WHERE name = "salary"', function (err, rows) {
               if (err) throw err;
          //якщо salary не знайдено
        if (rows[0] == undefined) {
       connection.query('INSERT INTO sources (id, name, users_id) VALUES("1", "salary", 1);',
                function (err) {
        if (err) throw err;
            console.log('CREATED salary')
                                    });
        }else{
         //оновити дані про salary
            connection.query('SELECT * FROM categoryExp  WHERE name = "salary"', function (err, rows) {
                if (err) throw err;
            });
        }
    })
        //заповнюємо таблицю 2 рядок
        connection.query('SELECT * FROM sources  WHERE name = "presents"', function (err, rows) {
                if (err) throw err;
          //якщо presents не знайдено
        if (rows[0] == undefined) {
       connection.query('INSERT INTO sources (id, name, users_id) VALUES("2", "presents", 1);',
                function (err) {
        if (err) throw err;
            console.log('CREATED presents')
                                    });
        }else{
         //оновити дані про presents
            connection.query('SELECT * FROM categoryExp  WHERE name = "presents"', function (err, rows) {
                if (err) throw err;
            });
        }
    })
    //заповнюємо таблицю 3 рядок
        connection.query('SELECT * FROM sources  WHERE name = "bonus"', function (err, rows) {
                if (err) throw err;
          //якщо bonus не знайдено
        if (rows[0] == undefined) {
       connection.query('INSERT INTO sources (id, name, users_id) VALUES("3", "bonus", 1);',
                function (err) {
        if (err) throw err;
            console.log('CREATED bonus')
                                    });
        }else{
         //оновити дані про frilance
            connection.query('SELECT * FROM categoryExp  WHERE name = "bonus"', function (err, rows) {
                if (err) throw err;
            });
        }
    })
        //
};

sourcesTable();

// create table INCOMES
let incomesTable = function () {
    connection.query('' +
        'CREATE TABLE IF NOT EXISTS incomes (' +
        'id int(11) NOT NULL AUTO_INCREMENT,' +
        'day varchar(2), ' +
        'month varchar(2), ' +
        'year varchar(4), ' +
        'sum varchar(50), ' +
        'users_id int(11),' +
        'sources_id varchar(50),' +
        'saves_id varchar(50),' +
        'PRIMARY KEY(id), ' +
        'UNIQUE INDEX `id_UNIQUE` (`id` ASC))',
        function (err) {
            if (err) throw err;
            console.log('CREATE TABLE IF NOT EXISTS incomes')
        });

};

incomesTable();


//Логінування
app.post('/login', function (req, res) {
    
    console.log(req.body);
    
    connection.query('SELECT * FROM users  WHERE login = ?', req.body.login, function (err, rows) {
        if (err) throw err;
        console.log(rows);
        if (rows[0] != undefined) {
            if (rows[0].password == req.body.password) {
                res.status(200).send(rows[0]);
                
            } else {
                res.status(200).send("Wrong password");
            }
        } 
        else {
            res.status(200).send("Wrong login");
        }
    });
});

app.post('/get_saves', function(req, res){
   connection.query('SELECT * FROM saves', req.body.id, function(err, rows){
       if(err) throw err;
       let array=[];
       for(var i=0; i<rows.length; i++){
           if(rows[i].users_id == req.body.id){
               array.push(rows[i]);
           }
       }
       res.status(200).send(array);
   }) 
});

app.post('/get_incomes', function(req, res){
    connection.query('SELECT * FROM incomes WHERE users_id=?', req.body.id, function(err, rows){
        console.log(rows);
        let array=[];
        for(var i=0; i<rows.length; i++){
            array.push(rows[i]);
        }
        res.status(200).send(array);
        array=[];
    })
});

app.post('/get_expences', function(req, res){
    connection.query('SELECT * FROM expences WHERE users_id=?', req.body.id, function(err, rows){
        console.log(rows);
        let array=[];
        for(var i=0; i<rows.length; i++){
            array.push(rows[i]);
        }
        res.status(200).send(array);
        array=[];
    })
});

app.post('/get_sources', function(req, res){
   connection.query('SELECT * FROM sources', req.body.id, function(err, rows){
       if(err) throw err;
       let array=[];
       for(var i=0; i<rows.length; i++){
           if(rows[i].users_id == req.body.id){
               array.push(rows[i]);
           }
       }
       res.status(200).send(array);
       array=[];
   }) 
});

app.post('/get_catExp', function(req, res){
   connection.query('SELECT * FROM categoryexp', req.body.id, function(err, rows){
       if(err) throw err;
       let array=[];
       for(var i=0; i<rows.length; i++){
           if(rows[i].users_id == req.body.id){
               array.push(rows[i]);
           }
       }
       res.status(200).send(array);
       array=[];
   }) 
});

app.post('/get_all_incomes', function(req, res){
   connection.query('SELECT * FROM incomes WHERE users_id=?', req.body.users_id, function(err, rows){
       if(err) throw err;
       res.status(200).send(rows);
   }) 
});
app.post('/get_all_expences', function(req, res){
   connection.query('SELECT * FROM expences WHERE users_id=?', req.body.users_id, function(err, rows){
       if(err) throw err;
       res.status(200).send(rows);
   }) 
});


app.post('/income_add', function(req, res){
    connection.query('INSERT INTO incomes SET ?', req.body, function(err, result){
        if(err) throw err;
        res.sendStatus(200);
    })
    
    let obj = {
        name: req.body.saves_id,
        users_id: req.body.users_id,
        sum: parseFloat(req.body.sum)
    }
    connection.query('SELECT * FROM saves', obj, function(err, rows){
        for(var i=0; i<rows.length; i++){
            if(rows[i].users_id==obj.users_id){
                if(rows[i].name==obj.name){
                    obj.sum += parseFloat(rows[i].sum);
                    connection.query('UPDATE saves SET sum=? WHERE users_id=? and name=?',[obj.sum, obj.users_id, obj.name], function(err){
                        if(err) throw err;
                    })
                }
            }
        }
        
    })
});

app.post('/expence_add', function(req, res){
    let obj = {
        name: req.body.saves_id,
        users_id: req.body.users_id,
        sum: parseFloat(req.body.sum)
    }
//    console.log(obj);
    
    connection.query('SELECT * FROM saves', obj, function(err, rows){
        for(var i=0; i<rows.length; i++){
            if(rows[i].users_id==obj.users_id){
                if(rows[i].name==obj.name){
                    
                    if(obj.sum>parseFloat(rows[i].sum)){
                        res.status(200).send("error");
                    }
                    else{
                        
                        rows[i].sum = parseFloat(rows[i].sum) - obj.sum;
                        
                        connection.query('UPDATE saves SET sum=? WHERE users_id=? and name=?',[rows[i].sum, obj.users_id, obj.name], function(err){
                            if(err) throw err;
                        })
                        connection.query('INSERT INTO expences SET ?', req.body, function(err, result){
                            if(err) throw err;
                        })
                        
                        res.sendStatus(200);
                    }
                }
            }
        }
        
    })
});





app.post('/check_users', function (req, res) {
    connection.query('SELECT * FROM users WHERE login = ?', req.body.login,
        function (err, result) {
            if (err) throw err;
            if(result[0]==undefined){
                res.status(200).send(true);
            }
            else{
                res.status(200).send(false);
            }
        }
    );
});

//Реєстрація
app.post('/register', function (req, res) {
    connection.query('INSERT INTO users SET ?', req.body,
        function (err, result) {
            if (err) throw err;
            console.log('user added to database with id: ' + result.insertId);
        }
    );
    
    connection.query('SELECT * FROM users WHERE login = ?', req.body.login, function(err, rows){
        
        let reg_id=rows[0].id;  
                
        let val1 = {
                name: "card",
                sum: "0",
                users_id: reg_id
            };
        let val2 = {
                name: "bank",
                sum: "0",
                users_id: reg_id
            };
        let val3 = {
                name: "cash",
                sum: "0",
                users_id: reg_id
            };
        
        
        connection.query('INSERT INTO saves (name, sum, users_id) VALUES (?,?,?)', [val1.name, val1.sum, val1.users_id], function(err){
            if(err) throw err;
        });
        
        connection.query('INSERT INTO saves (name, sum, users_id) VALUES (?,?,?)', [val2.name, val2.sum, val2.users_id], function(err){
            if(err) throw err;
        });
        
        connection.query('INSERT INTO saves (name, sum, users_id) VALUES (?,?,?)', [val3.name, val3.sum, val3.users_id], function(err){
            if(err) throw err;
        });
        
        
        ///////////////////////////////////
        let val4 = {
                name: "salary",
                users_id: reg_id
            };
        let val5 = {
                name: "presents",
                users_id: reg_id
            };
        let val6 = {
                name: "bonus",
                users_id: reg_id
            };
        
        
        connection.query('INSERT INTO sources (name, users_id) VALUES (?,?)', [val4.name, val4.users_id], function(err){
            if(err) throw err;
        });
        
        connection.query('INSERT INTO sources (name, users_id) VALUES (?,?)', [val5.name, val5.users_id], function(err){
            if(err) throw err;
        });
        
        connection.query('INSERT INTO sources (name, users_id) VALUES (?,?)', [val6.name, val6.users_id], function(err){
            if(err) throw err;
        });
        
        //////////////////////////////////////
        
        let val7 = {
                name: "food",
                users_id: reg_id
            };
        let val8 = {
                name: "clothes",
                users_id: reg_id
            };
        let val9 = {
                name: "others",
                users_id: reg_id
            };
        
        
        connection.query('INSERT INTO categoryexp (name, users_id) VALUES (?,?)', [val7.name, val7.users_id], function(err){
            if(err) throw err;
        });
        
        connection.query('INSERT INTO categoryexp (name, users_id) VALUES (?,?)', [val8.name, val8.users_id], function(err){
            if(err) throw err;
        });
        
        connection.query('INSERT INTO categoryexp (name, users_id) VALUES (?,?)', [val9.name, val9.users_id], function(err){
            if(err) throw err;
        });
        
        
        

    })
    
        
    res.status(200).send(true);
});







//усі адреси контролюються клієнтським ангуляром
//* - все інше.  має бути знизу
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

//запуск серверу
app.listen(port,function (err) {
    if (err) throw err;
    console.log('Server start on port 8000!')
})