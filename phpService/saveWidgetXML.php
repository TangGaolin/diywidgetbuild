<?php
/**
 * Created by IntelliJ IDEA.
 * User: tanggaolin
 * Date: 16-3-24
 * Time: 上午10:43
 */



function Zip($source, $destination)
{
    if (!extension_loaded('zip') || !file_exists($source)) {
        return false;
    }

    $zip = new ZipArchive();
    if (!$zip->open($destination, ZIPARCHIVE::CREATE)) {
        return false;
    }

    $source = str_replace('\\', '/', realpath($source));

    if (is_dir($source) === true)
    {
        $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($source), RecursiveIteratorIterator::SELF_FIRST);

        foreach ($files as $file)
        {
            $file = str_replace('\\', '/', $file);

            // Ignore "." and ".." folders
            if( in_array(substr($file, strrpos($file, '/')+1), array('.', '..')) )
                continue;

            $file = realpath($file);

            if (is_dir($file) === true)
            {
                $zip->addEmptyDir(str_replace($source . '/', '', $file . '/'));
            }
            else if (is_file($file) === true)
            {
                $zip->addFromString(str_replace($source . '/', '', $file), file_get_contents($file));
            }
        }
    }
    else if (is_file($source) === true)
    {
        $zip->addFromString(basename($source), file_get_contents($source));
    }

    return $zip->close();
}

if(!isset($_POST['theme']) || !isset($_POST['widget']) ){
    echo 0;
    die();
}

$theme = $_POST['theme'];
$widget = $_POST['widget'];

$widget_dir = '../diywidgets/'.$theme.'/'.$widget;
$widget_xml_file = $widget_dir.'/widget.xml';

$widget_zip = $widget_dir.'.zip';

if(file_put_contents($widget_xml_file,$_POST['widget_xml'],LOCK_EX) != false){
    if(Zip($widget_dir,$widget_zip)){
        echo 1;
    }else{
        echo 0;
    }
}else{
    echo 0;
}
die();
