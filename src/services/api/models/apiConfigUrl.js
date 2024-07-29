import { App_uri } from '../../config';

export const APP_LAST_URI = Object.freeze({
    eAuctionLogin: {
        path: App_uri.API_ROOT + "mst_login/login",
        isAuth: false,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },

    roleLogin: {
        path: App_uri.API_ROOT + "mst_login/getrole",
        isAuth: true,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },

    live_auction_count: {
        path: App_uri.API_ROOT + "dashboard/live_auction",
        isAuth: true,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },
    dashboard_all_bid_list: {
        path: App_uri.API_ROOT + "mst_upcoming_auction_view_list/getAuctionListforToday",
        isAuth: true,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },
    action_count: {
        path: App_uri.API_ROOT + "dashboard/countauction",
        isAuth: true,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },

    changePassword: {
        path: App_uri.API_ROOT + "mst_user/changePassword",
        isAuth: true,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },
    getLiveList: {
        path: App_uri.API_ROOT + "mst_live_auction_view_list/getLiveList",
        isAuth: true,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },

    bidderList: {
        path: App_uri.API_ROOT + "mst_live_auction_view_list/auctioneerviewdetails",
        isAuth: true,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },

    auctiondetails: {
        path: App_uri.API_ROOT + "mst_live_auction_view_list/auctiondetails",
        isAuth: true,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },
    getproductdetails: {
        path: App_uri.API_ROOT + "mst_approval_view/getproductdetails",
        isAuth: true,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },
    vendordetails: {
        path: App_uri.API_ROOT + "mst_approval_view/vendordetails",
        isAuth: true,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },
    getauctioncategory: {
        path: App_uri.API_ROOT + "mst_live_auction_view_list/getauctioncategory",
        isAuth: true,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },
    tearmsConditionApi: {
        path: App_uri.API_ROOT + "mst_template_terms_value/getCatWiseTerms",
        isAuth: true,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },
    getVendorProductDetails: {
        path: App_uri.API_ROOT + "mst_live_auction_view_list/getproductdetails",
        isAuth: true,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },
    declineBid: {
        path: App_uri.API_ROOT + "mst_bid/getDeclinedBidStatus",
        isAuth: true,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"

    },

    auctionPriceLimitPercentage: {
        path: App_uri.API_ROOT + "mst_bid/getAuctionPriceLimitPercentage",
        isAuth: true,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },

    myActionList: {
        path: App_uri.API_ROOT + "mst_approval_view/list",
        isAuth: true,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },
    selctedVendorDetails: {
        path: App_uri.API_ROOT + "mst_approval_view/selctedvendordetails",
        isAuth: true,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },
    selectionDropDownlist: {
        path: App_uri.API_ROOT + "mst_selection_code/selectioncodelist",
        isAuth: true,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },

    getBiddingHistoryDetails: {
        path: App_uri.API_ROOT + "mst_live_auction_view_list/getBiddingHistorydetails",
        isAuth: true,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },

    getapprovallastrole: {
        path: App_uri.API_ROOT + "mst_approval_view/getapprovallastrole",
        isAuth: true,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },
    activitylogs: {
        path: App_uri.API_ROOT + "mst_activity_log/activitylogs",
        isAuth: true,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },
    updateExtraTime: {
        path: App_uri.API_ROOT + "mst_bid/updateExtarTime",
        isAuth: true,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },
    notificationList:{
        path: App_uri.API_ROOT + "mst_activity_log/notification",
        isAuth: true,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },

    updateNotificationRead:{
        path: App_uri.API_ROOT + "mst_activity_log/updatenotificationread",
        isAuth: true,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },


    
    // for sfa image upload
    imageupload: {
        path: App_uri.BASE_URI + "api/v1/imageupload",
        isAuth: false,
        isPicLocation: false,
        method: "POST"
    },

    // for sfa image upload
    vendorProfilePicChange: {
        path: App_uri.BASE_URI + "api/v1/vendor/vendorProfilePicChange",
        isAuth: true,
        isEncrypt:false,
        isPicLocation: false,
        method: "POST"
    },
    // for Version check Api
    getCurrentAppVersionInfo: {
        path: App_uri.API_ROOT + "mst_login/getCurrentAppVersionInfo",
        isAuth: false,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },

    // for update password after 1st time login
    update_passwordafterlogin: {
        path: App_uri.API_ROOT + "mst_login/update_passwordafterlogin",
        isAuth: false,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },

    auctionCategoryList: {
        path: App_uri.API_ROOT + "mst_create_auction/cateentitylist",
        isAuth: true,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },

    auctionType: {
        path: App_uri.API_ROOT + "mst_product/auctionType",
        isAuth: true,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },

    allProduct: {
        path: App_uri.API_ROOT + "mst_create_auction/searchproduct",
        isAuth: true,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },
    

    getproductfield: {
        path: App_uri.API_ROOT + "mst_create_auction/getproductfield",
        isAuth: true,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },
    
    getauctionfield: {
        path: App_uri.API_ROOT + "mst_create_auction/getauctionfield",
        isAuth: true,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },
    
    vendorsuggetion: {
        path: App_uri.API_ROOT + "mst_create_auction/vendorsuggetion",
        isAuth: true,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },

    searchVendors: {
        path: App_uri.API_ROOT + "mst_create_auction/searchVendors",
        isAuth: true,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },

    getauctionheader: {
        path: App_uri.API_ROOT + "mst_create_auction/getauctionheader",
        isAuth: true,
        isEncrypt:true,
        // isPicLocation: true,
        method: "POST"
    },
    
})