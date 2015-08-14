// Apple example: https://developer.apple.com/library/ios/samplecode/UsingPhotosFramework/Listings/SamplePhotosApp_AAPLRootListViewController_m.html
import data_observable = require("data/observable");
import data_observablearray = require("data/observable-array");

import image_source = require("image-source");
import ui_listview = require("ui/list-view");
import ui_frame = require("ui/frame");

import viewmodel = require("./viewmodel");

var imagePicker: viewmodel.ImagePicker;
var page;

var goingToAlbum: boolean = false;

export import viewmodel = require("./viewmodel");

export function onAlbumsItemTap(args) {
    var list = args.object;
    var topmost = ui_frame.topmost();
    goingToAlbum = true;
    topmost.navigate({
        moduleName: "tns_modules/imagepicker/images",
        context: list.items.getItem(args.index)
    });
};

export function pageLoaded(args) {
    page = args.object;
    var list = page.getViewById("albums-list");

    list.on(ui_listview.ListView.itemLoadingEvent, function(args) {
        if (args.ios) {
            args.ios.accessoryType = UITableViewCellAccessoryType.UITableViewCellAccessoryDisclosureIndicator;
        }
    });

    if (page.navigationContext) {
        page.bindingContext = page.navigationContext;
    }
}

export function navigatedFrom(args) {
    if (!goingToAlbum) {
        page.bindingContext.cancel();
    }
    goingToAlbum = false;
}

export function done(args) {
    var topmost = ui_frame.topmost();
    topmost.goBack();
    page.bindingContext.done();
}


