var app = angular.module('app', ['ngRoute', 'ngDialog']);

//забираємо %2F та # з url сайту
app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
}]);

//створюємо адреси
app.config(function ($routeProvider) {
    $routeProvider
        .otherwise({
            redirectTo: '/'
        });
});

app.controller('myCtrl', function ($scope, $http) {

    //    Загальні дані та глобальні функції і змінні
    
    //    Перевірка чи залогінений користувач
    $scope.is_logged = false;

    
    $scope.balance = 0;
    $scope.monthly_income = 0;
    $scope.monthly_expence = 0;
    $scope.monthly_balance = 0;
    
    var date = new Date();
    $scope.present_month = date.getMonth()+1;
    
    
    $scope.array_days = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
    $scope.array_months = ["01","02","03","04","05","06","07","08","09","10","11","12",];
    $scope.array_years = ["2017","2018","2019","2020","2021","2022","2023","2024","2025","2026","2027","2028","2029","2030","2031","2032","2033","2034","2035","2036","2037","2038","2039","2040"];
    
    $scope.not_selected = "not selected";
    
    
    
    if (localStorage.user_login == undefined) {
        localStorage.user_login = "default";
        localStorage.user_password = "default";
    } else {
        if (localStorage.user_login != "default") {
            $scope.is_logged = true;
            $scope.user_login = localStorage.user_login;
            $scope.user_name = localStorage.user_name;
            $scope.user_s_name = localStorage.user_s_name;
            $scope.user_email = localStorage.user_email;
        }
    }
    //    В наявності чи залогінений, буде появлятися відповідні сторінки
    $scope.check_is_logged = function () {
        if ($scope.is_logged) {
            $scope.show_welcome = false;
            $scope.show_login = false;
            $scope.show_register_step_one = false;
            $scope.show_register_step_two = false;
            $scope.show_panel = true;
            $scope.show_menu = false;
            $scope.show_home = true;
            $scope.show_account = false;
            $scope.show_history = false;
            $scope.show_statistic = false;
        } else {
            $scope.show_welcome = true;
            $scope.show_login = false;
            $scope.show_register_step_one = false;
            $scope.show_register_step_two = false;
            $scope.show_panel = false;
            $scope.show_menu = false;
            $scope.show_home = false;
            $scope.show_account = false;
            $scope.show_history = false;
            $scope.show_statistic = false;
        }
    }
    $scope.check_is_logged();

    
    // //Масив catExpenses
    // $scope.catExpenses = ["food", "house", "car"];
    //
    //
   
});
//Директива Welcome
app.directive("welcomeBlock", function () {
    return {
        replace: true,
        templateUrl: "template/welcome.html",
        controller: function ($scope) {

            $scope.login_btn = function () {
                $scope.show_welcome = false;
                $scope.show_login = true;
            }

            $scope.register_btn = function () {
                $scope.show_welcome = false;
                $scope.show_register_step_one = true;
            }

        }
    }
});
//Директива Log in
app.directive("loginBlock", function () {
    return {
        replace: true,
        templateUrl: "template/login.html",
        controller: function ($scope, $http) {

            $scope.login_responce = "";


            // Перевірка користувачів

            $scope.log_in = function () {
                
                let log_obj = {
                    login: $scope.user_login,
                    password: $scope.user_password
                }
                
                console.table(log_obj);
                
                $http.post('http://localhost:8000/login', log_obj)
                  .then(function successCallback(response){
                    if(response.data=="Wrong password" || response.data=="Wrong login"){
                        
                        
                        console.log(response.data);
                        $scope.login_responce = response.data;
                    }
                    else{
                        console.log(response.data);
                        $scope.show_login = false;
                        $scope.show_panel = true;
                        $scope.show_home = true;
                        $scope.login_responce = "";
                        localStorage.user_login = $scope.user_login;
                        localStorage.user_password = $scope.user_password;
                        
                        //Дані користувача
                        $scope.AccountData = response.data;
                        
                        console.table($scope.AccountData);
                        
                        localStorage.user_name = $scope.AccountData.name;
                        $scope.user_name = localStorage.user_name;
                        
                        localStorage.user_s_name = $scope.AccountData.surname;
                        $scope.user_s_name = localStorage.user_s_name;
                        
                        localStorage.user_email = $scope.AccountData.email;
                        $scope.user_email = localStorage.user_email;
                        
                        localStorage.user_id = $scope.AccountData.id;
                        
                        
                        
                        //підтягуємо дані категорій
                        $scope.get_saves();
                        $scope.get_incomes();
                        $scope.get_expences();
                        $scope.get_sources();
                        $scope.get_catExp();
                    }

                  }, function errorCallback(response){
                    console.log("Error: " + response.err);
                  });
                
            }
        }
    }
});

app.directive("registerBlock", function () {
    return {
        replace: true,
        templateUrl: "template/register.html",
        controller: function ($scope, $http, ngDialog) {
            $scope.is_free = false;
            $scope.register_user_login_responce = "Check user name";
            $scope.register_password_responce = "";
            
            $scope.check_user_login = function(){
                
                 if($scope.register_user_login){
                    let obj1 = {
                         login:$scope.register_user_login
                     }

                     $http.post('/check_users', obj1)
                     .then(function successCallback(response){
                        if(response.data){
                            $scope.is_free=true;
                            $scope.register_user_login_responce = "User login is free";
                        }
                        else{
                            $scope.register_user_login_responce = "User login is used";
                            $scope.is_free=false;
                        }
                     }, function errorCallback(response){
                          console.log("Error: " + response.err);
                     }); 
                 }
                 else{
                    ngDialog.open({
                        plain: true,
                        template: "<h1>Opps!</h1><br><p>It seems that there was some error.</p><p>Please enter user login</p>"
                    });
                 }
            }
            
            $scope.register_btn_step_1 = function(){
                if($scope.register_user_password_1==$scope.register_user_password_2){
                    $scope.show_register_step_one = false;
                    $scope.show_register_step_two = true;
                }
                else{
                    $scope.register_password_responce = "Password doens`t match";
                }
            }
            
            $scope.register_btn_step_2 = function(){
                
                let final_obj = {
                    login: $scope.register_user_login,
                    password: $scope.register_user_password_2,
                    name: $scope.register_name,
                    surname: $scope.register_second_name,
                    email: $scope.register_e_mail
                };
                
                 $http.post('/register', final_obj)
                 .then(function successCallback(response){
                    if(response.data){
                        
                        ngDialog.open({
                            plain: true,
                            template: "<h1>Welcome!</h1><br><br.<p>Thank you for youre register.</p><p>Please log in into the system</p>",
                            scope: $scope,
                            controller: function($scope){}
                        });
                        
                        $scope.register_user_login="";
                        $scope.register_user_login_responce="";
                        $scope.register_user_password_1="";
                        $scope.register_user_password_2="";
                        $scope.register_password_responce="";
                        $scope.register_name="";
                        $scope.register_second_name="";
                        $scope.register_e_mail="";
                        
                    }
                 }, function errorCallback(response){
                      console.log("Error: " + response.err);
                 });
                
                $scope.show_register_step_two = false;
                $scope.show_welcome = true;
            }
            
        }
    }
});

app.directive("copyrightBlock", function(){
    return{
        replace: true,
        templateUrl: "template/copyright.html",
        controller: function($scope){
            
        }
    }
});

app.directive("panelBlock", function () {
    return {
        replace: true,
        templateUrl: "template/panel.html",
        controller: function ($scope, $http, ngDialog) {
            $scope.show_menu = false;
            $scope.menu_btn = function () {
                if($scope.show_menu){
                   $scope.show_menu = false; 
                }
                else{
                    $scope.show_menu = true;
                }
//                $(".menuBlock").fadeIn();
            }

            //кнопки
            $scope.logout_btn = function () {
                $scope.user_login = "";
                $scope.user_password = "";
                localStorage.user_login = "default";
                localStorage.user_password = "default";
                
                
                $scope.is_logged = false;
                $scope.check_is_logged();
            }
            
            
//            //обєкт із нашим id коритсувача
//            let obj_id = {
//                id: localStorage.user_id
//            }
            
            //витягуємо сейви
            $scope.get_saves = function(){
                let obj_id = {
                    id: localStorage.user_id
                }
                $http.post('http://localhost:8000/get_saves', obj_id)
                    .then(function successCallback(response){
                        let saves_response = response.data;
                        $scope.saves =[];
                        $scope.balance=0;
                    
                    // рахуємо баланс
                        for(var i=0; i<saves_response.length; i++){
                            $scope.balance += +(saves_response[i].sum);
                            $scope.saves.push(saves_response[i]);
                            
                        }
                    
                    console.log($scope.saves);
                    
                        $scope.income_select_save = $scope.saves[0].name;
                        $scope.expence_select_exp_save = $scope.saves[0].name;
                    
                    }, function errorCallback(response){
                        console.log("Error: " + response.err);
                    });
            }
            $scope.get_saves();
            
            //витягуємо інками
            $scope.get_incomes = function(){
                let obj_id = {
                    id: localStorage.user_id
                }
                $http.post('http://localhost:8000/get_incomes', obj_id)
                    .then(function successCallback(response){
                        let income_responce = response.data;
                    console.table(income_responce);
                        $scope.monthly_income = 0;
                    
                        for(var i=0; i<income_responce.length; i++){
                            if(income_responce[i].month == $scope.present_month){
                                $scope.monthly_income += +(income_responce[i].sum);
                            }
                        }
                    
//                    $scope.calculate_m_balance();
                    
                    }, function errorCallback(response){
                        console.log("Error: " + response.err);
                    });
            }
            $scope.get_incomes();
            
            $scope.get_expences = function(){
                let obj_id = {
                    id: localStorage.user_id
                }
                $http.post('http://localhost:8000/get_expences', obj_id)
                    .then(function successCallback(response){
                        let expence_responce = response.data;
                        $scope.monthly_expence = 0;
                    
                        for(var i=0; i<expence_responce.length; i++){
                            if(expence_responce[i].month == $scope.present_month){
                                $scope.monthly_expence += +(expence_responce[i].sum);
                            }
                        }
                                        
                    $scope.calculate_m_balance();
                    
                    }, function errorCallback(response){
                        console.log("Error: " + response.err);
                    });
            }
            $scope.get_expences();
            
            $scope.calculate_m_balance = function(){
                $scope.monthly_balance = $scope.monthly_income - $scope.monthly_expence;
                if($scope.monthly_balance < 0 && $scope.user_login==localStorage.user_login){
                    ngDialog.open({
                        plain: true,
                        template: "<p>Sorry for interrupting you, but youre monthly expences are bigger than youre monthly incomes. <b>We are worried that you will have enough money in the next month.</b></p><p><i>With love, Dream_team&copy</i></p>"
                    });
                }
            }
                        
            //витягуємо соурси
            $scope.get_sources = function(){
                let obj_id = {
                    id: localStorage.user_id
                }
                $http.post('http://localhost:8000/get_sources', obj_id)
                    .then(function successCallback(response){
                        let sources_response = response.data;
                        $scope.sources = [];
                    for(var i=0; i<sources_response.length; i++){
                        $scope.sources.push(sources_response[i].name)
                    }
                    
                    $scope.income_select_source = $scope.sources[0];
                    
                    }, function errorCallback(response){
                        console.log("Error: " + response.err);
                    });
            }
            $scope.get_sources();
            
            //витягуємо категорії витрати
            $scope.get_catExp = function(){
                let obj_id = {
                    id: localStorage.user_id
                }
                $http.post('http://localhost:8000/get_catExp', obj_id)
                    .then(function successCallback(response){
                        let catExp_response = response.data;
                        $scope.catExp = [];
                    for(var i=0; i<catExp_response.length; i++){
                        $scope.catExp.push(catExp_response[i].name)
                    }
                    
                    $scope.expence_select_cat_exp = $scope.catExp[0];
                    
                    }, function errorCallback(response){
                        console.log("Error: " + response.err);
                    });
            }
            $scope.get_catExp();
        }
    }
});

app.directive("menuBlock", function () {
    return {
        replace: true,
        templateUrl: "template/menu.html",
        controller: function ($scope) {
            $scope.show_account = false;
            $scope.show_history = false;
            $scope.show_statistic = false;

            $scope.home_btn = function () {
                $scope.show_account = false;
                $scope.show_home = true;
                $scope.show_history = false;
                $scope.show_statistic = false;
            }
            $scope.account_btn = function () {
                $scope.show_account = true;
                $scope.show_home = false;
                $scope.show_history = false;
                $scope.show_statistic = false;
            }

            $scope.history_btn = function () {
                $scope.show_account = false;
                $scope.show_home = false;
                $scope.show_history = true;
                $scope.show_statistic = false;
            }
            $scope.statistic_btn = function () {
                $scope.show_account = false;
                $scope.show_home = false;
                $scope.show_history = false;
                $scope.show_statistic = true;
            }
        }
    }
});

app.directive("homeBlock", function () {
    return {
        replace: true,
        templateUrl: "template/home.html",
        controller: function ($scope, $http, ngDialog) {
            $scope.income_add = function(){
                if($scope.income_amount){
                    
                    let home_obj = {
                        day: $scope.income_day,
                        month: $scope.income_month,
                        year: $scope.income_year,
                        sum: $scope.income_amount,
                        users_id: localStorage.user_id,
                        sources_id: $scope.income_select_source,
                        saves_id: $scope.income_select_save
                    }
                    
                   $http.post('http://localhost:8000/income_add', home_obj)
                    .then(function successCallback(response){
                        $scope.get_saves();
                        $scope.get_incomes();
                        $scope.calculate_m_balance();
                        $scope.income_amount="";
                    }, function errorCallback(response){
                        console.log("Error: " + response.err);
                    });
                }
                else{
                    ngDialog.open({
                        plain: true,
                        template: "<h1>Opps!</h1><br><p>It seems that there was some error.</p><p>Please insert some amount.</p>"
                    });
                }
            }
            
            $scope.expence_add = function(){
                if($scope.expence_amount){
                    let home_obj = {
                        day: $scope.expence_day,
                        month: $scope.expence_month,
                        year: $scope.expence_year,
                        sum: $scope.expence_amount,
                        users_id: localStorage.user_id,
                        categoryExp_id: $scope.expence_select_cat_exp,
                        saves_id: $scope.expence_select_exp_save
                    }
                    $http.post('http://localhost:8000/expence_add', home_obj)
                        .then(function successCallback(response){
                            if(response.data=="error"){

                                ngDialog.open({
                                    plain: true,
                                    template: "<p><b>Ammount is bigger than saves balance!</b></p><p>Please input the correct amount or change the saves with bigger balance!</p>"
                                });

                            }
                            else{
                                $scope.get_saves();
                                $scope.get_expences();
                                $scope.calculate_m_balance();
                                $scope.expence_date = "";
                                $scope.expence_amount = "";
                            }
                        }, function errorCallback(response){
                            console.log("Error: " + response.err);
                        });
                }
                else{
                    ngDialog.open({
                        plain: true,
                        template: "<h1>Opps!</h1><br><p>It seems that there was some error.</p><p>Please insert some amount.</p>"
                    });
                }
            }
        }
    }
});

app.directive("accountBlock", function () {
    return {
        replace: true,
        templateUrl: "template/account.html",
        controller: function ($scope) {}
    }
});

app.directive("historyBlock", function () {
    return {
        replace: true,
        templateUrl: "template/history.html",
        controller: function ($scope, $http, $filter) {
            
            $scope.history_array_income =[];
            $scope.history_array_expence =[];
            
            $scope.load_history = function(){
                
                $scope.history_array_income =[];
            $scope.history_array_expence =[];
                
                let obj = {
                    users_id: localStorage.user_id
                }

                $http.post('/get_all_incomes', obj)
                 .then(function successCallback(response){
                    $scope.history_income = response.data;
                    for(var i=0; i<$scope.history_income.length; i++){
                        $scope.history_array_income.push($scope.history_income[i]);
                    }
                    
                    
                 }, function errorCallback(response){
                      console.log("Error: " + response.err);
                 });  
                
                $http.post('/get_all_expences', obj)
                 .then(function successCallback(response){
                    $scope.history_expence = response.data;
                    for(var i=0; i<$scope.history_expence.length; i++){
                        $scope.history_array_expence.push($scope.history_expence[i]);
                    }
                    
                    
                 }, function errorCallback(response){
                      console.log("Error: " + response.err);
                 });  
            }
            
            $scope.propertyName1 = 'month';
            $scope.propertyName2 = 'month';
            $scope.reverse1 = true;
            $scope.reverse2 = true;
            
            $scope.sort_table1 = function(propertyName1){
                $scope.reverse1 = ($scope.propertyName1 === propertyName1) ? !$scope.reverse1 : false;
                $scope.propertyName1 = propertyName1;
            }
            $scope.sort_table2 = function(propertyName2){
                $scope.reverse2 = ($scope.propertyName2 === propertyName2) ? !$scope.reverse2 : false;
                $scope.propertyName2 = propertyName2;
            }
            
            
        }
    }
});

app.directive("statisticBlock", function () {
    return {
        replace: true,
        templateUrl: "template/statistic.html",
        controller: function ($scope, $http) {
            
//            
//            // Load google charts
//            google.charts.load('current', {'packages':['corechart']});
//            google.charts.setOnLoadCallback(drawChart);
//
//            // Draw the chart and set the chart values
//            function drawChart() {
//              var data = google.visualization.arrayToDataTable([
//              ['Day', 'Income', 'Expences'],
//              ['1', 1,1],
//              ['2', 2,2],
//              ['3', 3,0],
//              ['4', 8,0],
//              ['5', 8,2],
//              ['6', 1,1],
//              ['7', 2,2],
//              ['8', 3,0],
//              ['9', 8,0],
//              ['10', 8,2],
//              ['11', 1,1],
//              ['12', 2,2],
//              ['13', 3,0],
//              ['14', 8,0],
//              ['15', 8,2],
//              ['16', 1,1],
//              ['17', 2,2],
//              ['18', 3,0],
//              ['19', 8,0],
//              ['20', 8,2],
//              ['21', 1,1],
//              ['22', 2,2],
//              ['23', 3,0],
//              ['24', 8,0],
//              ['25', 8,2],
//              ['26', 1,1],
//              ['27', 2,2],
//              ['28', 3,0],
//              ['29', 8,0],
//              ['30', 8,2],
//              ['31', 8,2]
//            ]);
//
//              // Optional; add a title and set the width and height of the chart
//              var options = {
//                  title: "",
//        width: 750,
//        height: 900,
//                  chartArea: {
//                    height: "80%",
//                    width: "70%"
//                  },
////                  title:'My Average Day',
//////                  backgroundColor: 'transparent',
////                  width: 700, 
////                  height:500,
////                  pieSliceText: 'none',
//////                  chartArea: {
//////                    height: "80%",
//////                    width: "80%"
//////                  },
////                  legend: {position: 'labeled'},
////                  pieHole: 0.4
//              };
//
//              // Display the chart inside the <div> element with id="piechart"
//              var chart = new google.visualization.BarChart(document.getElementById('piechart'));
//              chart.draw(data, options);
//            }
//            
//            
        }
    }
});




////////////////////
