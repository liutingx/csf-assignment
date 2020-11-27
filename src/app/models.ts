export interface CountryDB {
    name: string,
    flag: string,
    code: string
}
export interface NewsDB {
    countrycode: string,
    source: string,
    author: string,
    title: string,
    description: string,
    url: string,
    img_url: string,
    publish: string,
    content: string
}