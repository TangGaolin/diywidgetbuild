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
        'build_widget_util':"js/app/build-widget-util",
        'util2':"js/lib/util2",
        'widget_config':"js/app/widget-config",
        'widget_res_pick':"js/app/widget-res-pick",
        'data_format':"js/lib/data-format",
        'color_thief':"js/lib/color-thief",
        'build_widget_text':"js/app/build-widget-text",
        'build_widget_image':"js/app/build-widget-image"
    },
    shim:{
        bootstrap:['jquery'],
        slider:['jquery']
    },

    urlArgs: "v=1.93"
});