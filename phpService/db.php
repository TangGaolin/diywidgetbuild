<?php
/**
 * Created by IntelliJ IDEA.
 * User: tanggaolin
 * Date: 16-3-29
 * Time: 下午5:59
 */

class Db {
    static private $_instance;
    static private $_connectSource;


    private function __construct() {
    }

    static public function getInstance() {
        if(!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }


    public function connect() {
        if(!self::$_connectSource) {
            $_opts_values = array(PDO::ATTR_PERSISTENT=>true,PDO::ATTR_ERRMODE=>2,PDO::MYSQL_ATTR_INIT_COMMAND=>'SET NAMES utf8');
            self::$_connectSource = new PDO('mysql:host=s1.cobo;dbname=diy_widgets', 'cobo', 'cobocobo', $_opts_values);;

            if(!self::$_connectSource) {
                throw new Exception('mysql connect error ' . mysql_error());
                //die('mysql connect error' . mysql_error());
            }

        }
        return self::$_connectSource;
    }
}

