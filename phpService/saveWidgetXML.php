<?php
/**
 * Created by IntelliJ IDEA.
 * User: tanggaolin
 * Date: 16-3-24
 * Time: 上午10:43
 */
$widget_xml_file = '../widgets/tmp/widget.xml';
$xml1 = file_put_contents($widget_xml_file,$_POST['widget_xml'],LOCK_EX);