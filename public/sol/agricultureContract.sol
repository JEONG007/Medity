pragma solidity ^0.4.23;
pragma experimental ABIEncoderV2;

contract agricultureContract {

    uint8 numberOfMediInfo; // 총 제품의 수입니다.
    address contractOwner;

    struct myMediInfo {  // 게시판 리스트 저장 항목명 - 고유번호, 날짜
        uint   number;//고유번호
		string hospital;
        string name;
        string diagnosis;
        uint timestamp; //등록 날짜
    }

    myMediInfo[] public myMediInfos;

    constructor() public {        
        contractOwner = msg.sender;
    }

    function addProMediInfo (uint _number, string _hospital, string _name, string _diagnosis) public { // 넘겨받을 데이터
        myMediInfos.push(myMediInfo(_number, _hospital,  _name,  _diagnosis, now)) -1; //now : 현재 날짜 시간 자동으로 받아주는 함수
        numberOfMediInfo++;
    }


    //제품 등록의 수를 리턴합니다.
    function getNumOfMediInfo() public constant returns(uint8) {
        return numberOfMediInfo;
    }
    
    function getAllMediInfo() public view returns (myMediInfo[]) {  //list에 가져옴
        return myMediInfos;
        
    }

    //번호에 해당하는 제품의 이름을 리턴합니다.
    function getProductMediInfo(uint _index) public view returns (uint, string, string, string, uint) {
        return (myMediInfos[_index].number, myMediInfos[_index].hospital, myMediInfos[_index].name, myMediInfos[_index].diagnosis, myMediInfos[_index].timestamp);
    }

    //컨트랙트를 삭제합니다.
    function killContract() public {
        if(contractOwner == msg.sender)
            selfdestruct(contractOwner);
    }
}