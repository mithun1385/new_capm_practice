using my.bookshop as my from '../db/schema';
using { sap.common } from '@sap/cds/common';

service CatalogService {

  /* ================= BOOK ENTITY ================= */

  entity Books as projection on my.Books {
    key ID,
        title,
        author,
        price,
        stock,
        location,
        genre
  };

  /* ================= S/4 FUNCTION ================= */

  function readInvoiceNumber(
    salesOrderID : String
  )
  returns array of {
    SalesOrder        : String;
    SalesOrderItem    : String;
    // RequestedQuantity : String;
    // RequestedQuantityUnit:String;
    // OrderQuantitySAPUnit:String;
    // CostAmount:String;2
    
  };

}