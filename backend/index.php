<?php

include '../config.php';
$params = array_merge($_GET, $_POST);
$action = (!empty($params['action'])) ? trim($params['action']) : '';
$case = (!empty($params['case'])) ? trim($params['case']) : '';

if($params['debug'])
{
    echo "<pre>";print_r($params);echo "</pre>";
}

switch ($action) {
    case 'products':
        $page = 'products';
        $tab = 'products';
        include BTEMPLATE.'products.html';
        break;
    case 'customerDetail':
        $page = 'customerDetail';
        $tab = 'customerDetail';
        include BTEMPLATE.'customerDetail.html';
        break;
    case 'addProduct':
        $page = 'addProduct';
        $tab = 'products';
        $edit=0;
        include BTEMPLATE.'addProduct.html';
        break;
    case 'editProduct':
        $page = 'addProduct';
        $tab = 'products';
        $edit=1;
       
        $pid=$_GET['pid'];
        include BTEMPLATE.'addProduct.html';
        break;

    case 'upload':
        $pid = $_GET['pid'];
        $page = 'upload';
        setcookie("back", $_SERVER['HTTP_REFERER']);
        include 'image-upload/index.html';
        break;

    case 'productPreview':
        $page = 'productPreview';
        $tab = 'products';
        include BTEMPLATE.'productPreview.html';
        break;

    case 'category':
        $page = 'category';
        $tab = 'category';
        include BTEMPLATE.'category.html';
        break;

    case 'addCategory':
        $page = 'addCategory';
        $tab = 'category';
        $edit=0;
        include BTEMPLATE.'addCategory.html';
        break;

    case 'editCategory':
        $page = 'addCategory';
        $tab = 'category';
        $cid=$params['cid'];
        $url = APIDOMAIN . "index.php?action=getCategoryDetails&catid=" . $cid;
        $res = $comm->executeCurl($url);
        $data = $res['result'];
        $data= json_encode($data);
        $edit=1;
        include BTEMPLATE.'addCategory.html';
        break;

    case 'attributes':
        $page = 'attributes';
        $tab = 'attribute';
        include BTEMPLATE.'attributes.html';
        break;

    case 'addAttribute':
        $page = 'addAttribute';
        $tab = 'attribute';
        $edit=0;
        include APICLUDE.'class.attributes.php';
        include BTEMPLATE.'addAttribute.html';
        break;

    case 'editAttribute':
        $page = 'addAttribute';
        $tab = 'attribute';
        $aid=$params['aid'];
        $url = APIDOMAIN . "index.php?action=getAttributeDetails&attributeid=" . $aid;
        $res = $comm->executeCurl($url);
        $data = $res['result'];
        $data= json_encode($data);
        $edit=1;
        include APICLUDE.'class.attributes.php';
        include BTEMPLATE.'addAttribute.html';
        break;

    case 'coupon':
        $page = 'coupon';
        $tab = 'coupons';
        include BTEMPLATE.'coupon.html';
        break;

    case 'product_List':
        $page = 'product_list';
        $tab = 'products';
        include BTEMPLATE.'product_list.html';
        #include BTEMPLATE.'product_list1.html';
        break;

    case 'thumbnail':
        $page = 'thumbnail';
        $tab = 'products';
        $url = APIDOMAIN . 'index.php?action=getImgByProd&pid='.$params['pid'];
        $res = $comm->executeCurl($url);
        $result = $res['results'];
        include BTEMPLATE.'thumbnail.html';
        break;

    /*case 'discounts':
        $page = 'discounts';
        $tab = 'discounts';
        include BTEMPLATE.'discounts.html';
        break;
    */
    case 'orders':
        $page = 'orders';
        $tab = 'orders';
        include BTEMPLATE.'orders.html';
        break;
    case 'customer':
        $page = 'custDetail';
        $tab = 'customer';
        $userid=$params['uid'];
        include BTEMPLATE.'custDetail.html';
        break;
    case 'accounts':
        $page = 'accounts';
        $tab = 'accounts';
        include BTEMPLATE.'accounts.html';
        break;

    case 'ord_detail':
        $page = 'Orders';
        $tab = 'orders';
        $orderid=$params['orderid'];
        include BTEMPLATE.'ord_detail.html';
        break;

    case 'productDetails':
        $page = 'productDetails';
        $tab = 'products';
        $pid=$params['pid'];
        include BTEMPLATE.'productDetails.html';
        break;
    case 'login':
        $page = 'login';
        $tab = 'login';
        include BTEMPLATE.'login.html';
        break;
    case 'resetP':
        $page = 'resetP';
        $tab = 'resetP';
        include BTEMPLATE.'resetP.html';
        break;

    case 'rates':
        $page = 'rateManager';
        $tab = 'rate manager';
        include BTEMPLATE.'rateManager.html';
        break;
     case 'preview':
        $page = 'preview';
        $tab = 'Preview';
        include BTEMPLATE.'preview.html';
        break;
    case 'customerList':
        $page = 'customerList';
        $tab = 'customer';
        include BTEMPLATE.'customer.html';
        break;
    case 'placeorder':
        $page = 'placeorder';
        $tab = 'placeorder';
        include BTEMPLATE.'placeorder.html';
        break;
      case 'placeorder2':
        $page = 'placeorder2';
        $tab = 'placeorder2';
        include BTEMPLATE.'placeorder2.html';
        break;
}
?>
