/**
 * Created by tanggaolin on 16-3-21.
 */
require.config({
    baseUrl:'./src/',
    paths:{
        'app':'js/app',
        'jquery':'js/lib/jquery-1.11.1.min',
        'bootstrap':"js/lib/bootstrap.min",
        'masonry':"js/lib/masonry.min",
        'imagesloaded':"js/lib/imagesloaded.pkgd.min",
        'fabric':"js/lib/fabric.min",
        'colorpicker':"js/lib/bootstrap-colorpicker.min",
        'slider':"js/lib/simple-slider.min",
        'util':"js/lib/util",
        'widget_config':"js/app/widget-config"
    },
    shim:{
        bootstrap:['jquery'],
        slider:['jquery']
        //masonry:['jquery']

    }
});