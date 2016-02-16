<?php
error_reporting(0);

if(stristr($_SERVER['HTTP_HOST'], 'jzeva.com'))
{
	define('DOMAIN','http://'.$_SERVER['HTTP_HOST'].'/');
	define('APIDOMAIN','http://'.$_SERVER['HTTP_HOST'].'/apis/');
	define('BACKDOMAIN','http://'.$_SERVER['HTTP_HOST'].'/backend/');
	define('WEBROOT',$_SERVER['DOCUMENT_ROOT'].'/');
	define('BACKWEBROOT',$_SERVER['DOCUMENT_ROOT'].'/backend/');
	define('IMGDOMAIN','http://'.$_SERVER['HTTP_HOST'].'/backend/image-upload/');

	$db['jzeva'] = array('localhost','root','developer@jzeva','db_jzeva');
}
else
{
	define('DOMAIN','http://'.$_SERVER['HTTP_HOST'].'/jzeva/');
	define('APIDOMAIN','http://'.$_SERVER['HTTP_HOST'].'/jzeva/apis/');
	define('BACKDOMAIN','http://'.$_SERVER['HTTP_HOST'].'/jzeva/backend/');
	define('WEBROOT',$_SERVER['DOCUMENT_ROOT'].'/jzeva/');
	define('BACKWEBROOT',$_SERVER['DOCUMENT_ROOT'].'/jzeva/backend/');
	define('IMGDOMAIN','http://'.$_SERVER['HTTP_HOST'].'/jzeva/backend/image-upload/');

	$db['jzeva'] = array('localhost','root','','db_jzeva');
}

define('BTEMPLATE',BACKWEBROOT.'template/');
define('BINCLUDES',BACKWEBROOT.'include/');
define('BAPICLUDE',BACKWEBROOT.'apis/include/');

define('TEMPLATE',WEBROOT.'frontend/template/');
define('INCLUDES',WEBROOT.'include/');
define('APICLUDE',WEBROOT.'apis/include/');

define('VERSION',1.0);



define('FAVICON', BACKDOMAIN . 'tools/img/common/favicon.ico');

$css = array();
$jvs = array();


#CSS
    $css['jquery_toast']        = BACKDOMAIN.'tools/css/lib/jquery.toast.min.css?v='.VERSION;
    $css['backend']             = BACKDOMAIN.'tools/css/backend.css?v='.VERSION;
    
#CSS End

#JS
    $jvs['jqry'] 		= BACKDOMAIN.'tools/js/lib/jquery.js?v='.VERSION;
    $jvs['jqryUi'] 		= BACKDOMAIN.'tools/js/lib/jquery-ui.js?v='.VERSION;
    $jvs['increase']            = BACKDOMAIN.'tools/js/lib/jquery.increaseAuto.js?v='.VERSION;
    $jvs['jquery_toast'] 	= BACKDOMAIN.'tools/js/lib/jquery.toast.min.js?v='.VERSION;
    $jvs['velocity']            = BACKDOMAIN.'tools/js/lib/velocity.js?v='.VERSION;
    $jvs['common']              = BACKDOMAIN.'tools/js/Common.js?v='.VERSION;
    
    
        #CMS PAGES JS
        $jvs['Product']                 = BACKDOMAIN.'tools/js/cms/product.js?v='.VERSION;
        $jvs['addProduct']              = BACKDOMAIN.'tools/js/cms/addProduct.js?v='.VERSION;
        $jvs['rate']                    = BACKDOMAIN.'tools/js/cms/rate.js?v='.VERSION;
        $jvs['category']                = BACKDOMAIN.'tools/js/cms/category.js?v='.VERSION;
        $jvs['addCategory']             = BACKDOMAIN.'tools/js/cms/addCategory.js?v='.VERSION;
        $jvs['addAttribute']            = BACKDOMAIN.'tools/js/cms/addAttribute.js?v='.VERSION;
        $jvs['attribute']               = BACKDOMAIN.'tools/js/cms/attribute.js?v='.VERSION;
        $jvs['coupon']               = BACKDOMAIN.'tools/js/cms/coupon.js?v='.VERSION;
        
#JS End
        
        
        
        #FRONTEND
            $css['home']             = DOMAIN.'frontend/tools/css/home.css?v='.VERSION;
    
    
include APICLUDE.'common/class.common.php';
$comm = new Common();
$comm->clearParam($_GET);



?>