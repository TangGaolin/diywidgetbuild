<?php
/**
 * Created by IntelliJ IDEA.
 * User: tanggaolin
 * Date: 16-4-11
 * Time: 上午11:29
 */

//php 取图片颜色类,未使用,未完善
class ColorThief{

    static private $_instance;

    private function __construct() {
    }

    static public function getInstance() {
        if(!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function getColors($source_file) {

        $im = imagecreatefrompng($source_file);

        $img_w = imagesx($im);
        $img_h = imagesy($im);

        $colors = array();

        for ($i=0; $i<$img_w; $i++)
        {
            for ($j=0; $j<$img_h; $j++)
            {
                $rgb = imagecolorat($im, $i, $j);
                $rgb_string =  $this->getRgb($rgb);
                if(strlen($rgb_string) == 7 && !in_array($rgb_string,$colors) ){

                    $colors[] = $rgb_string;
                }

            }
        }

        return $colors;
    }


    //error function
    public function getRgb($rgb){
        $r = ($rgb >> 16) & 0xFF;
        $g = ($rgb >> 8) & 0xFF;
        $b = $rgb & 0xFF;
        return '#'.$r.$g.$b;
    }

}