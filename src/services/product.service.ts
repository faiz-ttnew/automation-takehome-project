import {
  IDataSourceDetail,
  IResponseData,
} from "../response.interface";
import axios from "axios";
import cheerio from "cheerio";
import * as fs from "fs";

const productService = async (
  search_term: string,
  source: string,
  sourceUrl: string,
  maxProduct: number,
  searchSource: IDataSourceDetail
): Promise<IResponseData[] | undefined> => {
  try {
    let productData: IResponseData[] = [];

    await fetchData(search_term, source, sourceUrl, maxProduct, searchSource)
      .then((res: IResponseData[]) => {
        productData = res;
        let csvContent = res
          .map((element: any) => {
            return Object.values(element)
              .map((item) => `"${item}"`)
              .join(",");
          })
          .join("\n");
        fs.writeFile(
          `${"product"}.csv`,
          "product, price, link, search_term" + "\n" + csvContent,
          "utf8",
          function (err) {
            if (err) {
              console.log(
                "Some error occurred - file either not saved or corrupted.",
                err
              );
            } else {
              console.log("File has been saved!");
            }
          }
        );
      })
      .catch((error) => console.log(error));

    return productData;
  } catch (error) {}
};

const fetchData = async (
  search_term: string,
  source: string,
  sourceUrl: string,
  maxProduct: number,
  searchSource: IDataSourceDetail
): Promise<IResponseData[]> => {
  try {
    const response = await axios.get(sourceUrl, {
      headers: {
        Accept: "application/json",
        "User-Agent": "axios 0.21.1",
      },
    });

    const html = response.data;

    const $ = cheerio.load(html);

    const productData: IResponseData[] = [];

    $(`${searchSource?.parent_ele}`).each((_idx, el) => {
      const shelf = $(el);

      if (productData.length < maxProduct) {
        const price: string | undefined = shelf
          .find(`${searchSource?.price}`)
          .text();

        if (price) {
          const link: string | undefined = shelf
            .find(`${searchSource?.link}`)
            .attr("href");

          const title: string | undefined = shelf
            .find(`${searchSource?.title}`)
            .text();

          let element = {
            product: title,
            price,
            link: `${searchSource?.baseURL}${link}`,
            search_term,
          };

          productData.push(element);
        }
      }
    });

    return productData;
  } catch (error) {
    throw error;
  }
};

export default { productService };
