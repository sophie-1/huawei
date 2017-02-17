var app=angular.module('indexApp',['ui.router']);
app.controller('indexCtrl',function($scope,$window,$http){
			var swiper = new Swiper('.swiper-container', {
				pagination: '.swiper-pagination',
				paginationClickable: true,
				autoplay:500,
			});
			//点击进入搜索页面
			$scope.search=function(){
				$window.location.href='#/search'
			}
			//加载json数据
			$http.get('json/json.json').success(function(data){
				$scope.data1=data.data1;
				$scope.id=data.data1.id
			})
			$http.get('json/json.json').success(function(data){
				$scope.data2=data.data2;	
			})
			$http.get('json/json.json').success(function(data){
				$scope.data3=data.data3;	
			})
			$http.get('json/json.json').success(function(data){
				$scope.data4=data.data4;	
			})
			//从首页进入相应的详情页
			
})
app.controller('detailCtrl',function($scope){
	 var swiper = new Swiper('.swiper-container', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        pagination: '.swiper-pagination',
        paginationType: 'fraction',
        
    });
})
app.controller('searchCtrl',function($scope,$http){
	$scope.bool=false;
	$scope.search=function(){
		$http.get('json/json.json').success(function(data){
		$scope.goodsList=data.goodsList;
		console.log($scope.value1)
		if($scope.value1==""){
			$scope.bool=false;
		}else{
			$scope.bool=true;
		}
		})
	}
})
//注册控制器
app.controller('register',function($scope){
	var $userName=$('#username');
	var $pass=$('#reg_password');
	var $pass2=$('#password2')
	var isUser=	/^1\d{10}$/;//验证手机号
	var isPass=	/^[a-z0-9_-]{6,18}$/;//验证密码
	$scope.register=function(){
	window.localStorage.setItem("username",$userName.val())
	window.localStorage.setItem("password",$pass.val())
		
	}
})
app.controller('loginCtrl',function($scope){
	var $login_btn=$('#login_btn');
	var username=window.localStorage.getItem("username");
	var password=window.localStorage.getItem("password");
	
	$scope.login=function(){
		//特别注意，用户名和密码应在点击登录之后再获取，不然得不到自己输入的值
		var $username=$('#username').val();
		var $password=$('#password').val();
	    if($username==username&&$password==password){
	    	alert('登录成功')
	    }else{
	    	alert("您的输入有误");
	    }
//	console.log($username,$password)
	
	}
})
app.config(function($stateProvider,$urlRouterProvider){
	$stateProvider.state('index',{
		url:'/index',
		templateUrl:'template/index.html',
		controller: 'indexCtrl'
	}).state('search',{
		url:'/search',
		templateUrl:'template/search.html',
		controller: 'searchCtrl'
	}).state('detail',{
		url:'/detail',
		templateUrl:'template/detail.html',
		controller: 'detailCtrl'
	}).state('login',{
		url:'/login',
		templateUrl:'template/login.html',
		controller: 'loginCtrl'
	}).state('shoppingCart',{
		url:'/shoppingCart',
		templateUrl:'template/shoppingCart.html',
		controller: 'shoppingCartCtrl'
	}).state('register',{
		url:'/register',
		templateUrl:'template/register.html',
		controller: 'register'
	})
	$urlRouterProvider.when('','/index');//重定向
})
