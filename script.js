/**
 *  Extends toolbar
 *  Image captions:
 *     - copy url from image to magnify button
 *     - try copy image title to caption
 *     - try copy alignment of image to caption
 *     - resize box to width of image
 */

if (window.toolbar !== undefined) {
    toolbar[toolbar.length] = {
        "type": "format",
        "title": "Adds an ImageCaption tag",
        "icon": "../../plugins/imagereference/button.png",
        "key": "",
        "open": "<imgcaption image1|>",
        "close": "</imgcaption>"
    };
    toolbar[toolbar.length] = {
        "type": "format",
        "title": "Adds an ImageReference tag",
        "icon": "../../plugins/imagereference/refbutton.png",
        "key": "",
        "open": "<imgref ",
        "sample": "image1",
        "close": ">"
    };
}

jQuery(function () {

    // captions of images
    jQuery('span.imgcaption').each(function () {
        let $imgcaption = jQuery(this);
        let $amedia = $imgcaption.find('a.media');
        let $img = $imgcaption.find('img');

        //copy img url to magnify button
        if ($amedia[0]) {
            let link = $amedia.attr('href');
            $imgcaption.find('span.undercaption a').last()
                .attr('href', link)//set link
                .children().show(); //display button
        }

        //copy possibly img title when no caption is set
        let captionparts = $imgcaption.find('span.undercaption').text().split(':', 2);
        if (!jQuery.trim(captionparts[1])) {
            let title = $img.attr('title');
            if (title) {
                $imgcaption.find('span.undercaption a').first().before(': ' + title);
            }
        }

        //apply alignment of image to imgcaption
        if (!($imgcaption.hasClass('left') || $imgcaption.hasClass('right') || $imgcaption.hasClass('center'))) {
            if ($img.hasClass('medialeft')) {
                $imgcaption.addClass('left');
            }
            else if ($img.hasClass('mediaright')) {
                $imgcaption.addClass('right');
            }
            else if ($img.hasClass('mediacenter')) {
                $imgcaption.addClass('center');
            }
        }

        //add wrapper to center imgcaption
        if ($imgcaption.hasClass('center')) {
            $imgcaption.wrap('<span class="imgcaption_centerwrapper"></span>');
        }

        // width is still zero if called from jQuery.ready() because image is not yet loaded.
        // Sets correct size of caption after loading image
        $img.on("load", function(){
            let width = jQuery(this).width();
            $imgcaption.width((width + 8) + "px");
        });

    });

    // // captions of tables
    // jQuery('div.tabcaption').each(function() {
    //     let $imgcaption = jQuery(this);
    //
    //     //add wrapper to center imgcaption
    //     if ($imgcaption.hasClass('center')) {
    //         $imgcaption.wrap('<span class="imgcaption_centerwrapper"></span>');
    //     }
    // });
});
