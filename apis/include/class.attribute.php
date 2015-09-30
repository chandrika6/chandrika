<?php
include APICLUDE . 'common/db.class.php';
class attribute extends DB
{
    function __construct($db) 
    {
        parent::DB($db);
        
    }
    
    public function get_attrList()
    {
        $sql = "SELECT attr_id,attr_name,attr_display_name,attr_unit,attr_type_flag,attr_unit_pos,attr_values,attr_range
                FROM tb_attribute_master";
	$res = $this->query($sql); 
	if($res)
        {
            while($row1=$this->mysqlFetchArr($res)) 
            {
                $arr[] = $row1;
            }
            $err=array('Code'=>0,'Msg'=>'Data Fetched Successfully');
        }
        $result= array('result'=>$arr,'error'=>$err);
	return $result;
    }
    
    public function set_attributes_details($params)
    {
	# INSERTING REQUIRED DATA #
       $sql = "INSERT INTO tb_attribute_master SET attr_name='".$params['name']."',attr_display_name='".$params['dname']."',attr_unit='".$params['unit']."',attr_type_flag='".$params['flag']."',attr_unit_pos='".$params['upos']."',attr_values='".$params['vals']."',attr_range='".$params['range']."'";
	$res = $this->query($sql);
	if($res)
        { 
            $err=array('Code'=>0,'Msg'=>'Data Insertion Successfull');
            $arr="New Attribute Inserted";
	}
        else
        {
            $err=array('Code'=>0,'Msg'=>'Data Insertion failed');
            $arr="No Attribute Inserted";
        }
        $result=array('result'=>$arr,'error'=>$err);
	return $result;
    }
    
    public function fetch_attributes_details($params)
    {
        $sql = "SELECT  attr_id,attr_name,attr_display_name,attr_unit,attr_type_flag,attr_unit_pos,attr_values,attr_range
                FROM tb_attribute_master WHERE attr_id=".$params['attribid'];
	$res    = $this->query($sql);
        $chkres=$this->numRows($res);
        if($chkres>0)
        {
            while($row1 = $this->mysqlFetchArr($res))
            {
                $arr[] = $row1;
            }
            $err=array('Code'=>0,'Msg'=>'Values are fetched successfully');
        }
        else
        {
            $arr="There is no data regarding your query in database";
            $err=array('Code'=>1,'Msg'=>'Error in fetching data');
        }
        $result=array('result'=> $arr,'error'=>$err);
	return $result;
    }

    public function set_category_mapping($params)
    {
        $chksql="SELECT * from tb_attribute_mapping where attribute_id=".$params['aid']." and category_id=".$params['catid']."";
        $ckres=$this->query($chksql);
        $chkres=$this->numRows($ckres);
        if($chkres<1)
        {
        $sql = "INSERT INTO tb_attribute_mapping SET attribute_id = ".$params['aid'].",attr_display_flag =".$params['dflag'].",attr_display_position=".$dpos.",attr_filter_flag = ".$params['dpos'].",attr_filter_position=".$params['fil_pos'].",active_flag=".$params['aflag'].",category_id=".$params['catid'];
        $res = $this->query($sql);
            if($res)
            { 
                $arr="Mapping completion successfull";
                $err=array('Code'=>0,'Msg'=>'Data Insert Successfully');
            }
            else
            {
                $arr="Mapping can't be done";
                $err=array('Code'=>1,'Msg'=>'Problem in Insertion');
            }
        }
        else
        {
                $arr="Mapping is done already";
                $err=array('Code'=>1,'Msg'=>'Insert operation not commited');
        }
        $result=array('result'=>$arr,'error'=>$err);
	return $result;
    }
    
    public function fetch_category_mapping($params)
    {
        $mapsql="SELECT attr_id,attr_display_flag,attr_display_position,attr_filter_flag,attr_filter_position,active_flag
                 FROM tbl_attributes_mapping where category_id=".$params['catid'];
        $mapres=$this->query($mapsql);
        $cres=$this->numRows($mapres);
    if($cres>0)
    {
        $i=0;
        while($row=$this->fetchData($mapres)) 
        {
        $attributeMap['attrid'][$i]=$row['attr_id'];
        $i++;
        }
        $atribs=implode(',',$attributeMap['attrid']);
        $attrsql="SELECT attr_name,attr_display_name,attr_unit,attr_type_flag,attr_unit_pos,attr_values,attr_range
                  FROM tb_attribute_master where attr_id IN(".$atribs.") ORDER BY attr_id DESC";
        $res = $this->query($attrsql); 
	if($res)
	{   
            while($row1=$this->fetchData($res)) 
            {
                $attrs['atrribute_Name']=$row1['attr_name'];
                $attrs['attribute_Disp_Name']=$row1['attr_display_name'];
                $attrs['attribute_Unit']=$row1['attr_unit'];
                $attrs['attribute_Num_Flag']=$row1['attr_type_flag'];
                $attrs['attribtue_Unit_Pos']=$row1['attr_unit_pos'];
                $attrs['attribute_Values']=$row1['attr_values'];
                $attrs['attribute_Range']=$row1['attr_range'];
		$attribute[]=$attrs;
            }
            $arr=array('attributes'=>$attribute,'attribute_Map'=>$attributeMap);
            $err=array('Code'=>'0','Msg'=>'Values are Fetched');
	}
        else
        {
            $arr="There is no attribute detail availed in attribute table";
            $err=array('Code'=>0,'Msg'=>'Values not found');
        }
    }
    else
    {
        $arr="There is no attribute mapped with category to show result";
        $err=array('code'=>1,'Msg'=>'Error in fetching data');
    }
    
    $result=array('results'=>$arr,'error'=>$err);
    return $result;
    }
    
    function unset_category_mapping($params) 
    {   
        $sql = "DELETE FROM tbl_attributes_mapping WHERE category_id=".$params['catid']." AND attr_id=".$params['aid'];
	$res = $this->query($sql);
	if($res) 
        { 
	$arr="Value has been cleared from attributes";
        $err=array('code'=>0, 'msg'=>'Data Deleted Successfully');
	}
        else
        {
            $arr="Value is not cleared from attribute table";
            $err=array('code'=>0, 'msg'=>'Data Deletion  unsuccessful');
        }
        $result=array('result'=>$arr,'error'=>$err);
	return $result;
    }
    
    
}
?>