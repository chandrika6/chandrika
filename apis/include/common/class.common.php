<?php
    require_once APICLUDE.'common/db.class.php';
    class Common extends DB
{

    function __construct($db) {
        parent::DB($db);
    }


        function executeCurl($url, $isRaw = false, $tm = false, $postData = false, $fromWhere = false, $authData = false, $sslCurl = false)
        {  
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

            if(!empty($postData))
            {
                curl_setopt($ch, CURLOPT_POST, true);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
            }

            if(!empty($tm))
            {
                curl_setopt($ch, CURLOPT_TIMEOUT, $tm);
            }
            if($sslCurl)
            {
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            }

            if(!empty($authData))
            {
                curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
                 curl_setopt($ch, CURLOPT_USERPWD, $authData['user'] . ":" . $authData['pwd']);
            }
              
            $result = curl_exec($ch);  
            curl_close($ch);

            if(empty($isRaw))
            {
                $result = json_decode($result, 1);
            }

            return $result;
        }

		public function clearParam($d)
		{
			if(count($d))
			{
				foreach($d as $k => $v)
				{
					if($k!='file' && $k != 'imgpath')
					{
						$v 			= str_replace('pid-','',$v);
						$v 			= str_replace('did-','',$v);
						$v 			= str_replace('ct-','',$v);
						$v 			= str_replace('page-','',$v);
						$_GET[$k] 	= str_replace('-',' ',$v);
					}
				}
			}
		}
                //echo 'Rs. '.IND_money_format(1234567890);
                function IND_money_format($money){
                $len = strlen($money);
                $m = '';
                $money = strrev($money);
                for($i=0;$i<$len;$i++){
                    if(( $i==3 || ($i>3 && ($i-1)%2==0) )&& $i != $len){
                    $m .=',';
                    }
                    $m .=$money[$i];
                }
                    return strrev($m);
                }



                public function generateId() {
                    $dTime = round(microtime(true) * 1000); 
		    $rNum = mt_rand(1, 9);
		    $genrd = $rNum.$dTime;
		    return $genrd; 
                }


                public function makeDate($params)
                {
                    $params = urldecode($params);
                    return $ddate = date('jS M,Y|h:i A', strtotime($params));
                }
                
    }
?>
