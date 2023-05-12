export const searchTerm = {
  amazon: {
    baseURL: "https://www.amazon.com",
    parent_ele:
      "div.sg-col-20-of-24.s-result-item.s-asin.sg-col-0-of-12.sg-col-16-of-20.sg-col.s-widget-spacing-small.sg-col-12-of-16",
    title: "span.a-size-medium.a-color-base.a-text-normal",
    price: "span.a-price > span.a-offscreen",
    link: "a.a-link-normal.a-text-normal",
  },
  flipkart: {
    baseURL: "https://www.flipkart.com",
    parent_ele: "div._13oc-S",
    title: "div._4rR01T",
    price: "div._3tbKJL > div._25b18c > div._30jeq3._1_WHN1",
    link: "div._2kHMtA > a._1fQZEK",
  },
};

export const searchSourceDetail = [
  {
    source: "amazon",
    maxProd: 3,
    baseURL: "https://www.amazon.com/s?k=",
    endURL: "&s=price-asc-rank",
    parent_ele:
      "div.sg-col-20-of-24.s-result-item.s-asin.sg-col-0-of-12.sg-col-16-of-20.sg-col.s-widget-spacing-small.sg-col-12-of-16",
    title: "span.a-size-medium.a-color-base.a-text-normal",
    price: "span.a-price > span.a-offscreen",
    link: "a.a-link-normal.a-text-normal",
  },
  {
    source: "flipkart",
    maxProd: 3,
    baseURL: "https://www.flipkart.com/search?q=",
    endURL: "&sort=price_asc",
    parent_ele: "div._13oc-S",
    title: "div._4rR01T",
    price: "div._3tbKJL > div._25b18c > div._30jeq3._1_WHN1",
    link: "div._2kHMtA > a._1fQZEK",
  },
];
