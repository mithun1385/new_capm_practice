
module.exports = (srv) => {

  srv.on('readInvoiceNumber', async (req) => {

    const salesOrderID = String(req.data.salesOrderID).padStart(10, '0');

    const { apiSalesOrderSrv } = require('../srv/generated/API_SALES_ORDER_SRV');
    const { salesOrderItemApi } = apiSalesOrderSrv();

    const sdkDest = {
      url: 'https://sandbox.api.sap.com/s4hanacloud',
      headers: {
        apikey: '026haFAFErgJV49jVzwd46jaeXXRn0yk'
      }
    };
    try {
      const result = await salesOrderItemApi
        .requestBuilder()
        .getAll()
        .select(
          salesOrderItemApi.schema.SALES_ORDER,
          salesOrderItemApi.schema.SALES_ORDER_ITEM,
          salesOrderItemApi.schema.REQUESTED_QUANTITY,
          salesOrderItemApi.schema.REQUESTED_QUANTITY_UNIT,
          salesOrderItemApi.schema.TAX_AMOUNT,
          salesOrderItemApi.schema.COST_AMOUNT,
          salesOrderItemApi.schema.MATERIAL,
          salesOrderItemApi.schema.SALES_ORDER_ITEM_CATEGORY,
          salesOrderItemApi.schema.PRICING_DATE
        
          
          
        )
        .filter(
          salesOrderItemApi.schema.SALES_ORDER.equals(salesOrderID)
        )
        .execute(sdkDest);

      console.log('S/4 result:', result);

      // ✅ MAP EXACTLY TO CDS RETURN TYPE
      return result.map(item => ({
        SalesOrder: item.salesOrder,
        SalesOrderItem: item.salesOrderItem,
        RequestedQuantity: item.requestedQuantity?.toString(),
        RequestedQuantityUnit: item.requestedQuantityUnit,
        TaxAmount: item.taxAmount,
        CostAmount: item.costAmount,
        OrderQuantitySAPUnit: item.orderQuantitySapUnit,
        Material: item.material,
        SalesOrderItemCategory:item.salesOrderItemCategory,
        PricingDate:item.pricingDate

      }));

    } catch (err) {
      console.error('S/4 Error:', err.rootCause?.response?.data);
      req.reject(500, 'Failed to fetch sales order Items from S/4 HANA');
    }
  });
};



// module.exports = (srv) => {

//   srv.on('readInvoiceNumber', async (req) => {

//     const salesOrderID = String(req.data.salesOrderID).padStart(10, '0');

//     const { apiSalesOrderSrv } = require('../srv/generated/API_SALES_ORDER_SRV');
//     const { salesOrderHeaderPartnerApi } = apiSalesOrderSrv();

//     const sdkDest = {
//       url: 'https://sandbox.api.sap.com/s4hanacloud',
//       headers: {
//         apikey: '026haFAFErgJV49jVzwd46jaeXXRn0yk'
//       }
//     };
//     try {
//       const result = await salesOrderHeaderPartnerApi
//         .requestBuilder()
//         .getAll()
//         .select(
//           salesOrderHeaderPartnerApi.schema.CUSTOMER,
//            salesOrderHeaderPartnerApi.schema.PARTNER_FUNCTION,
//           salesOrderHeaderPartnerApi.schema.PARTNER_FUNCTION_INTERNAL_CODE,
//           salesOrderHeaderPartnerApi.schema.CUSTOMER,
//           salesOrderHeaderPartnerApi.schema.SUPPLIER,
//           salesOrderHeaderPartnerApi.schema.PERSONNEL,
//           salesOrderHeaderPartnerApi.schema.CONTACT_PERSON,
//           salesOrderHeaderPartnerApi.schema.REFERENCE_BUSINESS_PARTNER,
//           salesOrderHeaderPartnerApi.schema.ADDRESS_ID
          
          
//         )
//         .filter(
//           salesOrderHeaderPartnerApi.schema.SALES_ORDER.equals(salesOrderID)
//         )
//         .execute(sdkDest);

//       console.log('S/4 result:', result);

//       // ✅ MAP EXACTLY TO CDS RETURN TYPE
//       return result.map(item => ({
//         customer: item.customer,
//         PartnerFunction: item.partnerFunction,
//         PartnerFunctionInternalCode: item.partnerFunctionInternalCode,
//         Customer: item.customer,
//         Supplier: item.supplier,
//         Personnel: item.personnel,
//         ContactPerson: item.contactPerson,
//         ReferenceBusinessPartner: item.referenceBusinessPartner,
//         AddressID: item.addressId

//       }));

//     } catch (err) {
//       console.error('S/4 Error:', err.rootCause?.response?.data);
//       req.reject(500, 'Failed to fetch sales order Items from S/4 HANA');
//     }
//   });
// };