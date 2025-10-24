// Basic component hello world
import React from "react";

const KanguroEmbed: React.FC = () => {
  return (
    <div>
      <h1>Kanguro Embed Component</h1>
      <p>This is a placeholder for the Kanguro embed feature.</p>
      <iframe
        sandbox="allow-forms allow-scripts allow-popups allow-same-origin"
        id="kanguro-quote"
        className="border:0px #ffffff none;"
        name="kanguroIframe"
        height="1400px"
        width="455px"
        src="https://embedd.staging.kanguroseguro.com/widget/pricing/one?true&utm_campaign=pipa_broker&primary=nice&roundness=0.5rem&embedded_payment=true&hide_kanguro_link_out=false&customer_first_name=John"
      ></iframe>
    </div>
  );
};

export default KanguroEmbed;

/* Example request
{
  "pets": [
    {
      "name": "Buckley",
      "type": "Cat",
      "birthday": "2020-01-31",//14 years max
      "breedId": 2,
      "gender": "Male",
      "neutered": true,
      "coverage": {
        "deductible": 500,
        "reimbursementRate": 70,
        "annualLimit": "Unlimited"
      }
    }
  ],
  "customer": {
    "firstName": "Jhon",
    "lastName": "Gruber",
    "email": "jhon.gruber@gmail.com",
    "phone": "13053422828",
    "zipCode": "33331"
  },
  "marketing": {
    "utm_campaign": "example_tracking_id"
  },
    "coverage": {
    "deductible": 500,
    "reimbursementRate": 70,
    "annualLimit": "Unlimited",
    "invoiceInterval": "MONTHLY"
  }
}*/