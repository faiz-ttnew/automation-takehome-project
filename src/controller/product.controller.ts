import { RequestHandler } from "express";
import {
  IDataSourceDetail,
  IRequest,
  IResponseData,
} from "../response.interface";
import { searchSourceDetail } from "../config";
import ProductService from "../services/product.service";

export const productController: RequestHandler = async (
  req,
  res,
  next
): Promise<any> => {
  try {
    let { search_term, source }: IRequest = req.body;

    source = source.toLowerCase();
    let sourceUrl: string = "";
    let searchSource!: IDataSourceDetail;
    let maxProduct: number = 0;
    searchSourceDetail.find((res) => {
      if (res.source === source) {
        sourceUrl = `${res.baseURL}=${search_term}${res.endURL}`;
        searchSource = res;
        maxProduct = res.maxProd;
      }
    });

    const productData: IResponseData[] | undefined =
      await ProductService.productService(
        search_term,
        source,
        sourceUrl,
        maxProduct,
        searchSource
      );
    return res.status(200).send({
      search_term,
      source,
      data: productData,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error occurred",
      errors: error,
    });
  }
};
