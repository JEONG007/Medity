const { web3 } = window
const selectedAddress = web3.eth.defaultAccount
$(document).ready(function() {
   const productRegistryContractAddress = '0x2EF7e54A091C613D0dF5EA702881ba1453559281';
    const productRegistryContractABI =[
      {
         "constant": false,
         "inputs": [
            {
               "name": "_num",
               "type": "uint256"
            },
            {
               "name": "_addr",
               "type": "address"
            },
            {
               "name": "_password",
               "type": "string"
            },
            {
               "name": "_types",
               "type": "uint256"
            }
         ],
         "name": "setCustomer",
         "outputs": [],
         "payable": false,
         "stateMutability": "nonpayable",
         "type": "function"
      },
      {
         "constant": true,
         "inputs": [
            {
               "name": "_customerAddress",
               "type": "address"
            }
         ],
         "name": "getTypes",
         "outputs": [
            {
               "name": "",
               "type": "uint256"
            }
         ],
         "payable": false,
         "stateMutability": "view",
         "type": "function"
      },
      {
         "constant": false,
         "inputs": [
            {
               "name": "_number",
               "type": "uint256"
            },
            {
               "name": "_addr",
               "type": "address"
            },
            {
               "name": "_hospital",
               "type": "string"
            },
            {
               "name": "_name",
               "type": "string"
            },
            {
               "name": "_diagnosis",
               "type": "string"
            }
         ],
         "name": "addProMediInfo",
         "outputs": [],
         "payable": false,
         "stateMutability": "nonpayable",
         "type": "function"
      },
      {
         "constant": false,
         "inputs": [],
         "name": "killContract",
         "outputs": [],
         "payable": false,
         "stateMutability": "nonpayable",
         "type": "function"
      },
      {
         "constant": true,
         "inputs": [
            {
               "name": "",
               "type": "uint256"
            }
         ],
         "name": "users",
         "outputs": [
            {
               "name": "number",
               "type": "uint256"
            },
            {
               "name": "addr",
               "type": "address"
            },
            {
               "name": "password",
               "type": "string"
            },
            {
               "name": "types",
               "type": "uint256"
            },
            {
               "name": "timestamp",
               "type": "uint256"
            }
         ],
         "payable": false,
         "stateMutability": "view",
         "type": "function"
      },
      {
         "constant": true,
         "inputs": [],
         "name": "getAllMediInfo",
         "outputs": [
            {
               "components": [
                  {
                     "name": "number",
                     "type": "uint256"
                  },
                  {
                     "name": "addr",
                     "type": "address"
                  },
                  {
                     "name": "password",
                     "type": "string"
                  },
                  {
                     "name": "types",
                     "type": "uint256"
                  },
                  {
                     "name": "timestamp",
                     "type": "uint256"
                  }
               ],
               "name": "",
               "type": "tuple[]"
            }
         ],
         "payable": false,
         "stateMutability": "view",
         "type": "function"
      },
      {
         "constant": true,
         "inputs": [
            {
               "name": "",
               "type": "uint256"
            }
         ],
         "name": "myMediInfos",
         "outputs": [
            {
               "name": "number",
               "type": "uint256"
            },
            {
               "name": "addr",
               "type": "address"
            },
            {
               "name": "hospital",
               "type": "string"
            },
            {
               "name": "name",
               "type": "string"
            },
            {
               "name": "diagnosis",
               "type": "string"
            },
            {
               "name": "timestamp",
               "type": "uint256"
            }
         ],
         "payable": false,
         "stateMutability": "view",
         "type": "function"
      },
      {
         "constant": true,
         "inputs": [
            {
               "name": "_index",
               "type": "uint256"
            }
         ],
         "name": "getProductMediInfo",
         "outputs": [
            {
               "name": "",
               "type": "uint256"
            },
            {
               "name": "",
               "type": "address"
            },
            {
               "name": "",
               "type": "string"
            },
            {
               "name": "",
               "type": "string"
            },
            {
               "name": "",
               "type": "string"
            },
            {
               "name": "",
               "type": "uint256"
            }
         ],
         "payable": false,
         "stateMutability": "view",
         "type": "function"
      },
      {
         "constant": true,
         "inputs": [],
         "name": "getNumOfMediInfo",
         "outputs": [
            {
               "name": "",
               "type": "uint256"
            }
         ],
         "payable": false,
         "stateMutability": "view",
         "type": "function"
      },
      {
         "constant": false,
         "inputs": [
            {
               "name": "_customerAddress",
               "type": "address"
            }
         ],
         "name": "getindex",
         "outputs": [
            {
               "name": "",
               "type": "uint256"
            }
         ],
         "payable": false,
         "stateMutability": "nonpayable",
         "type": "function"
      },
      {
         "inputs": [],
         "payable": false,
         "stateMutability": "nonpayable",
         "type": "constructor"
      }
   ]
    $('#linkHome').click(function() { showView("viewHome") });
    $('#linkSubmitDocument').click(function() { showView("viewSubmitDocument"); showTable();  });
    $('#linkVerifyDocument').click(function() { showView("viewVerifyDocument") });
    $('#itemUploadButton').click(itemUploadButton);
    $('#showTableButton').click(showTable);
    $('#signup_button').click(function() { $("#sign_button2").hide() })

   $('#signup_button').click(sign);
   $('#signin_button').click(login);
    // Attach AJAX "loading" event listener
    $(document).on({
        ajaxStart: function() { $("#loadingBox").show() },
        ajaxStop: function() { $("#loadingBox").hide() }    
    });



    function showView(viewName) {
        // Hide all views and show the selected view only
        $('main > section').hide();
        $('#' + viewName).show();
    }
    
    function showInfo(message) {
        $('#infoBox>p').html(message);
        $('#infoBox').show();
        $('#infoBox>header').click(function(){ $('#infoBox').hide(); });
    }

    function showError(errorMsg) {
        $('#errorBox>p').html("Error: " + errorMsg);
        $('#errorBox').show();
        $('#errorBox>header').click(function(){ $('#errorBox').hide(); });
    }

    async function login(){
      let user  = $("#user").val();
       let contract = web3.eth.contract(productRegistryContractABI).at(productRegistryContractAddress);
      contract.getTypes(user,function(err,result){
         if (err)
               return showError("Smart contract call failed: " + err);
         let toString = result.toString();
               // console.log("product: " + toString);
         let strArray = toString.split(",");
         console.log(strArray[0]);
         if(strArray[0]==0){
            return showError("회원가입을 해주세요");
         }
         if(strArray[0]==1)
         {
            $("#mainin_button_1").show();
            // $("#mainin_text_1").value
            let text = document.getElementById('user').value;
            
            console.log(text);
            document.getElementById('mainin_text_1').value = text;
         }
         if(strArray[0]==2)
         {
            $("#mainin_button_2").show();
            let text = document.getElementById('user').value;
            console.log(text);
            document.getElementById('mainin_text_2').value = text;
         }
      })
   }


 

    async function sign() {
      if (window.ethereum)
         try {
         await window.ethereum.enable();
         } catch (err) {
         return showError("Access to your Ethereum account rejected.");
         }
      if (typeof web3 === 'undefined')
         return showError("Please install MetaMask to access the Ethereum Web3 injected API from your Web browser.");
   

      let contract = web3.eth.contract(productRegistryContractABI).at(productRegistryContractAddress);


      let Address  = $("#user_sign").val();
      let password  = $("#pass_sign").val();
      let type  = $("#type_sign").val();


      contract.setCustomer(1,Address,password, type,function(err, result) {
         if (err)
            return showError("Smart contract call failed: " + err);
              
         console.log(type);
         });
      
    }


   async function showTable() {
         //$('#viewSubmitDocument>table').html( );
        // $('#viewSubmitDocument').show();

      if (window.ethereum)
         try {
            await window.ethereum.enable();
         } catch (err) {
                return showError("Access to your Ethereum account rejected.");
         }
      if (typeof web3 === 'undefined')
                return showError("Please install MetaMask to access the Ethereum Web3 injected API from your Web browser.");
      

      let contract = web3.eth.contract(productRegistryContractABI).at(productRegistryContractAddress);
      let myaddress = $("#CustomerAddress").val();
      console.log(myaddress);
      $('#myTable').append(  '<table>' );
      contract.getTypes(myaddress,function(err,result){
         if (err)
               return showError("Smart contract call failed: " + err);
         let toString = result.toString();
               // console.log("product: " + toString);
         let strArray = toString.split(",");
         console.log(strArray[0]);
         if(strArray[0]==1){
            
            contract.getNumOfMediInfo(function(err, result) {
               if (err)
                  return showError("Smart contract call failed: " + err);
               
                  
               // showInfo(`Document ${result} <b>successfully added</b> to the registry.`);
               console.log("length: " + result);
      
               for (let i = 0; i < result; i++) {
      
                  contract.getProductMediInfo(i, function(err, product) {
      
                     console.log("product: " + product);
      
                     let toString = product.toString();
                     // console.log("product: " + toString);
                     let strArray = toString.split(",");
      
                     let timestamp = new Date(strArray[5]*1000);
                     console.log("timestamp: " + timestamp);
                     console.log("timestamp: " + strArray[5]*1000);
                     
                     // let row = table.insertRow();
                     // let cell1 = row.insertCell(0);
                     // let cell2 = row.insertCell(1);
                     // let cell3 = row.insertCell(2);
                     // let cell4 = row.insertCell(3);
                     // cell1.innerHTML = strArray[0];
                     // cell2.innerHTML = strArray[1];
                     // cell3.innerHTML = strArray[2];
                     // cell4.style.width ="60%";
                     // cell4.innerHTML = timestamp;
      
                     $('#myTable').append( '<tr><td>' + strArray[2] + ", "+ strArray[3] + ", "+strArray[4] + ", "+ timestamp  + '</td></tr>' );
      
                  })  // end of get
      
               } // end of for
      
            });    
            $('#myTable').append(  '</table>' );

         }
         
         else{
            return showError("Confirm Customer Address!!");
         }
      

      })

       
    }
    
    async function itemUploadButton() {
        // if ($('#documentForUpload')[0].files.length == 0)
            // return showError("Please select a file to upload.");
      let CustomerAddress  = $("#prouser").val();
      if (window.ethereum)
         try {
            await window.ethereum.enable();
         } catch (err) {
                return showError("Access to your Ethereum account rejected.");
         }
      if (typeof web3 === 'undefined')
                return showError("Please install MetaMask to access the Ethereum Web3 injected API from your Web browser.");
         
      let address = selectedAddress 
      console.log("my number " , address);
      
      let hospital = $("#prohospital").val();
      console.log("hospital " , hospital);

      let name  = $("#proname").val();
      console.log("name " , name );

      let diagnosis = $("#proloc").val();
      console.log("diagnosis " , diagnosis);
      
      let contract = web3.eth.contract(productRegistryContractABI).at(productRegistryContractAddress);
      contract.getTypes(CustomerAddress,function(err,result){
         if (err)
               return showError("Smart contract call failed: " + err);
         let toString = result.toString();
               // console.log("product: " + toString);
         let strArray = toString.split(",");
         console.log(strArray[0]);
         if(strArray[0]==1){
            contract.getNumOfMediInfo(function(err,result){
               if (err)
                  return showError("Smart contract call failed: " + err);
                  contract.addProMediInfo(result,CustomerAddress, hospital, name, diagnosis, function(err, result) {
                    if (err)
                      return showError("Smart contract call failed: " + err);
                    
                    showInfo(`Document ${result} <b>successfully added</b> to the registry.`);
                  });
             });
         }
       
      }
      )  

    }

    // 브라우저 새로고침!!!

    function verifyDocument() {
      
      
      if (typeof web3 === 'undefined')
                return showError("Please install MetaMask to access the Ethereum Web3 injected API from your Web browser.");
         
      let address = selectedAddress 
      console.log("my account " , address);
      

 
    }
});