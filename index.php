<?php
$result=array("product_name"=>"bluediamond","brandid"=>11,"lotref"=>1123,"barcode"=>"qw211111",
            "lotno"=>1133,"product_display_name"=>"marveric blue silver diamond",            
            "product_model"=>"rw231","product_brand"=>"orra","product_price"=>12211223.02,
            "product_currency"=>"INR","product_keywords"=>"blue,silver,diamond",
            "product_desc"=>"a clear cut solitaire diamond in the vault",
            "product_wt"=>223.21,"prd_img"=>"abc.jpeg",
            "category_id"=>1,"product_warranty"=>"1 year");

$attribute=array(0=>array(0=>111,1=>"green",2=>1));
$design=array("desmobile"=>"889898989","desname"=>"shiamak");
$error=array("errCode"=>0);
$arr=array('result'=>$result,'attributes'=>$attribute,'design'=>$design,'error'=>$error);
$a=json_encode($arr);
print_r($a);
  ?>
<?php

 /* $result=array("username"=>"Shubham Bajpai","gender"=>0,"logmobile"=>9975887206,
               "password"=>"shubham","usertype"=>1,"email"=>"shubham@gmail.com",
                "alt_email"=>"shubhambaajpai@gmail.com","dob"=>"1990-10-10","working_phone"=>7309290529,
                "fulladdress"=>"ES 1B/962,Sector A, Jankipuram","pincode"=>223232,"cityname"=>"delhi","id_type"=>"DL",
                "id_proof_no"=>"VH32323HN");

$error=array("errCode"=>0);
$arr=array('result'=>$result,'error'=>$error);
$a=json_encode($arr);
print_r($a);
*/
 ?>
 

