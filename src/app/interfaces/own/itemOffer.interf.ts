export interface ItemOffer {
    'originCity': String,
    'destinationCity': String,
    'freightValue': String | number,
    'merchandiseWeight': number,
    'loadDate': String,
    'loadTime': String,
    'agoTime': number,
    'vacancy': number | String,
    'fulfilled': boolean
}