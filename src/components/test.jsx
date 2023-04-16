// import React, { useState } from 'react';
// import * as xlsx from 'xlsx';

// function Test() {
//   const [json, setJson] = useState(null);

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = xlsx.read(data, { type: 'array',cellFormula:true });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const json_data = xlsx.utils.sheet_to_json(worksheet);
//       setJson(json_data);
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileUpload} />
//       {json && <pre>{JSON.stringify(json, null, 2)}</pre>}
//     </div>
//   );
// }

// export default Test;


import React, { useState } from 'react';
import csvtojson from 'csvtojson';

export default function Test() {
  const [json, setJson] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async (e) => {
      const csvString = e.target.result;
      const jsonArray = await csvtojson().fromString(csvString);
      setJson(jsonArray);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {json && <pre>{JSON.stringify(json, null, 2)}</pre>}
    </div>
  );
}