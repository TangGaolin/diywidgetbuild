<?php
/**
 * Created by IntelliJ IDEA.
 * User: tanggaolin
 * Date: 16-3-29
 * Time: 下午5:56
 */

require_once('db.php');

class Widgetdata {

    private $page_size = 40;


    public function getUnBuildWidget($start){

        $data = array();

        $pdo = Db::getInstance()->connect();
        $sql = 'select * from widgets where state = 0 and theme like "%_a"  limit :page_start,:page_size';

        $stmt = $pdo->prepare($sql);

        $stmt->bindValue(":page_start",$start*$this->page_size,PDO::PARAM_INT);
        $stmt->bindValue(":page_size",$this->page_size,PDO::PARAM_INT);
        $stmt->execute();
        $data['list'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $sql_row = 'select * from widgets where state = 0 and theme like "%_a" ';

        $stmt_row = $pdo->prepare($sql_row);
        $stmt_row->execute();
        $page_num = ceil($stmt_row->rowcount() / $this->page_size);

        $data['page_num'] = $page_num;

        return $data;
    }

    public function getBuildOKWidget($start){


        $pdo = Db::getInstance()->connect();
        $sql = 'select * from widgets where state = 1 order by widget, build_time desc limit :page_start,:page_size';

        $stmt = $pdo->prepare($sql);

        $stmt->bindValue(":page_start",$start*$this->page_size,PDO::PARAM_INT);
        $stmt->bindValue(":page_size",$this->page_size,PDO::PARAM_INT);
        $stmt->execute();
        $data['list'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $sql_row = 'select * from widgets where state = 1';

        $stmt_row = $pdo->prepare($sql_row);
        $stmt_row->execute();
        $page_num = ceil($stmt_row->rowcount() / $this->page_size);

        $data['page_num'] = $page_num;

        return $data;

    }


    public function getErrorWidget($start){


        $pdo = Db::getInstance()->connect();
        $sql = 'select * from widgets where state = -1  order by build_time desc limit :page_start,:page_size';

        $stmt = $pdo->prepare($sql);

        $stmt->bindValue(":page_start",$start*$this->page_size,PDO::PARAM_INT);
        $stmt->bindValue(":page_size",$this->page_size,PDO::PARAM_INT);
        $stmt->execute();
        $data['list'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $sql_row = 'select * from widgets where state = -1';

        $stmt_row = $pdo->prepare($sql_row);
        $stmt_row->execute();
        $page_num = ceil($stmt_row->rowcount() / $this->page_size);

        $data['page_num'] = $page_num;

        return $data;

    }

    public function getTagWidget($tag,$start){


        $pdo = Db::getInstance()->connect();
        $sql = <<<EOF
        select theme,widget from widgets as  a join
        widget_tag as b
        on a.ori_theme = b.ori_theme
        where state = 0 and  b.tag =:tag and theme like "%_a" order by widget  limit :page_start,:page_size
EOF;

        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(":tag",$tag,PDO::PARAM_STR);
        $stmt->bindValue(":page_start",$start*$this->page_size,PDO::PARAM_INT);
        $stmt->bindValue(":page_size",$this->page_size,PDO::PARAM_INT);

        $stmt->execute();
        $data['list'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $sql_row = <<<EOF
        select * from widgets as  a join
        widget_tag as b
        on a.ori_theme = b.ori_theme
        where state = 0 and  b.tag =:tag and theme like "%_a"
EOF;

        $stmt_row = $pdo->prepare($sql_row);
        $stmt_row->bindValue(":tag",$tag,PDO::PARAM_STR);
        $stmt_row->execute();
        $page_num = ceil($stmt_row->rowcount() / $this->page_size);

        $data['page_num'] = $page_num;

        return $data;

    }


}