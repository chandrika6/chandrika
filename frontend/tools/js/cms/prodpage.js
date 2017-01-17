
var data = new Array();
var glbquality;
var glbcolor;
var glbcarat;
var catsize;
var makchrg = 0;


var storedWt;
var storedMkCharge = 0;
var storedDmdCarat = 0;
var newWeight;

var metalwgt = 0;
var dmdValue = metalValue = soliValue = gemsValue = uncutValue = basicValue = 0;
var gIndex = 0;
var total = 0;
var metalprc = 0;
var wshlstflag = 0;

var dmdsoli = "";
var jweltype = "";

function GetURLParameter(Param)
{

    var PageURL = window.location.search;
    var URLVariables = PageURL.split('&');
    for (var i = 0; i < URLVariables.length; i++)
    {
        var ParameterName = URLVariables[i].split('=');
        if (ParameterName[0] == Param) {
            return ParameterName[1];
        }

    }
}
function IND_money_format(money)
{
    var m = '';
    money = money.toString().split("").reverse();
    var len = money.length;
    for (var i = 0; i < len; i++)
    {
        if ((i == 3 || (i > 3 && (i - 1) % 2 == 0)) && i !== len)
        {
            m += ',';
        }
        m += money[i];
    }

    return m.split("").reverse().join("");
}


var pid, clickdesbl, psize;
var arrdata = new Array();
function getarraydata() {

    arrdata = [];
    arrdata.push(pid);
    var pprice = $('#price').html();
    pprice = pprice.replace(/\,/g, '');
    pprice = parseInt(pprice, 10);
    arrdata.push(pprice);

    if (data['results']['dimond']['results'] !== null) {
      //var quality =$('#qual').attr('qual_id');
        var xx = $('#qual').attr('qual_id').split('_'); 
        var quality = xx[xx.length - 1]; 
    }
    if (data['results']['metalColor']['results'] !== null) {
        var yy = $('#clr').attr('clr_id').split('_');
        var color = yy[yy.length - 1];
    }
    if (data['results']['metalPurity']['results'] !== null) {
        var zz = $('#carat').attr('carat_id').split('_');
        var metal = zz[zz.length - 1];
    }

    var sz = parseFloat("0.00");
    if (catname == 'Rings') {
        if (sz == " None")
            sz = parseFloat(14);
        sz = $('.ringCircle').text();
    } else if (catname == 'Bangles') {
        if (sz == " None")
            sz = parseFloat(2.4);
        sz = $('.ringCircleB').text();
    }
    arrdata.push(color);
    arrdata.push(quality);
    arrdata.push(metal);
    arrdata.push(sz);
}

$('#add_to_cart').on('click', function () {
    var size=$('#size').text(); 
    if(size == 'Select')
       common.msg(0,'Please select size');
    else
    {
      if (clickdesbl) {
	  return;
      }
      getarraydata();
      newaddToCart(arrdata);
      clickdesbl = true;
      setTimeout(function () {
	  clickdesbl = false;
      }, 500);
  }
});

$('#buynow').on('click',function(){
    
    var size=$('#size').text(); 
    if(size == 'Select')
       common.msg(0,'Please select size');
    else
    {
      getarraydata(); 
      var userid, buydata = {};
      buydata['pid'] = arrdata[0];
      buydata['price'] = arrdata[1];
      buydata['qty'] = 1;
      var chr = "" + arrdata[2] + "|@|" + arrdata[4] + "|@|" + arrdata[3];

      buydata['col_car_qty'] = chr;
      buydata['RBsize'] = arrdata[5];
      buydata['buyid'] = '';
      buydata['cartid'] = ''; 
      buydata['userid'] = '';  
      var URL = APIDOMAIN + "index.php?action=addTocart";

      var data = buydata;
      var dt = JSON.stringify(data); 
      $.ajax({
	  type: "post",
	  url: URL,
	  data: {dt: dt}, 
	  success: function (results) {
	    var data=JSON.parse(results);
	    var cururl = window.location.search;
	    var date = new Date();
	    var minutes = 40;
	    date.setTime(date.getTime() + (minutes * 60 * 1000));
	    $.cookie("jzeva_currurl", null);
	    $.cookie("jzeva_currurl", cururl, {expires: date});
	    common.addToStorage('jzeva_buyid', data.cartid);
	    userid=common.readFromStorage('jzeva_uid');  
	    if(userid == null || userid == undefined)
	    {
	      window.location.href=DOMAIN + 'index.php?action=checkoutGuest&actn=buy';
	    }
	    else
	    {
	       window.location.assign(DOMAIN + 'index.php?action=checkOutNew&actn=buy');
	    }

	  }
      });
    }

});


$(document).ready(function () {
    showwishbtn();
    pid = GetURLParameter('pid');
    var comb = GetURLParameter('comb');
    psize = GetURLParameter('sz');
    if (comb !== undefined) {
        comb = comb.split('|@|');
        var p_qlty = comb[2];
        var p_purity = comb[1];
        var p_color = comb[0];
    }

    clickdesbl = false;
    var URL = APIDOMAIN + "index.php?action=getProductById&pid=" + pid;


    $.ajax({
        type: 'POST',
        url: URL,
        success: function (res) {

            data = JSON.parse(res);

            var dt = data['results'];
            var basic = dt['basicDetails'];
            var catAttr = dt['catAttr'];
            var vendor = dt['vendor'];
            var metalPurity = dt['metalPurity'];
            var metalColor = dt['metalColor'];
            var solitaire = dt['solitaire'];
            var diamonds = dt['dimond'];
            var uncut = dt['uncut'];
            if (dt['catAttr']['results'][1]['name'] == 'Pendants') {
                $('#Ifpendant').html('Chain Is Not Available With This Pendant');
            }
            var catgry = dt['catAttr']['results'][1]['name'];
            catgry = catgry.slice(0, -1);

            $('#custm').html('Customise Your ' + catgry);
            storedWt = parseFloat(dt['basicDetails']['mtlWgt']);
            storedMkCharge = parseFloat(dt['basicDetails']['mkngCrg']);

            metalwgt = dt['basicDetails']['mtlWgt'];
            makchrg = dt['basicDetails']['mkngCrg'];
            //  metalprcprgm =  dt['metalPurity']['results']['prc'];  
            var gemstone = dt['gamestone'];
            var images = dt['images'];
	    var othrimgs=dt['othimgs'];

            catsize = dt['catAttr']['results'][1]['cid'];

            getcatsize(catAttr, metalwgt);
            if (data['error']['err_code'] == '0')
            {
                var othrimgstr = "";
                var dn = '';

                $(images['images']).each(function (i, v) {

                    var vdef = IMGDOMAIN + dt['basicDetails']['default_image'];

                    if (vdef == v) {
                        dn = '';
                    } else if (dt['basicDetails']['default_image'] == null) {
                        dn = '';
                    } else {
                        dn = 'dn';
                    }
                    imgstr = '<div class="imgHolder ' + dn + '" style="background:  url(\'' + v + '\')no-repeat;background-size:contain;background-position:center"></div>';
                    $('#img-view').append(imgstr);


                });
		
		if(othrimgs['images'] !== null)
		{
		var  othrimgstr = "";
		othrimgstr +='<div class="prevArrow" onclick="movePrImg(true)"></div>';
                othrimgstr +=' <div class="nextArrow" onclick="movePrImg(false)"></div>';
		$(othrimgs['images']).each(function (i, v) {
  
                    othrimgstr += '<div class="carouselBox" style="background:  url(\'' + v + '\')" id="'+v+'"></div>'; 
 
                });
		 othrimgstr +=' </div>';
		 $('.prodCarousel').append(othrimgstr);
		}
		
                $(basic).each(function (i, vl) {

                    var proname = vl.prdNm;
                    $('#vpro').text(vl.prdCod);
                    $('#proname').text(vl.prdNm);
                    $('#descrp').text(vl.productDescription);
                    var metalwght = vl.mtlWgt;

                    var makingchrg = vl.mkngCrg;

                    var proccost = vl.procmtCst;


                    getbasicprice(makingchrg, metalwght);

                    if (basic.jewelleryType == 1) {
                    //    jweltype = "Gold";
                        $('#stn').html('Gold');
                    } else if (basic.jewelleryType == 2) {
                     //   jweltype = "Plain Gold";
                        $('#stn').html('Plain-Gold');
                    } else if (basic.jewelleryType == 3) {
                        jweltype = "Platinum";
                        $('#stn').html('Platinum');
                    }

                    var dmdlowp = vl.dmdlowp;
                    var dmdhighp = vl.dmdhighp;
                    var caratlowp = vl.caratlowp;
                    var carathighp = vl.carathighp;


                    var lstr = "";
                    lstr += '<span class="semibold">' + vl.leadTime + ' Days or less</span>';
                    $('#leadtime').append(lstr);

                    var bstr = "";
                  
//                    bstr+= '<div class="para fLeft">The <span class="semibold">'+vl.prdNm+'</span> is casted in <span class="semibold">'+vl.mtlWgt+'</span> grams of gold set with brilliant cut <span class="semibold">36</span> Round Diamonds (Approx. 0.33 Carat) and <span class="semibold">2</span> Carats of Ruby. </div>';

//                    bstr += '<div class="desc_row fLeft font12 fmrobor "><span class="txt_left fLeft"><span> Gold </span></span><span class="fRight" id="newWt"><span> ' + metalwght + '  <span class="fRight">gms</span></span></span></div>';
//                    bstr += '<div class="desc_row fLeft font12 fmrobor "><span class="txt_left fLeft"><span> Certification </span></span><span class="fRight fmSansR" ><span> ' + vl.crtficte + '</span> </span></div>';


                    var type = 0;
                    if (basic.hasSol == 1) {

                        type = 1;
                    }
                    if (basic.hasDmd == 1) {
                        type = 2;
                    }
                    if (basic.hasSol == 1 && basic.hasDmd == 1) {
                        type = 3;
                    }
                    if (basic.hasDmd == 1 && basic.hasUnct == 1) {
                        type = 4;
                    }
                    if (basic.hasGem == 1) {

                        if (gemstone.count == 1) {

                            type = 5
                        }
                        if (gemstone.count > 1) {

                            type = 6;
                        }
                    }
                    if (basic.hasDmd == 1 && basic.hasGem == 1) {
                        if (gemstone.count == 1) {
                            // var gemstn = gemstone.results[0].gemNm;
                            type = 7;
                        }
                        if (gemstone.count > 1) {

                            type = 8;
                        }

                    }
                    var Nstr = "";

                    switch (type) {

                        case 1:
                        {
                            Nstr += '<span>Solitaire</span>';
                             jweltype = "Diamond";
                            bstr += '<div class="para fLeft">The <span class="semibold">' + vl.prdNm + '</span>';
			    if(catname == 'Earrings')
			      bstr += ' are ';
			    else
			      bstr += ' is ';
			    bstr += 'cast in <span class="semibold" id="newWt">' + vl.mtlWgt + '</span> <span class="semibold">grams </span>of gold set with <span class="semibold">' + dt['solitaire']['results'][0].nofs + '</span> brilliant cut  <span class="semibold">' + dt['solitaire']['results'][0].shape + '</span> Solitaire (Approx. <span class="semibold">' + dt['solitaire']['results'][0].carat + ' Carat</span>) certified by <span class="semibold">' + dt['basicDetails'].crtficte + '</span> </div>';
                            break;
                        }
                        case 2:
                        {
                            Nstr += '<span>Diamond</span>';
                            jweltype = "Diamond";
                            bstr += '<div class="para fLeft">The <span class="semibold">' + vl.prdNm + '</span>';
			    if(catname == 'Earrings')
			      bstr += ' are ';
			    else
			      bstr += ' is ';
			    bstr += ' cast in <span class="semibold" id="newWt">' + vl.mtlWgt + '</span> <span class="semibold">grams</span> of gold set with <span class="semibold">' + dt['dimond']['results'][0].totNo + '</span> brilliant cut <span class="semibold">' + dt['dimond']['results'][0].shape + '</span> Diamonds (Approx. <span class="semibold">' + dt['dimond']['results'][0].crat + ' Carat</span>) certified by <span class="semibold">' + dt['basicDetails'].crtficte + '</span></div>';
                            break;
                        }
                        case 3:
                        {
                            Nstr += '<span>Solitaire</span>';
                            jweltype = "Diamond";

                            bstr += '<div class="para fLeft">The <span class="semibold">' + vl.prdNm + '</span>';
			    if(catname == 'Earrings')
			      bstr += ' are ';
			    else
			      bstr += ' is ';
			    bstr += 'cast in <span class="semibold" id="newWt">' + vl.mtlWgt + '</span> <span class="semibold">grams</span> of gold set with <span class="semibold">' + dt['dimond']['results'][0].totNo + '</span> brilliant cut <span class="semibold">' + dt['dimond']['results'][0].shape + '</span> Diamonds (Approx. <span class="semibold">' + dt['dimond']['results'][0].crat + ' Carat</span>)  and <span class="semibold">'+ dt['solitaire'].count +'</span>';
			  if(dt['solitaire'].count > 1)
			    bstr += ' Solitaires of <span class="semibold">' + dt['solitaire']['results'][0].carat + ' Carats</span> ';
			  else
			    bstr += ' Solitaire of <span class="semibold">' + dt['solitaire']['results'][0].carat + ' Carat</span> ';
			  bstr += ' and <span class="semibold">'+ dt['solitaire']['results'][0].clrty +'</span> quality and <span class="semibold">' + dt['solitaire']['results'][0].colr + '</span> color certified by <span class="semibold">' + dt['basicDetails'].crtficte + '</span></div>';
                            break;
                        }
                        case 4:
                        {
                            Nstr += '<span>Diamond</span>';
                            jweltype = "Diamond";
                            break;
                        }
                        case 5:
                        {
                            var gemstn = gemstone.results[0].gemNm;
                            Nstr += '<span> ' + gemstn + ' /span>';
                            jweltype = "Diamond";

                            break;
                        }
                        case 6:
                        {
                            Nstr += '<span> Gemstones </span>';
                            jweltype = "Diamond";
                            break;
                        }
                        case 7:
                        {
                            gemstn = gemstone.results[0].gemNm;
                            Nstr += '<span>Diamond</span><span>' + gemstn + '</span>';
                            jweltype = "Diamond";
                            bstr += '<div class="para fLeft">The <span class="semibold">' + vl.prdNm + '</span>';
			    if(catname == 'Earrings')
			      bstr += ' are ';
			    else
			      bstr += ' is ';
			    bstr += 'cast in <span class="semibold" id="newWt">' + vl.mtlWgt + '</span> <span class="semibold">grams</span> of gold set with <span class="semibold">' + dt['dimond']['results'][0].totNo + '</span> brilliant cut <span class="semibold">' + dt['dimond']['results'][0].shape + '</span> Diamonds (Approx. <span class="semibold">' + dt['dimond']['results'][0].crat + ' Carat</span>) certified by <span class="semibold">' + dt['basicDetails'].crtficte + '</span> and  <span class="semibold">' + dt['gamestone']['results'][0].crat + ' Carat</span> ' + dt['gamestone']['results'][0].gemNm + ' </div>';

                            break;
                        }

                        case 8:
                        {
                            Nstr += '<span>Diamond</span><span>Gemstones</span>';
                            jweltype = "Diamond";
                            bstr += '<div class="para fLeft">The <span class="semibold">' + vl.prdNm + '</span> ';
			    if(catname == 'Earrings')
			      bstr += ' are ';
			    else
			      bstr += ' is ';
			    bstr += 'cast in <span class="semibold" id="newWt" >' + vl.mtlWgt + ' </span><span class="semibold">grams</span> of gold set with <span class="semibold">' + dt['dimond']['results'][0].totNo + '</span> brilliant cut <span class="semibold">' + dt['dimond']['results'][0].shape + '</span> Diamonds (Approx. <span class="semibold">' + dt['dimond']['results'][0].crat + ' Carat</span>) certified by <span class="semibold">' + dt['basicDetails'].crtficte + '</span>, <span class="semibold">' + dt['gamestone']['results'][0].crat + ' Carat</span> ' + dt['gamestone']['results'][0].gemNm + ' and  <span class="semibold">' + dt['gamestone']['results'][1].crat + ' Carat</span> ' + dt['gamestone']['results'][1].gemNm + '  </div>';

                            break;
                        }

                    }
                    $('#stn').append(Nstr);
                    $('#shortdesc').html(bstr);
                   

                    if (basic.hasSol == 1)
                    {
                        //  $('#stn').html('Solitaire');
                        var solistr = "";
                        $(solitaire['results']).each(function (i, vl) {

                            var carat = vl.carat;
                            var price_per_carat = vl.prcPrCrat;
                            //solistr += '<div class="desc_row fLeft font12 fmrobor "><span class="txt_left fLeft"><span>' + vl.nofs + '</span><span> Solitaire</span></span><span class="fRight fmSansR"><span> ' + vl.carat + '</span> Carat</span></div>';

//                            solistr += '<div class="desc_row fLeft font12 fmrobor "><span class="txt_left fLeft"><span>Solitaire</span></span><span class="fRight fmSansR"><span>' + vl.nofs + '</span></span></div>';
//                            solistr += '<div class="desc_row fLeft font12 fmrobor "><span class="txt_left fLeft"><span>Solitaire Carat</span></span><span class="fRight fmSansR"><span>' + vl.carat + '</span></span></div>';
//                            solistr += '<div class="desc_row fLeft font12 fmrobor "><span class="txt_left fLeft"><span>Solitaire Clarity</span></span><span class="fRight fmSansR"><span>' + vl.clrty + '</span></span></div>';
//                            solistr += '<div class="desc_row fLeft font12 fmrobor "><span class="txt_left fLeft"><span>Solitaire Color</span></span><span class="fRight fmSansR"><span>' + vl.colr + '</span></span></div>';
                            getSoliPrice(carat, price_per_carat);
                        });
//                        $('#desc').append(solistr);
                    }



                    if (basic.hasDmd == 1)
                    {

                        var diamstr = "";
                        var dQstr = "";

                        $('#clar').removeClass('dn');
                        $(diamonds['results']).each(function (i, vl) {
                         
                            var dcarat = vl.crat;
                            storedDmdCarat = parseFloat(vl.crat);

                             dQstr += '<div class="radParent fLeft">';
                            var dval;
                            $.each(vl.QMast.results, function (x, y) {
                              
                                if (p_qlty !== undefined) {
                                    if (p_qlty == y.id) {
                                        dval = y.dVal;
                                        $('#qual').text(y.dVal);
                                        $('#qual').attr('qual_id', y.id);
                                    }
                                } else if (y.id == "9") {
                                    $('#qual').text(y.dVal);
                                    $('#qual').attr('qual_id', y.id);
                                } else {
                                    $('#qual').text(y.dVal);
                                    $('#qual').attr('qual_id', y.id);
                                }


                                var dvdia = y.dVal;
                                var dvprc = y.prcPrCrat;
                                var dvdiaid = y.id;

                                var dClass = dvdia.replace(/-|\s/g, "");
                                dClass = dClass.toLowerCase();



                                dQstr += '<div class="rad_wrap" id="r' + y.id + '">';
                                dQstr += '<div class="clarityInfo c2">';
                                dQstr += '<span class="semibold">VVS (Very, Very Slightly Included) :</span> diamonds have minute inclusions that are difficult for a skilled grader to see under 10x magnification.';
                                dQstr += 'Pinpoints and needles set the grade at VVS.<br>';
                                dQstr += '<span class="semibold">EF :</span> E, F Colour is an Absolutely Great Colour to have! E and F is considered ‘Pure White’ and Looks Exceptional! Very Bright, Very White, Very Sparkly!';
                                dQstr += '</div>';
                                dQstr += '<div class="clarityInfo c3">';
                                dQstr += '<span class="semibold">VVS (Very, Very Slightly Included):</span> diamonds have minute inclusions that are difficult for a skilled grader to see under 10x magnification. Pinpoints and needles set the grade at VVS<br>';
                                dQstr += '<span class="semibold">GH:</span> G, H colour is the border line that segregates diamonds in colours. A GH colour diamond is considered a white diamond. Beyond the GH colour the diamonds start showing a glint of yellow fluorescence';
                                dQstr += '</div>';
                                dQstr += '<div class="clarityInfo c4">';
                                dQstr += '<span class="semibold">VS (Very Slightly Included):</span> Diamonds have minor inclusions that are difficult to somewhat easy for a trained grader to see when viewed under 10x magnification<br>';
                                dQstr += '<span class="semibold">EF :</span> E, F Colour is an Absolutely Great Colour to have! E and F is considered ‘Pure White’ and Looks Exceptional! Very Bright, Very White, Very Sparkly!';
                                dQstr += '</div>';
                                dQstr += '<div class="clarityInfo c7">';
                                dQstr += '<span class="semibold">SI (Very Slightly Included): </span>Diamonds have noticeable inclusions that are easy to very easy for a trained grader to see when viewed under 10x magnification<br>';
                                dQstr += '<span class="semibold">EF :</span> E, F Colour is an Absolutely Great Colour to have! E and F is considered ‘Pure White’ and Looks Exceptional! Very Bright, Very White, Very Sparkly!';
                                dQstr += '</div>';
                                dQstr += '<div class="clarityInfo c8">';
                                dQstr += '<span class="semibold">SI (Very Slightly Included): </span>Diamonds have noticeable inclusions that are easy to very easy for a trained grader to see when viewed under 10x magnification<br>';
                                dQstr += '<span class="semibold">GH:</span> G, H colour is the border line that segregates diamonds in colours. A GH colour diamond is considered a white diamond. Beyond the GH colour the diamonds start showing a glint of yellow fluorescence';
                                dQstr += '</div>';
                                 dQstr += '<div class="clarityInfo c6">';
                                dQstr += '<span class="semibold">VS (Very Slightly Included):</span> Diamonds have minor inclusions that are difficult to somewhat easy for a trained grader to see when viewed under 10x magnification<br>';
                                dQstr += '<span class="semibold">IJ:</span> I, J colour is the diamonds under careful and trained observation reveal a glint of yellow radiance, they are considered nearly colourless and are the most frequently bought colour of diamonds.';
                                dQstr += '</div>';
                                dQstr += '<div class="clarityInfo c5">';
                                dQstr += '<span class="semibold">VS (Very Slightly Included):</span> Diamonds have minor inclusions that are difficult to somewhat easy for a trained grader to see when viewed under 10x magnification<br>';
                                dQstr += '<span class="semibold">GH:</span> G, H colour is the border line that segregates diamonds in colours. A GH colour diamond is considered a white diamond. Beyond the GH colour the diamonds start showing a glint of yellow fluorescence';
                                dQstr += '</div>';
                                dQstr +='<div class="clarityInfo c9">';
                                dQstr +='<span class="semibold">SI (Very Slightly Included):</span> Diamonds have noticeable inclusions that are easy to very easy for a trained grader to see when viewed under 10x magnification<br>';
                                dQstr +='<span class="semibold">IJ:</span> I, J colour is the diamonds under careful and trained observation reveal a glint of yellow radiance, they are considered nearly colourless and are the most frequently bought colour of diamonds.';
                                dQstr +='</div>';
                                //dQstr+= '<input type="radio" name="selectM" id="dQuality_'+x+'_'+y.id+'" checked  onchange=\"diamondPrice('+y.prcPrCrat+vl.crat+')\" class="filled-in dn">';
                                dQstr += '<input type="radio"  name="selectM" id="dQuality_' + x + '_' + y.id + '" value="' + y.dVal + '" data-value="' + y.prcPrCrat + '" onclick="setdmd(this)" class="filled-in dn">';
                                dQstr += '<label for="dQuality_' + x + '_' + y.id + '"></label>';
                                dQstr += '<div class="check2 ' + dClass + '"></div>';
                                dQstr += '<div class=" selector_label" >';
                                dQstr += '<div class="labBuffer">' + y.dVal + '</div>';
                                dQstr += '</div>';
                                dQstr += '</div>';
                                
                                getdmdprice(dvprc, dcarat);

                            });
                            
                             dQstr += '</div>';
                              dQstr += '<div class="options_back fLeft"></div>';
                            $('#diQ').append(dQstr);

                            if (p_qlty !== undefined) {
                                $("input[name='selectM']").each(function () {
                                    var val = $(this).val();
                                    if (dval == val)
                                        $(this).attr('checked', true);
                                });
                            } else
                                $('.filled-in:last').prop('checked', true);

                        });

                        $('#desc').append(diamstr);

                    }



                    if (basic.hasUnct == 1)
                    {

                        var uncutstr = "";

                        $(uncut['results']).each(function (i, vl) {

                            var ids = vl.unctId
                            var carat = vl.crat;
                            var price = vl.prcPrCrat;

//                          uncutstr += '<div class="desc_row fLeft font12 fmrobor "><span class="txt_left fLeft"><span>' + vl.totNo + '</span><span> Uncut-Diamond</span></span><span class="fRight fmSansR"><span> ' + vl.crat + '</span> Carat</span></div>';
                            getUncutPrice(price, carat);
                        });
                        $('#desc').append(uncutstr);
                    }
                    if (basic.hasGem == 1)
                    {
                        var gemstr = "";
                        var gemNstr = "";
                        $(gemstone['results']).each(function (i, vl) {

                            var ids = vl.gemId;
                            var gvalue = vl.gemNm;
                            var carat = vl.crat;
                            var price = vl.prcPrCrat;

                            // gemstr += '<div class="desc_row fLeft font12 fmrobor "><span class="txt_left fLeft"><span>' + vl.totNo + '</span><span> ' + vl.gemNm + ' </span></span><span class="fRight fmSansR"><span> ' + vl.crat + '</span> Carat</span></div>';

//                            gemstr += '<div class="desc_row fLeft font12 fmrobor "><span class="txt_left fLeft"><span>Gemstone</span></span><span class="fRight fmSansR"><span>' + vl.gemNm + '</span></span></div>';
//                            gemstr += '<div class="desc_row fLeft font12 fmrobor "><span class="txt_left fLeft"><span>Gemstone Carat</span></span><span class="fRight fmSansR"><span>' + vl.crat + '</span></span></div>';
                            getGemsPrice(carat, price);

                        });
                        $('#desc').append(gemstr);

                    }


                    var purstr = "", pval;
                     purstr += '<div class="radParent fLeft">';
                    $.each(metalPurity.results, function (k, val) {

                        if (p_purity !== undefined) {
                            if (p_purity == val.id) {
                                pval = val.dVal;
                                $('#carat').text(val.dNm);
                                $('#carat').attr('carat_id', val.id);
                            }
                        } else {
                            if (k == 0) {

                                $('#carat').text(val.dNm);
                                $('#carat').attr('carat_id', val.id);
                            }
                        }
                        metalprc = val.prc;
                        var mcarat = val.dVal;

                        var kar = mcarat;
                        var re = /^(\w+)\s(\w+)$/;
                        var kar = kar.replace(re, "$2_$1").toLowerCase();
                        var karstr = "";
                        karstr = kar;
                        karstr = karstr.split('_');

                        //  purstr += '<center>';
                        purstr += '<div class="rad_wrap">';
                        //" id="purity_'+k+'_'+val.id+'"   onchange=\"GoldPrice('+val.prc+')\"  class="filled-in dn">';
                        purstr += '<input type="radio" name="purity" id="purity_' + k + '_' + val.id + '" value="' + val.dVal + '" data-price="' + val.prc + '" onclick="setmetal(this)" class="filled-in dn">';
                        purstr += '<label for="purity_' + k + '_' + val.id + '"></label>';
                        purstr += '<div class="check2">' + karstr[1] + '</div>';
                        purstr += '<span class=" selector_label">';
                        purstr += '<div class="labBuffer">' + val.dVal + '</div>';
                        purstr += '</span>';
                        purstr += '</div>';
                        //    purstr += '</center>';

                        getPurPrice(metalprc, metalwght);
                        //  something(metalprc);
                    });
                  
                    purstr += '</div>';
                      purstr += '<div class="options_back fLeft"></div>';
                    $('#pur').append(purstr);
                    if (p_qlty !== undefined) {
                        $("input[name='purity']").each(function () {
                            var val = $(this).val();
                            if (pval == val)
                                $(this).attr('checked', true);
                        });
                    } else
                        $('input[name="purity"]').eq(0).prop('checked', true);



                    var clrstr = "", colrval;
                        clrstr += '<div class="radParent fLeft">';
                    $.each(metalColor.results, function (j, vl) {
                        var apcol = vl.dVal.toLowerCase();
                        if (p_color !== undefined) {
                            if (p_color == vl.id) {
                                $('#clr').text(vl.dNm);
                                $('#clr').attr('clr_id', vl.id);
                                colrval = vl.dVal;
                            }
                        } else {
                            if (j == 0) {
                                $('#clr').text(vl.dNm);
                                $('#clr').attr('clr_id', vl.id);
                            }
                        }
                        clrstr += '<div class="rad_wrap">';
                        clrstr += '<input type="radio" name="metal" id="color_' + j + '_' + vl.id + '" value= "' + vl.dVal + '" onclick="setclr(this)" class="filled-in dn">';
                        clrstr += '<label for="color_' + j + '_' + vl.id + '"></label>';
                        clrstr += '<div class="check2 ' + apcol + '"></div>';
                        clrstr += '<div class="fmSansB selector_label">';
                        clrstr += '<div class="labBuffer">' + vl.dVal + '</div>';
                        clrstr += '</div>';
                        clrstr += '</div>';
                    });
                      
                  clrstr += '</div>';
                   clrstr +='<div class="options_back fLeft"></div>';
                    
                    $('#colr').append(clrstr);
                    if (p_color !== undefined) {
                        $("input[name='metal']").each(function () {
                            var val = $(this).val(); 
                            if (colrval == val){
			       dmdsoli=val;
			       $(this).attr('checked', true);
			    }
                                
                        });
                    } 
		    else{
		        $('input[name="metal"]').eq(0).attr('checked', true);
			var val=$('input[name="metal"]').eq(0).val();
			dmdsoli=val;
		    }
                      


                    defaultPrice(dmdlowp, dmdhighp, caratlowp, carathighp);

		     getDesc(dmdsoli, jweltype);

                });


            }
            setTimeout(function () {
                calculatePrice();
            }, 500);
        }




    });





});




var bs = [];
var basicchrg = 0;
function getbasicprice(makingchrg, mtalwt) {
    var mkngchrg = parseFloat(makingchrg);
    var metalwgt = parseFloat(mtalwt);

    basicchr = mkngchrg * metalwgt;
    basicchrg += basicchr;
    bs.push(basicchrg);
    basicValue = bs[gIndex];

}


var pr = [];
var diaprice = 0;
function getdmdprice(dvprc, dcarat) {

    var prc = parseFloat(dvprc);
    var car = parseFloat(dcarat);

    diaprice = prc * car;
    //  diaprice += diapri;
    pr.push(diaprice);
    dmdValue = pr[gIndex];

}

var mp = [];
var mpurprc = 0;

function getPurPrice(metalprc, metalwght) {

    var mprc = parseFloat(metalprc);
    var metalwght = parseFloat(metalwght);
    mpurprc = mprc * metalwght;
    // mpurprc += mpurp;
    mp.push(mpurprc);
    metalValue = mp[gIndex];

}

var sol = [];
var soliprc = 0;
function getSoliPrice(carat, price_per_carat) {

    var solcarat = parseFloat(carat);
    var solprc = parseFloat(price_per_carat);
    solipr = solprc * solcarat;
    soliprc += solipr;
    sol.push(soliprc);
    soliValue = sol[gIndex];
}

var un = [];
var uncPrice = 0;
function getUncutPrice(price, carat) {

    var uprice = parseFloat(price);
    var ucarat = parseFloat(carat);
    uncPri = uprice * ucarat;
    uncPrice += uncPri;
    un.push(uncPrice);
    uncutValue = un[gIndex];

}


var gems = [];
var gemsPrice = 0;
function getGemsPrice(price, carat) {

    var gprice = parseFloat(price);
    var gcarat = parseFloat(carat);
    gemsPri = gprice * gcarat;
    gemsPrice += gemsPri;

    gems.push(gemsPrice);
    gemsValue = gems[gIndex];

}

function setdmd(e) {
    var t = $(e).closest('.rad_wrap').index();
    var va = $(e).val();
    var a = $(e).attr("id");

    var t = t - 2;
    dmdValue = pr[t];

    $('#qual').attr("qual_id", a);
    $('#qual').html(va);

    // glbquality=s;
    setTimeout(function () {
        $(e).closest('.selector_cont ').find('.options_back').click();
        $('#ch_price').find('.labBuffer').empty();
        $('#ch_price').find('.labBuffer').append('Previous Price:');
        $('#ch_price').velocity({opacity: [1, 0]});

        calculatePrice();

    }, 400);
    setTimeout(function () {
        $('#ch_price').addClass('showCh');
    }, 800);
    setTimeout(function () {
        $('#ch_price').removeClass('showCh');
        $('#ch_price').velocity({opacity: [0, 1]});
    }, 8000);
    
    $("input[name='selectM']").each(function () {
        $(this).attr('disabled', true);
    });
    setTimeout(function () {
        $("input[name='selectM']").each(function () {
            $(this).attr('disabled', false);
        });
    }, 1000);
}

function setmetal(m) {
    var mt = $(m).closest('.rad_wrap').index();
    var wx = $(m).val();
    var b = $(m).attr("id"); //changes
    //  var t=mt-1;
    var mt = mt - 2;
    metalValue = mp[mt];

    $('#carat').attr("carat_id", b); //changes
    $('#carat').html(wx);
    // glbcarat=t;

    setTimeout(function () {
        $(m).closest('.selector_cont ').find('.options_back').click();
        $('#ch_price').find('.labBuffer').empty();
        $('#ch_price').find('.labBuffer').append('Previous Price:');
        $('#ch_price').velocity({opacity: [1, 0]});
        calculatePrice();

    }, 400);
    setTimeout(function () {
        $('#ch_price').addClass('showCh');
    }, 800);
    setTimeout(function () {
        $('#ch_price').removeClass('showCh');
        $('#ch_price').velocity({opacity: [0, 1]});
    }, 8000);
    $("input[name='purity']").each(function () {
        $(this).attr('disabled', true);
    });
    setTimeout(function () {
        $("input[name='purity']").each(function () {
            $(this).attr('disabled', false);
        });
    }, 1000);
}

function setclr(c) {
    var cl = $(c).closest('.rad_wrap').index();
    var cr = $(c).val();
    var cc = $(c).attr("id");

    var cl = cl - 2;
    $('#clr').html(cr);
    $('#clr').attr("clr_id", cc);

    setTimeout(function () {
        $(c).closest('.selector_cont').find('.options_back').click();

    }, 400);
    $("input[name='metal']").each(function () {
        $(this).attr('disabled', true);
    });
    setTimeout(function () {
        $("input[name='metal']").each(function () {
            $(this).attr('disabled', false);
        });
    }, 800);
   
    getDesc(cr, jweltype);
}

//making grandtot as global
var grandtot = 0;
var gtotal = 0
var catname;
var catid = 0;

var sizdefault;
var sizdefaulval;
function getcatsize(s, m) {
    catid = s;
    metalwt = m;

    catname = catid['results'][1]['name'];

    if (catname == 'Rings' || catname == 'Bangles') {


        $('#sizes').removeClass('dn');
        var cid = catsize;
        var URL = APIDOMAIN + "index.php/?action=getSizeListByCat&catid=" + catsize;
        var dat = "";
        $.ajax({
            type: 'POST',
            url: URL,
            success: function (res) {
                dat = JSON.parse(res);

                var strd = "";
                var str = "";
                if (catname == 'Rings') {
                    sizdefault = dat.result[9]['id'];
                    sizdefaulval = dat.result[9]['sval'];
                    
                    sizdefaulval = parseInt(sizdefaulval);
                    if (psize !== undefined) {
                        psize = parseInt(psize);
                        $('.ringCircle').html(psize);
                    }
                } else if (catname == 'Bangles') {

                    sizdefault = dat.result[2]['id'];
                    sizdefaulval = dat.result[2]['sval'];
                    if (psize !== undefined)
                        $('.ringCircleB').html(psize);
                }

                if (dat['error']['err_code'] == '0')
                {
                    strd += '<div class="attTitle">Size</div>';
                    strd += '<div class="actBtn font12 regular" id="size">Select</div>';

//		     if(psize !== undefined)
//			  strd+= '<div class="actBtn font12 bolder" id="size" >Size  ' + psize + '</div>';
//		     else
//			  strd+= '<div class="actBtn font12 bolder" id="size" >Size  ' + sizdefaulval + '</div>';
                    // strd += '<div class="actBtn font12 bolder"  data-size="' + sizdefault + '">Size ' + sizdefaulval + '</div>';

                    $(dat.result).each(function (x, y) {

                        if (y.sval == 0.0) {
                            y.sval = 'None';
                        }

                    });

                    $('#sizes').html(strd);
                   
//                   $('.options_back').click(function(){
//                        if (catname == 'Rings') {
//                             $('#size').text("Size"+"Select");
//                    $('#size').text("Size " +14);
//               
//                       } else if(catname == 'Bangles'){
//                            $('#size').html("Select");
//                    
//                       $('#size').text("Size " +2.4);
//                   }
//                
//                });

                    if (psize !== undefined)
                        $('#size').html('SIZE ' + psize);

                    bindDrop();
                    getarraydata();
                }
            }
        });

    }
}

function defaultPrice(a, b, c, d)
{

    var dmdlp = a;
    var dmdhp = b;
    var carlp = c;
    var carhp = d;

    var vatRate = (1 / 100);
    var bseSize = 0;
    var currentSize = 0;
    var mtlWgDav = 0;
    var dmdPricelow = 0;
    var dmdPricehigh = 0;
    var goldPricelowp = 0;
    var goldPricehighp = 0;
    var newWeightlow;
    var newWeighthigh;

    var changeInWeightsizelow;
    var changeInWeightsizehigh
    if (catname == 'Rings')
        bseSize = parseFloat(14);
    else if (catname == 'Bangles')
        bseSize = parseFloat(2.4);


    if (catname == 'Rings') {
        mtlWgDav = 0.05;
    } else if (catname == 'Bangles') {
        mtlWgDav = 7;
    }



    dmdPricelow = storedDmdCarat * dmdlp;
    dmdPricehigh = storedDmdCarat * dmdhp;
    if (catname == 'Rings') {
        changeInWeightsizelow = (5 - bseSize) * mtlWgDav;
        changeInWeightsizehigh = (25 - bseSize) * mtlWgDav;
        newWeightlow = parseFloat(storedWt + (changeInWeightsizelow));
        newWeighthigh = parseFloat(storedWt + (changeInWeightsizehigh));
    } else if (catname == 'Bangles') {
        changeInWeightsizelow = (2.2 - bseSize) * mtlWgDav;
        changeInWeightsizehigh = (2.9 - bseSize) * mtlWgDav;
        newWeightlow = parseFloat(storedWt + (changeInWeightsizelow));
        newWeighthigh = parseFloat(storedWt + (changeInWeightsizehigh));
    } else if (catname !== 'Rings' || catname == 'Bangles') {
        changeInWeightsizelow = (0 - bseSize) * mtlWgDav;
        changeInWeightsizehigh = (0 - bseSize) * mtlWgDav;
        newWeightlow = parseFloat(storedWt + (changeInWeightsizelow));
        newWeighthigh = parseFloat(storedWt + (changeInWeightsizehigh));
    }

    newWeightlow = newWeightlow.toFixed(3);
    newWeighthigh = newWeighthigh.toFixed(3);


    goldPricelowp = parseFloat(carlp * newWeightlow);
    goldPricehighp = parseFloat(carhp * newWeighthigh);
    var mkChargeslowp = parseFloat(storedMkCharge * newWeightlow);
    var mkChargeshighp = parseFloat(storedMkCharge * newWeighthigh);

    var ttllowp = parseFloat(goldPricelowp + dmdPricelow + mkChargeslowp + uncPrice + soliprc + gemsPrice);
    var ttlhighp = parseFloat(goldPricehighp + dmdPricehigh + mkChargeshighp + uncPrice + soliprc + gemsPrice);
    var totalNewPricelow = Math.round(ttllowp + (ttllowp * vatRate)); 
    var totalNewPricehigh = Math.round(ttlhighp + (ttlhighp * vatRate)); 
  $('#pricel').html(totalNewPricelow); 
  $('#priceh').html(totalNewPricehigh);
}
function calculatePrice()
{
    var vatRate = (1 / 100);
    var selDiamond = parseFloat($('input[name="selectM"]:checked').attr('data-value'));
    var selPurity = parseFloat($('input[name="purity"]:checked').attr('data-price'));

    var currentSize;
    var mtlWgDav = 0;
    var dmdPrice = 0;
    var goldPrice = 0;

    var dmdLength = $('input[name="selectM"]').length;
    var bseSize = 0;

    if (catname == 'Rings') {
        currentSize = $('.ringCircle').text();
        bseSize = parseFloat(14);
    } else if (catname == 'Bangles') {
        bseSize = parseFloat(2.4);
        currentSize = $('.ringCircleB').text();
    }

    if (catname == 'Rings') {
        mtlWgDav = 0.05;
    } else if (catname == 'Bangles') {
        mtlWgDav = 7;
    }

    if (isNaN(currentSize))
    {

        if (catname == 'Rings')
            currentSize = parseFloat(14);

        else if (catname == 'Bangles')
            currentSize = parseFloat(2.4);

        else if (catname !== 'Rings' && catname !== 'Bangles') {
            currentSize = 0;
        }


    }

    if (dmdLength > 0)
    {
        dmdPrice = storedDmdCarat * selDiamond;
    }


    var changeInWeight = (currentSize - bseSize) * mtlWgDav;
    newWeight = parseFloat(storedWt + (changeInWeight)); 
    newWeight = newWeight.toFixed(3);

    $('#newWt').html(newWeight + "");

    goldPrice = parseFloat(selPurity * newWeight); 
    var mkCharges = parseFloat(storedMkCharge * newWeight); 
    var ttl = parseFloat(goldPrice + dmdPrice + mkCharges + uncPrice + soliprc + gemsPrice);

    var totalNewPrice = Math.round(ttl + (ttl * vatRate));

    var abc = $('#price').html();  
    $('#price').text(totalNewPrice);
    $('#price').numerator({
        toValue: totalNewPrice,
        delimiter: ',',
        onStart: function () {
            isStop = true;
        },
        onComplete: function () {
            $("#price").html(IND_money_format(totalNewPrice).toLocaleString('en'));
        }


    });
//var abc = IND_money_format(totalNewPrice).toLocaleString('en');
    $('#ch_price').find('.labBuffer').append(' @ ' + abc);


}

$('#addwishlist').click(function () {
    var userid = localStorage.getItem('jzeva_uid');
    if (userid == undefined || userid == null) {
        
        openPopUp();
       
    } else {
        if (wshlstflag == 0)
        {
	  getarraydata();
	 
            var userid, wishdata = {};
            wishdata['pid'] = arrdata[0];
            var chr = "" + arrdata[2] + "|@|" + arrdata[4] + "|@|" + arrdata[3];
            wishdata['col_car_qty'] = chr;
            wishdata['price'] = arrdata[1];
            wishdata['user_id'] = userid;
            var wishid = '';
            wishdata['wish_id'] = wishid;
            wishdata['size'] = arrdata[5];
            var URL = APIDOMAIN + "index.php?action=addtowishlist";
            var data = wishdata;
            var dt = JSON.stringify(data);
            $.ajax({type: "post", url: URL, data: {dt: dt}, success: function (results) {
                    wshlstflag = 1;
                    common.msg(1, 'This Product Added To Your Wishlist Successfully');
                    $('#addwishlist').addClass("colorff5");
//                    $('.addWish').addClass("moveWish");
                }
            });
	 
        } else
            common.msg(0, 'This Product Already In Your Wishlist');
    }
});

function showwishbtn()
{
    var userid = common.readFromStorage('jzeva_uid');

    var URL = APIDOMAIN + "index.php?action=getwishdetail&userid=" + userid;
    $.ajax({type: 'POST', url: URL, success: function (res) {

            var data = JSON.parse(res);
            $(data['result']).each(function (r, v) {
                if (v.product_id == pid)
                    wshlstflag = 1;
            });

            setTimeout(function () {
                if (wshlstflag == 1) {
                    $('#addwishlist').addClass("colorff5");
//                    $('.addWish').addClass("moveWish");
                } else {
                    //   console.log('not in wishlist');
                }
            }, 1000);
        }
    });
}

function getDesc(dmdsol, jwlty) {
     
    var descStr = "";
    var URL = APIDOMAIN + "index.php?action=getprodDescrp&jweltype=" + jwlty + "&dmdsoli=" + dmdsol;
    $.ajax({type: 'POST',
        url: URL,
        success: function (res) {

            var data = JSON.parse(res);

            $(data['result']).each(function (r, v) {            
                var descname = "";
                descname = v.name;
                descname = descname.replace(' ', '-');
                if (r === 0) {
                    descStr += ' <div class="colleCont ">';
                    descStr += '<div class="smUlineb">' + descname + '</div>';
                    descStr += '<div class="collCenterb">';
                    descStr += '' + v.desc + '';
                    descStr += ' </div> </div>';
                } 
                else {
                    descStr += ' <div class="colleCont v2">';
                    descStr += ' <div class="smUline">' + descname + '</div>';
                    descStr += '<div class="collCenterb colorfff">';
                    descStr += '' + v.desc + '';
                    descStr += ' </div> </div>';
                }
            });
            $('.homeCollect').html(descStr);
        }
    });

}

function calweight()
{
    var currentSize;
    if (catname == 'Rings') {
        currentSize = $('.ringCircle').text();
        bseSize = parseFloat(14);
       
    } else if (catname == 'Bangles') {
        bseSize = parseFloat(2.4);
        currentSize = $('.ringCircleB').text();
      
    }

    if (catname == 'Rings') {
        mtlWgDav = 0.05;
    } else if (catname == 'Bangles') {
        mtlWgDav = 7;
    }

    if (isNaN(currentSize))
    {
        if (catname == 'Rings')
            currentSize = parseFloat(14);

        else if (catname == 'Bangles')
            currentSize = parseFloat(2.4);

        else if (catname !== 'Rings' && catname !== 'Bangles') {
            currentSize = 0;
        }
    }
    var changeInWeight = (currentSize - bseSize) * mtlWgDav;
    newWeight = parseFloat(storedWt + (changeInWeight));
    newWeight = newWeight.toFixed(3);

    $('#newWt').html(newWeight + "");
}

$('.dwnArrow').click(function(){
   var hight=$(document).height();
   hight=hight/3;
   $('html, body, dwnArrow').animate({ scrollTop: hight }, 800); 
});

//    $(document).on("click",".options_back",function(){
////       console.log("hcikhd");alert("jhvgducgb");
//       
//
////            $('.cust_cont2').velocity({scale: [3, 1], opacity: [0, 1]}, {delay: 100, duration: 400, easing: 'swing', display: 'none'});
////            $('#cust').velocity({scale: [1, 3], opacity: [1, 0]}, {duration: 200, easing: 'swing', display: 'block'});
//
//
//            //$('body').addClass('over_hide');
//            //            $('#cust').velocity({scale: [1, 3], opacity: [1, 0]}, {duration: 200, easing: 'swing', display: 'block',
//            //                complete: function () {
//            //                    //  $('body').removeClass('over_hide');
//            //                    $('.cust_cont2').addClass('dn');
//            //                }
//            //            });
//            $('.selector_cont').eq(j).velocity({scale: [0.5, 1], opacity: [0, 1]}, {delay: '50', duration: '150', display: 'none'});
//        });


$('.sizbak').click(function() {
    var size=$('#size').text(); 
    if (catname == 'Rings') {
	 if(size == 'Select'){
	  var rngval=$('.ringCircle').text();
	   $('#size').html('SIZE ' + rngval);
	 }  
    }
    else if (catname == 'Bangles') {
	if(size == 'Select'){
	   var bngval=$('#bangCircle').text();
	   $('#size').html('SIZE ' + bngval);
	}   
    } 
});

