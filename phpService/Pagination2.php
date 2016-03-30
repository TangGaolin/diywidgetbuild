<?php
/**
 * User: tanggaolin
 * Date Time: 15-5-27 下午1:25
 * desc:封装好的分页类
 */
header("Content-type: text/html;charset=utf-8");
class Pagination{

    private $pageNum; //总页数
    private $nowPage; //当前页码
    private $plus = 5; //分页偏移量
    private $url;

    //初始化 总页数 当前页码
    public function __construct($data = array()){

        $this->pageNum = intval($data["pageNum"]);
        $this->nowPage = intval($data["nowPage"]);
        $this->url = $data["url"];
    }

    //为每一个页码设置url地址
    public function setUrl($page_name,$page_value,$style){

        $str = "<li class = ':style'><a disabled = 'disabled'  href = ".$this->url.">".$page_name."</a></li>";
        $str = str_replace(":page",$page_value,$str);
        $str = str_replace(":style",$style,$str);

        return $str;
    }

    //设置 首页按钮
    public function firstPage(){
        $style = $this->nowPage==1 ? 'disabled':'Normal';
        $str = $this->setUrl('首页',1,$style);
        return $str;
    }

    //设置 尾页
    public function lastPage(){
        $style = $this->nowPage==$this->pageNum?'disabled':'Normal';
        $str = $this->setUrl('尾页',$this->pageNum,$style);
        return $str;
    }

    //设置 上一页按钮
    public function prePage(){
        $style = $this->nowPage==1 ? 'disabled':'Normal';
        $pageNum  = $this->nowPage-1?$this->nowPage-1:1;
        $str = $this->setUrl('&laquo;',$pageNum,$style);
        return $str;
    }

    //设置 下一页按钮
    public function nextPage(){
        $style = $this->nowPage==$this->pageNum ? 'disabled':'Normal';
        $pageNum  = $this->nowPage==$this->pageNum?$this->pageNum:$this->nowPage+1;
        $str = $this->setUrl('&raquo;',$pageNum,$style);
        return $str;
    }


    //其他按钮
    public function otherPage(){
        $str = '';

        $start = ($this->nowPage-$this->plus)>0 ? $this->nowPage-$this->plus : 1;
        $end = ($this->nowPage+$this->plus)<$this->pageNum ? $this->nowPage+$this->plus : $this->pageNum;
        if($start>1){
            $str .= $this->setUrl('...',$start,'Normal');
        }
        for($i = $start ; $i <= $end ; $i++){

            if($i == $this->nowPage){
                $str .= $this->setUrl($i,$i,'active');
            }else{
                $str .= $this->setUrl($i,$i,'Normal');
            }
        }

        if($end<$this->pageNum){
            $str .= $this->setUrl('...',$end,'Normal');
        }
        return $str;
    }

    //组装分页 返回字符串
    public function showPage(){


        if($this->pageNum < 1){
            return null;
        }
        $str = '<ul class="pagination">';
        $str .= $this->firstPage();
        $str .= $this->prePage();
        $str .= $this->otherPage();
        $str .= $this->nextPage();
        $str .= $this->lastPage();
        $str .='</ul>';
        return $str;
    }
}

//<ul class="pagination">
//  <li><a href="#">&laquo;</a></li>
//  <li class="active"><a href="#">1</a></li>
//  <li class="disabled"><a href="#">2</a></li>
//  <li><a href="#">3</a></li>
//  <li><a href="#">4</a></li>
//  <li><a href="#">5</a></li>
//  <li><a href="#">&raquo;</a></li>
//</ul>
