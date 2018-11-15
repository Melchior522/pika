$.ajax({
    type: 'POST',
    url: apiUrl + 'memberData',
    data: inputData,
    dataType: 'json',
    contentType: 'application/json',
    beforeSend: function() {
      //display loading
      document.getElementById('loader').style.display = "block";
    },
    success: function(data) {

      //get user input data
        var formAccountNum = $('.account-number input').val();
        var formCardId = $('.card-id input').val();
        var formCredit = data.credit//此处留意
        var formPartnerId = $('.earn-partner select').find(":selected").attr('partner-id');

        //create json data
        var inputData = '{' + '"accountnumber" : "' + formAccountNum + '", ' + '"cardid" : "' + formCardId + '", ' + '"points" : "' + formPoints + '", ' + '"partnerid" : "' + formPartnerId + '"credit" : "' + formCredit +'"}';
        console.log(inputData)

        //make ajax call
        $.ajax({
            type: 'POST',
            url: apiUrl + 'userUsePoints',
            data: inputData,
            dataType: 'json',
            contentType: 'application/json',
            beforeSend: function() {
            //display loading
            document.getElementById('loader').style.display = "block";
            document.getElementById('infoSection').style.display = "none";
            },
            success: function(data) {

            document.getElementById('loader').style.display = "none";
            document.getElementById('infoSection').style.display = "block";

            //check data for error
            if (data.error) {
                alert(data.error);
                return;
            } else {
             //update member page and notify successful transaction
                updateMember();
                alert('Transaction successful');
            }


            },
            error: function(jqXHR, textStatus, errorThrown) {
      alert("Error: Try again")
      console.log(errorThrown);
      console.log(textStatus);
      console.log(jqXHR);
    }
  });

    },
    error: function(jqXHR, textStatus, errorThrown) {
      //reload on error
      alert("Error: Try again")
      console.log(errorThrown);
      console.log(textStatus);
      console.log(jqXHR);
    },
    complete: function() {

    }
  });











  async function EarnPoints(earnPoints) {

    //update member points
    earnPoints.member.points = earnPoints.member.points + earnPoints.points;
  
    //update member
    const memberRegistry = await getParticipantRegistry('org.clp.biznet.Member');
    await memberRegistry.update(earnPoints.member);
  
    // check if partner exists on the network
    const partnerRegistry = await getParticipantRegistry('org.clp.biznet.Partner');
    partnerExists = await partnerRegistry.exists(earnPoints.partner.id);
    if (partnerExists == false) {
      throw new Error('Partner does not exist - check partner id');
    
    }



    let result = await query('selectCompanysMH');
    for(let n=0;n<result.length;n++){
      if(userearnPoints.company=result[n]){
        userearnPoints.company.points = userearnPoints.company.points - userearnPoints.points;
        await companyRegistry.update(userearnPoints.company);
      }
      else{
        throw new Error('YES')
      }
    }




  }