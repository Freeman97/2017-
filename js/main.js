var name;
var phone;
var mail;

$(document).ready(
function()
{
$("#next1").click(
    function()    
    {   
        name = $("#name")["0"].value.trim();
        phone = $("#phone")["0"].value.trim();
        mail = $("#mail")["0"].value.trim();
        //console.log([name, phone, mail]);
        if(checkName(name) && checkPhone(phone) && checkEmail(mail))
        {
            $("#info1").html("");
            $("#page1").hide();
            $("#page2").show();
        }
    }
)
$("#back").click(
    function()
    {
        $("#page2").hide();
        $("#page1").show();
    }
)
$("#next2").click(
    function()
    {
        var checkedpic = new Array();
        var pic = $(".check")
        for(var i = 0; i < 7; i++)
        {
            if(pic[i].checked)
            {
                checkedpic.push(pic[i].value);
                //console.log(pic[i].value);
            }
        }
        if(checkedpic.length == 2 || checkedpic.length == 1)
        {
            if(checkedpic.length == 1)
            {
                checkedpic.push("none");
            }
            $.ajax(
                {
                    type: "POST",
                    url: "SignUp.php",
                    data:
                    {
                        "name":name,
                        "phone":phone,
                        "mail":mail,
                        "pic1":checkedpic[0],
                        "pic2":checkedpic[1],
                    },
                    timeout: 30000,
                    dataType: "jsonp",
                    jsonp: "callback",
                    jsonpCallback: "callbackName",
                    success: function(json)
                    {
                        if(json.check == 1)
                        {
                            $("#info2").html("报名信息录入失败，请重试");
                        }
                        else if(json.check == 2)
                        {
                            $("#info2").html("报名信息与其他用户重复，请检查");
                        }
                        else if(json.check == 4)
                        {
                            $("#info2").html("连接数据库失败");
                        }
                        else
                        {
                            loadpic(checkedpic);
                            //console.log(checkedpic.length);
                            $("#num").html(json.check);
                            //console.log(json.check);
                            $("#page2").hide();
                            $("#page3").show();
                        }
                    }, 
                    error: function(jqXHR, textStatus, errorThrown)
                    {
                        /*console.log(textStatus);
                        console.log(jqXHR.status);
                        console.log(jqXHR.readyState);*/
                        $("#info2").html("请求发送失败，请重试");
                    }
                }
            )
        }
        else if(!checkedpic.length)
        {
            $("#info2").html("请至少选择一项");
        }
        else
        {
            $("#info2").html("至多只能选择两项");
        }
    }
)
}
);

function loadpic(checkedpic)
{
   if(checkedpic[1] == "none")
   {
       $("#selected2").css("display", "none");
       if(checkedpic[0] == "diy")
       {
           $("#imgname1").html("自定");
           $("#img1").css("background-image", "none");
       }
       else
       {
           var a = checkedpic[0].split("");
           $("num1").html(a[3]);
           console.log(a[3])
           $("#img1").css("background-image", "url(img/" + checkedpic[0] + ".jpg")
       }
   }
   else
   {
       $("#selected2").css("display", "inline-block")
       if(checkedpic[0] == "diy")
       {
            $("#imgname1").html("自定");
            $("#img1").css("background-image", "none");
            var a = checkedpic[1].split("");
            //$("imgname2").html("图案" + a[3]);
            $("#num2").html(a[3])
            $("#img2").css("background-image", "url(img/" + checkedpic[1] + ".jpg")
       }
       else if(checkedpic[1] == "diy")
       {
            $("#imgname2").html("自定");
            $("#img2").css("background-image", "none");
            var a = checkedpic[0].split("");
            //$("imgname1").html("图案" + a[3]);
           $("#num1").html(a[3]);
            $("#img1").css("background-image", "url(img/" + checkedpic[0] + ".jpg")
       }
       else
       {
           var a = checkedpic[0].split("");
           var b = checkedpic[1].split("");
           //$("imgname1").html("图案" + a[3]);
           $("#num1").html(a[3]);
           $("#img1").css("background-image", "url(img/" + checkedpic[0] + ".jpg")
           //$("imgname2").html("图案" + a[3]);
           $("#num2").html(b[3]);
           $("#img2").css("background-image", "url(img/" + checkedpic[1] + ".jpg")
       }
   }
}

// 检查姓名 
function checkName(name){
	if(name === ""){
		$("#info1").html("请输入姓名！");
	}else if(!(/^[\u4E00-\u9FA5]{2,10}$/.test(name))){
		$("#info1").html("请输入2~10个汉字！");
	}else{
		return true;
	}
}

// 检查电话号码
function checkPhone(phone){
	if(phone === ""){
		$("#info1").html("请输入手机号码！");
	}else if(!(/^1[34578]\d{9}$/.test(phone))){
		$("#info1").html("手机号码输入有误！");
	}else{
		return true;
	}
}

// 检查邮箱
function checkEmail(mail){
	if(mail === ""){
		$("#info1").html("请输入邮箱！");
	}else if(!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(mail))){
		$("#info1").html("邮箱输入有误！");
	}else{
		return true;
	}
}