
var accntentrflag = 0, shpngvalidflag = 1;

$(document).ready(function () {
  $('html, body').animate({scrollTop: '0px'}, 300);
      displayorders();
    wishlist();
    persnlInfo();
    displayaddrs();
    actn=''+actn;
    actn=actn.split(' ');
    actn=actn[1];
    if (actn == 'pId')
        perninfo();
    else if (actn == 'oId')
        ordrinfo();
    else if (actn == 'sId')
        saveadrinfo();
    else if (actn == 'cId')
        chngpasrd();
    else if (actn == 'wId')
        whlist();
    else
        perninfo();


    $(document).keypress(function (e) {
        if (e.which == 13)
        {  
            if (accntentrflag == 1) 
                savemyaddress();
            else if (accntentrflag == 2)
                resetpasswrd();
        }
    });
    
    /*slide panel of myacc*/
    $('.log-Icn').on('click',function(){
        $('#side_menus').css({"transform":"translateX(-20px)","transition":"300ms"}); 
    });
    $('.log-Crs').on('click',function(){
        $('#side_menus').css({"transform":"translateX(-115%)","transition":"300ms"}); 
    });
    $( window ).resize(function() {
        if((window.outerWidth) > 768){
            $('#side_menus').css({"transform":"translateX(-20px)","transition":"300ms","display":"block"});
        }
    });
});
 
 function getMonthNamebyVal(mnt) {
    var monthNames = ["Jan", "Feb", "March", "April", "May", "June",
	"July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames[mnt];
}

function displayorders()
{
    var titod = "";
    var orderstr = "";
    var ordTitle = "";

    var userid = localStorage.getItem('jzeva_uid');
    var orderid = localStorage.getItem('jzeva_cartid');
    var URL = APIDOMAIN + "index.php?action=getAllOrderDetails&userid=" + userid;

    $.ajax({
        url: URL,
        type: "GET",
        datatype: "JSON",
        success: function (results)
        {
            
            var obj = JSON.parse(results);
           
            if (obj["result"] == null) {
                $('#noordrs').removeClass('dn');
                $('.orderOuter').addClass('dn');

            } else
            {
                $('#noordrs').addClass('dn');

                // var totalprice = $('#ordPrice').html(indianMoney(parseInt(obj.totalprice)));
                var totalprice = indianMoney(parseInt(obj.totalprice));
                $(obj['result']).each(function (r, e) {
                    
                    var gndr=e.gender;
                    var gender= getgender(gndr);
                    var ordrdate = "";
                    ordrdate = e.order_date;
                    ordrdate = ordrdate.split(' ');
                    var ordDate = ordrdate[0];


		    var yr=ordDate.toString().split("-")[0];
		    var dt =ordDate.toString().split("-")[1];
		    var cc = ordDate.toString().split("-")[2];
		    var cd = cc.split(0).join('');
		    if(dt <10)
                       dt = dt.split(0).join('');
		    var month=getMonthNamebyVal(dt-1);

                    var updatedt ="";
                     updatedt += e.updatedon;
                    updatedt = updatedt.split(' ');
                    var upDate= updatedt[0];

                    var dd= upDate.toString().split("-")[2];
                    var ds = dd.split(0).join('');

                    Date.prototype.getMonthName = function () {
                        var monthNames = ["Jan", "Feb", "March", "April", "May", "June",
                            "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
                        return monthNames[this.getMonth()];
                    }
                    var month_Name = new Date().getMonthName();
                    var cnfDate = '' + cd + ' ' + month_Name + '';
                    var statusDate = '' + ds + ' ' + month_Name + '';
                    var trndate=''+cd+'-'+month+'-'+yr;

//                   if($('#oId').html()){
//                   order += ' <div class="fLeft tabHead headLine borBtm " id="od">my orders</div>';
//               }else
//                    order+= ' <div class="fLeft tabHead headLine borBtm dn " id="od">my orders</div>';

                    orderstr += '<div class="fLeft orderOuter">';
                    orderstr += '<div class="fLeft inShip" id="ordTitle">';
                    orderstr += '<div class="fLeft Morder">';
                    // orderstr += '<div class="fLeft col100 bolder txt_Upper">Shipping address</div>';
                    orderstr += '<div class="fLeft col100 blStl"><span class="txt_Capital">'+gender +'</span> '+ e.customername + '</div>';
                    orderstr += '<div class="fLeft col100 shipAddr">' + e.customerAddrs + ' ' + e.customerCity + ' </div>';
                    orderstr += '<div class="fLeft col100 shipAddr">' +e.customerState + ' ' + e.customerPincode + '</div>';
                    orderstr += '<div class="actBtn" id="'+e.oid+'" onclick="dwninvoice(this)">view invoice</div>';
                    orderstr += '</div>';

                    // orderstr += '</div>';
                    orderstr += '<div class="fLeft Morder txt_right">';
                    orderstr += '<div class="fRight col100 semibold cartRup15b font18" id="ordPrice">&nbsp' +indianMoney(parseInt(e.total)) + '</div>';
                    // orderstr += '<div class="fLeft col100">Order No</div>';
                    orderstr += '<div class="fLeft col100 regular" id="ordId">ID: ' + e.oid + '</div>';
                    orderstr += '<div class="fLeft col100 regular" id="ordDate">' + trndate + '</div>';
                    // orderstr += '<div class="fLeft col100">Total price</div>';


                    orderstr += ' </div>';
                    orderstr += '</div>';
                    orderstr += '</div>';
                    $(e).each(function (s, v) {
                        var wht;
                        if (v.ccatname !== null) {
                            wht = getweight(v.size, v.ccatname, v.metal_weight);
                        } else {
                            wht = v.metal_weight;
                        }

                        var dmdcarat= v.dmdcarat;

                        var jweltype=v.jewelType;


                        if (v.default_image !== null) {
                            var image = IMGDOMAIN + v.default_image;
                        } else {
                            var image = v.prdimage;
                            image = image.split(',');
                            image = IMGDOMAIN + image[0];
                        }
                        orderstr += ' <div class="fLeft detailsOuter bNone" id="ordDetail">';
                        orderstr += '<div class="orderParent fLeft transition300">';
                        orderstr += '<div class="fLeft orderImg bgCommon" style="background: #fff url(\''+ image +'\')no-repeat;background-size: contain;background-position:center; background-color:#FFF;"></div>';
                        orderstr += '<div class="fLeft orderName">';
                        orderstr += '<div class="fLeft col100 blStl  txt_Upper">' + v.prdname + '</div>';
                        orderstr += '<div class="fLeft  col100">';
                        orderstr += '<span class="fLeft txt_Capital">'+ jweltype +' | ' + v.color + ' | '+ v.Metalcarat +' | '+ wht +' Grams</span>';
                        orderstr += '<span class="fLeft"></span>';
                        orderstr += '</div>';                      ;
                        orderstr += '<div class="fLeft  col100">';
                       if(v.dmdcarat === null )
                       orderstr += '<span class="fLeft txt_Capital">Solitaire '+v.Solicarat+'Ct | '+ v.Soliclarity + (v.size != 0.0 ? ' | Size: '+v.size  : '') +'</span>';   
                         else
                        orderstr += '<span class="fLeft txt_Capital">Diamonds '+ v.dmdcarat +'Ct | '+ v.quality + (v.size != 0.0 ? ' | Size: '+v.size  : '') +'</span>';
                        orderstr += '<span class="fLeft"></span>';
                        orderstr += '</div>';
                          orderstr += '<div class="fLeft col100 semibold ">Code:<span class="regular">' + v.product_code + '</span></div>';
                        // orderstr += '<div class="fLeft  shipTo">';
                        // orderstr += '<span class="fLeft">Qty :</span>';
                        // orderstr += '<span class="fLeft">' + v.pqty + '</span>';
                        // orderstr += '</div>';
                        // orderstr += '<div class="fLeft  shipTo">';
                        // if (v.size != 0.0) {
                        //     orderstr += '<span class="fLeft">Size :</span>';
                        //     orderstr += '<span class="fLeft">' + v.size + '</span>';
                        // }
                        // orderstr += '</div>';
                        orderstr += '</div>';
                        orderstr += '<div class="fLeft rsCont">';

                        orderstr += '<div class="ordPqty">' + v.pqty + '</div>';
                        orderstr += '<div class="fLeft vatTxt dn">';
                        orderstr += '<div class="fLeft col100">MRP<span>&#8377 50,000</span></div>';
                        orderstr += '<div class="fLeft col100">VAT:<span>7487384</span></div>';
                        orderstr += '<div class="fLeft col100">tax:<span>675675</span></div>';
                        orderstr += '</div>';
                        orderstr += '</div>';
                        orderstr += '<div class="fLeft ordRt txt_right">';
                        orderstr += '<div class="col100 fLeft"><div class="fRight cartRup15b semibold font16">&nbsp' + indianMoney(parseInt(v.price)) + '</div></div>';
                        orderstr += '<div class="filterSec fLeft" id="'+v.order_status+'">';
                        orderstr += '<center>';
                        orderstr += '<div class="button actBtn transition300 fRight mar0 trackCommon" id="' + v.pid + '_' + s + '_'+v.order_status+'_'+v.oid+'" onclick="trackslide(this)">track</div>';
                        orderstr += '</center>';
                        orderstr += '</div>';
                        orderstr += '</div>';
                        orderstr += '<div class="fLeft trackOuter poR dn">';
                        orderstr += '<center>';
                        orderstr += '<div class="trackDivs">';
                        orderstr += '<div class="fLeft placedTxt">Order Placed</div>';
                        orderstr += '<div class="fLeft dateTxt">' + cnfDate + '</div>';
                        orderstr += '<div class="fLeft proStep" id="1ststp"></div>';
                        orderstr += '</div>';
                        orderstr += '<div class="trackDivs">';
                        orderstr += '<div class="fLeft placedTxt">Quality Check And Certification</div>';
                        orderstr += '<div class="fLeft dateTxt"></div>';
                        orderstr += '<div class="fLeft proStep" id="2ndstp"></div>';
                        orderstr += '</div>';
                        orderstr += '<div class="trackDivs">';
                        orderstr += '<div class="fLeft placedTxt"> Shipped </div>';
                        if(v.order_status ==5 || v.order_status == 7 ){
                        orderstr += '<div class="fLeft dateTxt shp dn" id="'+statusDate+'ship" >'+statusDate+'</div>';}
                        orderstr += '<div class="fLeft proStep" id="3rdstp"></div>';
                        orderstr += '</div>';
                        orderstr += '<div class="trackDivs ">';
                        orderstr += '<div class="fLeft placedTxt" id="delv">Delivered</div>';
                        if(v.order_status ==6){
                        orderstr += '<div class="fLeft dateTxt del dn" id="'+statusDate+'delv">'+statusDate+'</div>';}
                        orderstr += '<div class="fLeft proStep" id="4thstp"></div>';
                        orderstr += '</div>';


                        orderstr += '</center>';
//                        orderstr += '<div class="fLeft tOuter poR">';
//                        orderstr += '<div class="fLeft date semibold font15">07 oct</div>';
//                        orderstr += '<div class="fLeft shipTo">shipped to third party</div>';
                        orderstr += '</div>';
                        orderstr += '</div>';
                        orderstr += '</div>';
                    });
                });


                $('#myordId').append(orderstr);





                //  $('#ordTitle').html(ordTitle);
            }
        }


    });



}


function getweight(currentSize, catName, storedWt)
{
    var mtlWgDav = 0;
    var bseSize = 0;

    if (catName.toLowerCase() == 'rings') {
        bseSize = parseFloat(14);
        mtlWgDav = 0.05;
    } else if (catName.toLowerCase() == 'bangles') {
        bseSize = parseFloat(2.4);
        mtlWgDav = 7;
    }

   if (isNaN(currentSize))
    {

        if (catName == 'Rings')
            currentSize = parseFloat(14);
        else if (catName == 'Bangles')
            currentSize = parseFloat(2.4);
        else if (catName !== 'Rings' && catName !== 'Bangles') {
            currentSize = 0;
        }
    }


    var changeInWeight = (currentSize - bseSize) * mtlWgDav;
    var newWeight = parseFloat(storedWt) + parseFloat(changeInWeight);
    newWeight=newWeight.toFixed(3);

    return newWeight;

}
function wishlist()
{
    var userid = localStorage.getItem('jzeva_uid');

    var wishURL = APIDOMAIN + "index.php?action=getwishdetail&userid=" + userid;
    var wishstr = "";
    $.ajax({
        url: wishURL,
        type: "POST",
        datatype: "JSON",
        success: function (res)
        {

            var obj = JSON.parse(res);
            $('#wishid').html("");
            if (obj.result == null) {
                $('#nowishlst').removeClass('dn');
            } else
            {
                $('#nowishlst').addClass('dn');
                var wishStr = "";
                $(obj['result']).each(function (s, j) {
                 
                    if (j.default_image !== null) {
                        var xyz = IMGDOMAIN + j.default_image;
                    } else {
                        if(j.prdimage !== null){
                        var xyz = "";
                        xyz=j.prdimage;
                        xyz = xyz.split(',');
			xyz = IMGDOMAIN + xyz[0];
		}else
                    var noimg=BACKDOMAIN +'tools/img/noimage.svg';
            }
                    wishStr += ' <div class="grid3 transition400 fadeInup">';
                    wishStr += ' <div class="facet_front wishClass" id="'+j.product_id+'_'+j.col_car_qty+'_'+j.size+'_'+s+'">';
                    wishStr += ' <div class="grid_item ">';
                    wishStr += ' <div class="grid_img">';
		    if(noimg !== undefined)
			wishStr += ' <div style="background:url(\'' + noimg + '\')no-repeat ; background-size:auto 50%; background-position: center"></div></div>';
		    else
			wishStr += ' <div style="background:url(\'' + xyz + '\')no-repeat ; background-size:contain; background-position: center"></div></div>';
                    wishStr += ' <div class="hovTr"  onclick="wshprdopen(this)"> ';
                    wishStr += ' <div class="hovTrans">';
                    wishStr += ' </div></div>';
                    wishStr += ' <div class="grid_dets wish_div">';
                    wishStr += ' <div class="grid_name txtOver transition300" onclick="wshprdopen(this)">' + j.prdname + '</div>';

                    wishStr += ' <div class="col100  font11 transition300 txtOver" onclick="wshprdopen(this)"> ' + j.jweltype + '';
                    var type = 0;
                    if (j.hasSoli == 'Solitaire')
                        type = 1;
                    if (j.hasdmd == 'Diamond')
                        type = 2;
                    if (j.hasSoli == 'Solitaire' && j.hasdmd == 'Diamond')
                        type = 3;
                    if (j.hasdmd == 'Diamond' && j.hasUncut == 'Uncut')
                        type = 4;

                    var gemcnt = j.gemstoneName + "";
                    gemcnt = gemcnt.split(',');
                    if (j.hasGems == 'Gemstone') {
                        if (gemcnt.length == 1) {
                            type = 5;
                            if (gemcnt.length > 1)
                                type = 6;
                        }
                    }
                    if (j.hasdmd == 'Diamond' && j.hasGems == 'Gemstone') {
                        if (gemcnt.length == 1)
                            type = 7;
                        if (gemcnt.length > 1)
                            type = 8;
                    }
                    var Nstr = "";
                    switch (type) {
                        case 1:
                        {
                            Nstr += '<span> Φ Solitaire</span>';
                            break;
                        }
                        case 2:
                        {
                            Nstr += '<span> Φ Diamond</span>';
                            break;
                        }
                        case 3:
                        {
                            Nstr += '<span> Φ Solitaire </span>';
                            break;
                        }
                        case 4:
                        {
                            Nstr += '<span> Φ Diamond</span>';
                            break;
                        }
                        case 5:
                        {
                            var gemstn = j.gemstoneName;
                            Nstr += '<span> Φ ' + gemstn + ' /span>';
                            break;
                        }
                        case 6:
                        {
                            Nstr += '<span> Φ Gemstones </span>';
                            break;
                        }
                        case 7:
                        {
                            gemstn = j.gemstoneName;
                            Nstr += '<span> Φ Diamond</span><span> Φ ' + gemstn + '</span>';
                            break;
                        }
                        case 8:
                        {
                            Nstr += '<span> Φ Diamond</span><span> Φ Gemstones</span>';
                            break;
                        }
                    }
                    
                    wishStr += ' ' + Nstr + '</div>';
                    wishStr += '   <div class="grid_price txtOver transition300" onclick="wshprdopen(this)"><span class="cartRup15b"><span>  ' + indianMoney(parseInt(j.price)) + '</div>';
                    wishStr += '  <div class="action_btns dn">';
                    wishStr += '  <div class="col100 fLeft  pad0">';
                    wishStr += '  <div class="actBtn  bolder addcrt" id="' + j.wish_id + '_' + j.col_car_qty + '_' + j.product_id + '_' + j.size + '" ';
                    wishStr += '  onclick="addtocart(this)">Add To Cart</div> </div>';
                    wishStr += '  <div class="w35 fLeft  pad0">';
//                  wishStr += '  <div class="actBtn fRight bolder" onclick="removeitm(this)">delete</div>';
                    wishStr += '  </div>';
                    wishStr += '  </div>';
                    wishStr += '  <div class="fmSansB smBtnDiv fLeft transition300">';
                    wishStr += '  <div class="v360Btn" onclick="imgLoad(1320160808054906, event)"></div></div></div>';
                    wishStr += '  <div class="soc_abs wish_del transition300 fRight" onclick="removeitm(this)">';
//                  wishStr += '  <div class="soc_elem soc_share transition300"></div>';
                    wishStr += '  </div>';
                    wishStr += '  </div>';
                    wishStr += '  <div class="custBtn1" onclick="custmz(' + j.product_id + ')">customise</div></div>  </div>';

                });
                $('#wishid').html(wishStr);
            }
        }

    });


}

function custmz(i){
 var pid =i;
   window.open(DOMAIN + 'index.php?action=product_page&pid=' +pid);
}

function wshprdopen(ths)
{

  var ids=$(ths).closest('.grid3').find('.facet_front').attr('id');
  ids=ids.split('_');
  var pid=ids[0];
  var combn=ids[1];
  var size=ids[2];
  window.open(DOMAIN+"index.php?action=product_page&pid="+pid+"&comb="+combn+"&sz="+size+"");
}

function addtocart(ths) {
    var ids = $(ths).attr('id');
    ids = ids.split('_');
    var price = $(ths).closest('.grid_dets').find('.grid_price ').text();
    price = price.replace(/\,/g, '');
    var cartdata = [], combnstr = "";

    cartdata.push(ids[2]);
    cartdata.push(price);
    combnstr = ids[1];
    combnstr = combnstr.split('|@|');
    cartdata.push(combnstr[0]);
    cartdata.push(combnstr[2]);
    cartdata.push(combnstr[1]);
    cartdata.push(ids[3]);

    newaddToCart(cartdata);
    var URL = APIDOMAIN + "index.php?action=removeItmFrmWishlist&wish_id=" + ids[0] + "&col_car_qty=" + ids[1] + "&pid=" + ids[2] + "&size=" + ids[3];
    $.ajax({type: 'POST', url: URL, success: function (res) {
            wishlist();
        }
    });
}

function removeitm(ths)
{
    $('#rmvpoptxt').html('Do you want to delete this Product From Wishlist');
    cartpopUp();
    $('#cYes').unbind();
    $('#cYes').click(function () {
        var ids = $(ths).closest('.grid3').find('.addcrt').attr('id');
        ids = ids.split('_');
        var URL = APIDOMAIN + "index.php?action=removeItmFrmWishlist&wish_id=" + ids[0] + "&col_car_qty=" + ids[1] + "&pid=" + ids[2] + "&size=" + ids[3];
        $.ajax({type: 'POST', url: URL, success: function (res) {

                wishlist();
                cartpopUpClose();
            }
        });
    });
    $('#cNo').click(function () {
        cartpopUpClose();
        $('#cNo').unbind();
    });
}
function indianMoney(x) {
    x = x.toString();
    var afterPoint = '';
    if (x.indexOf('.') > 0)
        afterPoint = x.substring(x.indexOf('.'), x.length);
    x = Math.floor(x);
    //alert(x);
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;

    return res;
}


function persnlInfo() {
    var userid = localStorage.getItem('jzeva_uid');
    var perStr = "";

    var perInfoURL = APIDOMAIN + "index.php?action=getUserDetailsById&userid=" + userid;


    $.ajax({
        url: perInfoURL,
        type: "POST",
        datatype: "JSON",
        success: function (res)
        {

            var obj = JSON.parse(res);

            var profileStr = "";
            $(obj['result']).each(function (k, l) {
                profileStr += '<div class="proFields blStl font13">' + l.uname + '</div>';
                profileStr += '<div class="proFields semibold font13">' + l.mob + '</div>';
                profileStr += '<div class="proFields semibold  font13">' + l.email + '</div>';
            });
            $('#persnlDet').append(profileStr);
        }

    });
}


function storenewpass(newpass)
{
    var userid = common.readFromStorage('jzeva_uid');
    var mob = common.readFromStorage('jzeva_mob');
    var URL = APIDOMAIN + "index.php/?action=updateuserpass&user_id=" + userid + "&pass=" + newpass + "&mobile=" + mob;
    $.ajax({type: 'POST', url: URL, success: function (res) {
            common.msg(1, 'Password Changed Successfully');
            $('#oldpass').val('');
            $('#oldpass').blur();
            $('#newpass').val('');
            $('#newpass').blur();
            $('#cpass').val('');
            $('#cpass').blur();
        }
    });
}



$('#shpaddr').on('click', function () {
    
    savemyaddress();
});

function savemyaddress() {
   
    var shipngdata = {};
    var userid = common.readFromStorage('jzeva_uid');

    var address = $.trim($('#addr').val());
    var state = $('#state').val();
    var zipcode = $('#zipcode').val();
    var city = $('#city').val();
    var name= $.trim($('#shp_name').val());
    var moblno=$('#shp_mob').val();
    var letters = /^[A-Za-z\s]+$/;
    var filter = /^[0-9-+]+$/;
    var addchk=/^[a-zA-Z0-9-#-'-,-/ ]*$/;
    var validationFlag = 1;

    if (name === '' || name === null) {
      validationFlag = 0;
      common.msg(0, 'Please enter your Name');
    }
    else if (!letters.test(name)) {
      validationFlag = 0;
      common.msg(0, 'Name should be alphanumeric');
    }
    else if (moblno === '' || moblno === null) {
      validationFlag = 0;
      common.msg(0, 'Please enter your Mobile no');
    }
    else if (isNaN(moblno) || (moblno.length !== 10)) {
      validationFlag = 0;
      common.msg(0, 'Please Enter 10 Digit Mob No.');
    }
    else if(!filter.test(moblno)){
	    validationFlag=0;
	    common.msg(0,'Mobile number is Invalid');
    }
    else if (address === '' || address === null) {
        $('#addr').focus();
        validationFlag = 0;
        common.msg(0, 'Please Enter Your Address');
    }
    else if (!addchk.test(address)) {
        validationFlag = 0;
        common.msg(0, 'Please remove special characters from address');
    }
    else if (zipcode === '' || zipcode === null) {
        $('#zipcode').focus();
        validationFlag = 0;
        common.msg(0, 'Please Enter The Zipcode');


    }

    var email = common.readFromStorage('jzeva_email');


    shipngdata['name'] = name;
    shipngdata['email'] = email;
    shipngdata['mobile'] = moblno;
    shipngdata['city'] = city;
    shipngdata['address'] = address;
    shipngdata['state'] = state;
    shipngdata['pincode'] = zipcode;
    shipngdata['user_id'] = userid;

    if (shpngvalidflag == 0 && validationFlag == 1)
        common.msg(0, 'Please Enter Correct Pin code');

    if (validationFlag == 1 && shpngvalidflag == 1)
    {

        var URL = APIDOMAIN + "index.php?action=addshippingdetail";
        var data = shipngdata;
        var dt = JSON.stringify(data);
        $.ajax({type: "post",
            url: URL,
            data: {dt: dt},
            success: function (res) {

                var data = JSON.parse(res);
                common.msg(1, 'Your New Address Added Successfully');
                displayaddrs();
                addAddress();
                $('#addr').val('');
                $('#addr').blur();
                $('#state').val('');
                $('#state').blur();
                $('#zipcode').val('');
                $('#zipcode').blur();
                $('#city').val('');
                $('#city').blur();
		$('#shp_name').val('');  $('#shp_name').blur();
		$('#shp_mob').val('');   $('#shp_mob').blur();
            }
        });

    }




}

function displayaddrs() {


    var userid = localStorage.getItem('jzeva_uid');
    var URL = APIDOMAIN + "index.php/?action=getshippingdatabyid&userid=" + userid;

    $.ajax({
        url: URL,
        type: "POST",
        datatype: "JSON",
        success: function (results) {
            var data = JSON.parse(results);
            if (data.results == null) {
                $('#noaddrs').removeClass('dn');
            } else
            {
                $('#noaddrs').addClass('dn');
            }
            $('#myaddrs').find('.col50').empty();

            var addrStr = "";

            $(data['results']).each(function (m, n) {
              addrStr = "";
                addrStr += '<div class="fLeft defaulDiv">';
                addrStr += '<div class="fLeft col100">';
                addrStr += '<div class="blStl  txt_Upper">'+n.name+'</div>';
                addrStr += '<div class="font12 semibold">'+n.mobile+'</div>';
                addrStr += '<div class="font12">' + n.address + '</div>';
                //addrStr+='<div class="font13">Kormanagala</div>';
                addrStr += '<div class="font12">' + n.city + '-' + n.pincode + '</div>';
                addrStr += '<div class="font12">' + n.state + '</div>';
                addrStr += '</div>';
                //addrStr += '<div class="filterSec fLeft">';
                //addrStr += '<center>';
              //  addrStr += '<div class="button actBtn marR transition300" onclick="removeaddr(this)" id=' + n.shipping_id + '>remove</div>';
                addrStr +=   '<div class="trashAddr" onclick="removeaddr(this)" id=' + n.shipping_id + '></div>';
                //  addrStr+='<div class="button actBtn marR  transition300">edit</div>';
              //  addrStr += '</center>';
              //  addrStr += '</div>';
                addrStr += '</div>';


                    $('#myaddrs').find('.col50').append(addrStr);


            });
            //$('#myaddrs').html(addrStr);
        }
    });
}

function removeaddr(ths)
{
    $('#rmvpoptxt').html('Do you want to delete this Address');
    cartpopUp();
    $('#cYes').unbind();
    $('#cYes').click(function () {
        var shpid = $(ths).attr('id');
        var userid = localStorage.getItem('jzeva_uid');
        var URL = APIDOMAIN + "index.php/?action=removeShipngdetail&shipping_id=" + shpid + "&user_id=" + userid;
        $.ajax({url: URL, type: "POST", datatype: "JSON", success: function (results) {

                var data = JSON.parse(results);
                common.msg(1, 'Your Address Removed Successfully')
                displayaddrs();
                cartpopUpClose();
              //  $(ths).closest('.defaulDiv').remove();
            }
        });
    });
    $('#cNo').click(function () {
        cartpopUpClose();
        $('#cNo').unbind();
    });
}


$('#zipcode').keyup(function () {
    var zipcode = $(this).val();

    if ($.isNumeric(zipcode))
    {
        if (zipcode.length == 6) {
            var URL = APIDOMAIN + "index.php?action=viewbyPincode&code=" + zipcode;
            $.ajax({
                url: URL,
                type: "POST",
                datatype: "JSON",
                success: function (results)
                {
                    var obj = JSON.parse(results);

                    if (obj['error']['code'] == 0)
                    {
                        $('#state').val(obj.results[0].state);
                        $('#city').val(obj.results[0].city);
                        $('#state').focus();
                        $('#city').focus();
                        shpngvalidflag = 1;
                    } else if (obj['error']['code'] == 1) {
                        common.msg(0, obj['error']['msg']);
                        shpngvalidflag = 0;
                    }
                }
            });
        } else {
            shpngvalidflag = 0;
        }
    } else {
        shpngvalidflag = 0;
        if (zipcode.length == 1)
            common.msg(0, 'Please Enter Numeric Value');
        else if (zipcode.length == 6)
            common.msg(0, 'Please Enter Numeric Value');
    }
});

$('#restpas').click(function () {
    resetpasswrd();
});

function resetpasswrd()
{
    var oldpas = $('#oldpass').val();
    var newpass = $("#newpass").val();
    var cpass = $("#cpass").val();
    // var reg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    var validationFlag = 1;
    if (oldpas === '' || oldpas === null) {
        validationFlag = 0;
        common.msg(0, 'Please Enter Your Old Password');
    }
    var mobl = common.readFromStorage('jzeva_mob');
    var URL = APIDOMAIN + "index.php?action=checkpassw&pass=" + oldpas + "&mob=" + mobl;
    $.ajax({url: URL,
        type: "POST",
        datatype: "JSON",
        success: function (results) {
            var obj = JSON.parse(results);

            if (obj['error']['err_code'] == 0) {

                if (newpass === '' || newpass === null) {
                    validationFlag = 0;
                    common.msg(0, 'Please Enter Your New Password');
                } else if (cpass === '' || cpass === null) {
                    validationFlag = 0;
                    common.msg(0, 'Please Enter the Confirm password');
                } else if (newpass !== cpass) {
                    common.msg(0, 'Passwords Do Not Match');
                } else {
                    if (validationFlag == 1)
                        storenewpass(newpass);
                }
            } else if (obj['error']['err_code'] == 1) {
                common.msg(0, 'Please Enter The Correct password');
            } else if (obj['error']['err_code'] == 2) {
                common.msg(0, obj['error']['err_msg']);
            }
        }
    });
}

$('#pId').click(function () {
    var obj = { Title: 'account', Url: "actn-pId" };
    history.pushState(obj, obj.Title, obj.Url);
    perninfo();
});

$('#oId').click(function () {
    var obj = { Title: 'account', Url: "actn-oId" };
    history.pushState(obj, obj.Title, obj.Url);
    ordrinfo();
});

$('#sId').click(function () {
    var obj = { Title: 'account', Url: "actn-sId" };
    history.pushState(obj, obj.Title, obj.Url);
    saveadrinfo();
});

$('#cId').click(function () { 
    chngpasrd();
});

$('#wId').click(function () {
    var obj = { Title: 'account', Url: "actn-wId" };
    history.pushState(obj, obj.Title, obj.Url);
    whlist();
});

$('#plusCont').click(function () {
    addAddress();
});

function addAddress()
{
//     if ($("#plusCont").hasClass("plusBlack")) {
//         $("#plusCont").removeClass("plusBlack");
//         $("#plusCont").addClass("minusBlack");
//         $('#openAddrId').removeClass("dn");
//         accntentrflag = 1;
//     } else {
//         accntentrflag = 0;
//         $("#plusCont").removeClass("minusBlack");
//         $("#plusCont").addClass("plusBlack");
//         $('#openAddrId').addClass("dn");
//     }
    if($('#openAddrId').hasClass('dn')){
        accntentrflag=1;
    } else{
        accntentrflag=0;
    }
  $('#openAddrId').toggleClass('dn');
  $('#addr').val('');      $('#addr').blur();
  $('#state').val('');     $('#state').blur();
  $('#zipcode').val('');   $('#zipcode').blur();
  $('#city').val('');      $('#city').blur();
  $('#shp_name').val('');  $('#shp_name').blur();
  $('#shp_mob').val('');   $('#shp_mob').blur();
 
 }
function ordrinfo()
{
    accntentrflag = 5;
    $('#myord').removeClass('dn');
    $('#myordId').removeClass("dn");
    $('#profileId').addClass("dn");
    $('#editpId').addClass("dn");
    $('#saveAddrId').addClass("dn");
    $('#pChange').addClass("dn");
    $('#wishlistId').addClass("dn");
    $('#oId').addClass('jzevaColor');
    $('#sId').removeClass('jzevaColor');    $('#pId').removeClass('jzevaColor');
    $('#cId').removeClass('jzevaColor');    $('#wId').removeClass('jzevaColor');
    $('#cntshp_ordr').click(function () {
        window.location.href = DOMAIN + "index.php?action=landing_page"
    });
}

function perninfo() {
    accntentrflag = 4;
     $('#myord').addClass('dn');
    $('#myordId').addClass("dn");
    $('#profileId').removeClass("dn");
    $('#editpId').addClass("dn");
    $('#saveAddrId').addClass("dn");
    $('#pChange').addClass("dn");
    $('#wishlistId').addClass("dn");
    $('#pId').addClass('jzevaColor');
    $('#oId').removeClass('jzevaColor');    $('#sId').removeClass('jzevaColor');
    $('#cId').removeClass('jzevaColor');    $('#wId').removeClass('jzevaColor');
}

function saveadrinfo()
{
    accntentrflag = 6;
    $('#myord').addClass('dn');
    $('#saveAddrId').removeClass("dn");
    $('#myordId').addClass("dn");
    $('#profileId').addClass("dn");
    $('#editpId').addClass("dn");
    $('#pChange').addClass("dn");
    $('#wishlistId').addClass("dn");
    $('#sId').addClass('jzevaColor');
    $('#oId').removeClass('jzevaColor');    $('#pId').removeClass('jzevaColor');
    $('#cId').removeClass('jzevaColor');    $('#wId').removeClass('jzevaColor');
}

function chngpasrd()
{
    accntentrflag = 2;
    $('#myord').addClass('dn');
    $('#pChange').removeClass("dn");
    $('#myordId').addClass("dn");
    $('#profileId').addClass("dn");
    $('#editpId').addClass("dn");
    $('#saveAddrId').addClass("dn");
    $('#wishlistId').addClass("dn");
    $('#cId').addClass('jzevaColor');
    $('#oId').removeClass('jzevaColor');    $('#pId').removeClass('jzevaColor');
    $('#sId').removeClass('jzevaColor');     $('#wId').removeClass('jzevaColor');
}

function whlist()
{
    accntentrflag = 3;
    $('#myord').addClass('dn');
    $('#wishlistId').removeClass("dn");
    $('#myordId').addClass("dn");
    $('#profileId').addClass("dn");
    $('#editpId').addClass("dn");
    $('#saveAddrId').addClass("dn");
    $('#pChange').addClass("dn");
    $('#wId').addClass('jzevaColor');
    $('#oId').removeClass('jzevaColor');    $('#pId').removeClass('jzevaColor');
    $('#sId').removeClass('jzevaColor');	    $('#cId').removeClass('jzevaColor');
    $('#cunshpng_wish').click(function () {
        window.location.href = DOMAIN + "index.php?action=landing_page";
    });
}


function trackslide(ths)
{

        var trackid=$(ths).parent().parent().attr('id');

        if(trackid == 0 || trackid == 1 || trackid== 2){
            $(ths).closest('.detailsOuter').find('.trackDivs').eq(0).find('.proStep').addClass('tickIcon');

        }
        if(trackid == 3 || trackid == 4){
              $(ths).closest('.detailsOuter').find('.trackDivs').eq(0).find('.proStep').addClass('completed');
               $(ths).closest('.detailsOuter').find('.trackDivs').eq(1).find('.proStep').addClass('tickIcon');

        }
        if(trackid == 5){
              $(ths).closest('.detailsOuter').find('.trackDivs').eq(0).find('.proStep').addClass('completed');
              $(ths).closest('.detailsOuter').find('.trackDivs').eq(1).find('.proStep').addClass('completed');
              $(ths).closest('.detailsOuter').find('.trackDivs').eq(2).find('.proStep').addClass('tickIcon');

               $('.shp').removeClass('dn');
             $('.shp').html();
        }
        if(trackid == 6){

              $(ths).closest('.detailsOuter').find('.trackDivs').eq(0).find('.proStep').addClass('completed');
               $(ths).closest('.detailsOuter').find('.trackDivs').eq(1).find('.proStep').addClass('completed');
                $(ths).closest('.detailsOuter').find('.trackDivs').eq(2).find('.proStep').addClass('completed');
               $(ths).closest('.detailsOuter').find('.trackDivs').eq(3).find('.proStep').addClass('tickIcon');
               $('.del').removeClass('dn');
              $('.del').html();
        }
         if(trackid == 7){
             $('#delv').html('Not DELIVERED');
              $(ths).closest('.detailsOuter').find('.trackDivs').eq(0).find('.proStep').addClass('completed');
               $(ths).closest('.detailsOuter').find('.trackDivs').eq(1).find('.proStep').addClass('completed');
                $(ths).closest('.detailsOuter').find('.trackDivs').eq(2).find('.proStep').addClass('completed');
               $(ths).closest('.detailsOuter').find('.trackDivs').eq(3).find('.proStep').addClass('notDeliver');
                $('.shp').removeClass('dn');
             $('.shp').html();
        }
    var trkID = $(ths).attr('id');

    var trackTxt = $(ths).text();

    var cls = "see less";
    var trk = "track";
    if (($('#' + trkID).html()) === "track") {
        $('#' + trkID).html(cls);
        $('#' + trkID).closest('.orderParent ').find('.trackOuter').slideDown(300);
        $('#' + trkID).closest('.orderParent ').addClass('trOpen');

    } else {

        $('#' + trkID).html(trk);
        $('#' + trkID).closest('.orderParent ').find('.trackOuter').slideUp(300);
          $('#' + trkID).closest('.orderParent ').removeClass('trOpen');
    }
}


function dwninvoice(ths)
{
  var ordid=$(ths).attr('id');

  var newtab= window.open(DOMAIN+"index.php?action=invoice&ordid="+ordid,'_blank');
  newtab.blur();
  window.focus();
}

function getgender(gndr)
{
  var gndrstr="";
  if(gndr == 1)
    gndrstr="Ms.";
  else if(gndr == 2)
    gndrstr="Mr.";
  else if(gndr == 3)
    gndrstr="Mrs.";
    
  return gndrstr;
} 
/*target for my account page*/
 var w = window.outerWidth;
    if(w <= 768){
       
    function targt(e) {
        if(e.target.id == "side_menus" || e.target.id == "fooH" || e.target.id == 'log-Icn'){
            $('#side_menus').css({"transform":"translateX(-20px)","transition":"300ms"});
        }else{
            $('#side_menus').css({"transform":"translateX(-115%)","transition":"300ms"});
        }   
    }
}else  if(w > 768){
     function targt(e) {
         
     }
}