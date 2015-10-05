<?php
include APICLUDE.'common/db.class.php';
class brandInfo extends DB
{
        function __construct($db) 
        {
                parent::DB($db);
        }
    public function getBrandList($params)
    {
        $sql = "SELECT * FROM tbl_brandid_generator";
        $page   = $params['page'];
        $limit  = $params['limit'];
        if (!empty($page))
        {
            $start = ($page * $limit) - $limit;
            $sql.=" LIMIT " . $start . ",$limit";
        }
        $res = $this->query($sql);
        
        if($this->numRows($res))
        {
            while($row = $this->fetchData($res))
            {
                if($row && !empty($row['id']))
                    {
                        $arr[] = $row;
                    }
            }
                $err = array('errCode' => 0, 'errMsg' => 'Details fetched successfully');
        }
        else{
            $arr="there is no record";
            $err=array('Code'=>1,'Msg'=>'Error in fetching data');
        }
            $result = array('results'=>$arr,'error'=>$err);
            return $result;
    }
    
    
}
?>