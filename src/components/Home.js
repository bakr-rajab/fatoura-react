import React, { useState, useEffect } from "react";
import { read, utils } from 'xlsx';
import UserService from "../services/user.service";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();
  const [content, setContent] = useState("");
  const [document, setDocument] = useState([{}]);

  const [schema, setSchema] = useState({
    issuer: {
      type: "",
      id: "",
      name: "",
      address: {
        branchID: "",
        country: "",
        governate: "",
        regionCity: "",
        street: "",
        buildingNumber: "1",
        postalCode: "",
        floor: "",
        additionalInformation: "0"
      }
    }
    , receiver: {
      type: "",
      id: "",
      name: "",
      address: {
        branchID: "",
        country: "",
        governate: "",
        regionCity: "",
        street: "",
        buildingNumber: "1",
        postalCode: "",
        floor: "",
        additionalInformation: "0"
      }
    },
    documentType: "",
    documentTypeVersion: "",
    dateTimeIssued: "",
    taxpayerActivityCode: "",
    extraDiscountAmount: 0,
    totalItemsDiscountAmount: 0,
    internalID: "",
    totalAmount: 0,
    delivery: {
      approach: "0",
      packaging: "0",
      dateValidity: "2022-11-19T20:59:59Z",
      grossWeight: 0,
      netWeight: 0
    },
    taxTotals: [
      {
        "taxType": "",
        "amount": 0
      }
    ],
    invoiceLines: [{
      "description": "",
      "itemType": "",
      "itemCode": "",
      "unitType": "",
      "quantity": 0,
      "internalCode": "0",
      "salesTotal": 0,
      "total": 0,
      "valueDifference": 0,
      "totalTaxableFees": 0,
      "netTotal": 0,
      "itemsDiscount": 0,
      "unitValue": {
        "currencySold": "",
        "amountEGP": 0
      },
      "discount": {
        "rate": 0,
        "amount": 0
      },
      "taxableItems": [
        {
          "taxType": "",
          "amount": 0,
          "subType": "",
          "rate": 0
        },
        {
          "taxType": "",
          "amount": 0,
          "subType": "",
          "rate": 0
        }
      ]
    }]
  });

  useEffect(() => {//
    // get user from local storage
    // set header token
    // if user is not found
    // redirect to login page
    let user = JSON.parse(localStorage.getItem("user"))
    // console.log("22",user);
    if(!user)  navigate("/login");
    UserService.getPublicContent().then(
      (response) => {
        console.log(response);
        if (response.status == 401 || response.status == 403) navigate("/login");
        let user = JSON.parse(localStorage.getItem("user"))
        console.log(user.pin);
        setContent(response.data + "" + user.pin);

      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
    calculateSchema()
  }, [document]);
  // file upload
  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const wb = read(e.target.result);
        const sheets = wb.SheetNames;
        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          setDocument(rows)
        }
      }
      reader.readAsArrayBuffer(file);
    }
    // calculateSchema()
  }

  // set schema
  const calculateSchema = () => {

    // slice invoiceLines 
    const docLines = []
    for (let i = 2; i < document.length; i += 2) {
      const mergedObject = { ...document[i - 1], ...document[i] };
      docLines.push(mergedObject);
    }


    // calculate invoice lines taxableItems
    const invoiceLines__taxableItems = (data) => {
      const result = [];

      const taxTypes = ["T1", "T4"];

      taxTypes.forEach((taxType) => {
        let filteredObj = {};

        Object.entries(data).forEach(([key, value]) => {
          if (key.startsWith(`invoiceLines__taxableItems`) && key.endsWith(taxType)) {
            let flag = key.split("__")[2];
            filteredObj[flag] = value;
          }
          // console.log({filteredObj});
        });
        // console.log("resssult2",filteredObj);
        result.push(filteredObj);
      });
      // console.log({result});
      return result;
    };


    const calculateTaxTotals = (data) => {

      const prefix = "taxTotals__";
      const filteredKeys = Object.keys(data).filter(key => key.startsWith(prefix));
      const filteredObj = filteredKeys.reduce((result, key) => {
        result[key] = data[key];
        // console.log("2", key);
        return result;
      }, {});


      const taxTotals = Object.keys(filteredObj).reduce((result, key) => {
        if (key.startsWith("taxTotals__taxType")) {
          const index = key.endsWith("__T4") ? 1 : 0;
          if (!result[index]) {
            result[index] = { taxType: "", amount: 0 };
          }
          result[index].taxType = filteredObj[key];
        } else if (key.startsWith("taxTotals__taxType")) {
          const index = key.endsWith("__T3") ? 1 : 0;
          if (!result[index]) {
            result[index] = { taxType: "", amount: 0 };
          }
          result[index].taxType = filteredObj[key];

        } else if (key.startsWith("taxTotals__amount")) {
          const index = key.endsWith("__T1") ? 0 : 1;
          if (!result[index]) {
            result[index] = { taxType: "", amount: 0 };
          }
          result[index].amount = filteredObj[key];
        }
        return result;
      }, [{ taxType: "", amount: 0 }]);

      return taxTotals
    }
    const invoiec = docLines.map((item) => ({
      description: item.invoiceLines__description,
      itemType: item.invoiceLines__itemType,
      itemCode: item.invoiceLines__itemCode,
      unitType: item.invoiceLines__unitType,
      quantity: item.invoiceLines__quantity,
      internalCode: item.invoiceLines__internalCode,
      salesTotal: item.invoiceLines__salesTotal,
      total: item.invoiceLines__total,
      valueDifference: item.invoiceLines__valueDifference,
      totalTaxableFees: item.invoiceLines__totalTaxableFees,
      netTotal: item.invoiceLines__netTotal,
      itemsDiscount: item.invoiceLines__itemsDiscount,
      unitValue: {
        currencySold: item.invoiceLines__unitValue__currencySold,
        amountEGP: item.invoiceLines__unitValue__amountEGP,
      },
      discount: {
        rate: item.invoiceLines__discount__rate,
        amount: item.invoiceLines__discount__amount,
      },
      taxableItems: invoiceLines__taxableItems(item),
    }));

    setSchema({
      ...schema,
      documentType: document[0].documentType,
      documentTypeVersion: document[0].documentTypeVersion,
      dateTimeIssued: document[0].dateTimeIssued,
      taxpayerActivityCode: document[0].taxpayerActivityCode,
      internalID: document[0].internalID,
      extraDiscountAmount: document[0].extraDiscountAmount,
      totalItemsDiscountAmount: document[0].totalItemsDiscountAmount,
      totalAmount: document[0].totalAmount,
      issuer: {
        ...schema.issuer,
        name: document[0].issuer__name,
        id: document[0].issuer__id,
        type: document[0].issuer__type
        , address: {
          ...schema.issuer.address,
          branchID: document[0].issuer__address__branchID,
          buildingNumber: document[0].issuer__address__buildingNumber,
          country: document[0].issuer__address__country,
          floor: document[0].issuer__address__floor,
          governate: document[0].issuer__address__governate,
          regionCity: document[0].issuer__address__regionCity,
          street: document[0].issuer__address__street,
        }
      },
      receiver: {
        ...schema.receiver,
        name: document[0].receiver__name,
        id: document[0].receiver__id,
        type: document[0].receiver__type
        , address: {
          ...schema.receiver.address,
          branchID: document[0].receiver__address__branchID,
          buildingNumber: document[0].receiver__address__buildingNumber,
          country: document[0].receiver__address__country,
          floor: document[0].receiver__address__floor,
          governate: document[0].receiver__address__governate,
          regionCity: document[0].receiver__address__regionCity,
          street: document[0].receiver__address__street,
        }
      },
      delivery: {
        ...schema.delivery,
        approach: document[0].delivery__approach,
        packaging: document[0].delivery__packaging,
        dateValidity: document[0].delivery__dateValidity,
        grossWeight: document[0].delivery__grossWeight,
        netWeight: document[0].delivery__netWeight
      },
      taxTotals: calculateTaxTotals(document[0]),
      invoiceLines: [...invoiec]
    })


  }
  const sendSchema = () => {
    console.log({ schema });
    UserService.submitDocument(schema).then(
      (res) => {
        console.log("subbbmit",res);
        // navigate("/");
      },
      (error) => {
        // const resMessage =
        //   (error.response &&
        //     error.response.data &&
        //     error.response.data.message) ||
        //   error.response.data.error ||
        //   error.toString();

        // setLoading(false);
        // setMessage(resMessage);
      }
    );
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileUpload}
        />
      </header>
      {/* <button onClick={handelSubmit}> submit</button> */}
      <br />
      <button onClick={sendSchema}> send</button>


    </div>
  );
};

export default Home;
