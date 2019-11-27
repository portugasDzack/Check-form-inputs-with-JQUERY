/**
 * form initialization
 */
function formInit() {
    const form = document.querySelector('form')
    form.reset()
    // hide unnecessary fields
    //      other-title
    //      colors-js-puns
    //      credit-card
    //      paypal
    //      bitcoin
    $('#other-title').hide();
    $('#colors-js-puns').hide();
    $('#credit-card').hide();
    $('#paypal').hide();
    $('#bitcoin').hide();
    // Add activities cost container
    $( "fieldset.activities" ).append("<span id='cost' style ='.cost'>Total Cost :</span>" )
    $('#cost').css({"font-weight": "bold",
        "font-size": "1.05em",
        "color": "rgba(8, 63, 87, 0.6)"});
    $('#cost').hide();
    // Disable T-Shirt color select

}

/**
 * @param  {} evt
 */
var total=0;
function updateAcivitiesRegistration(evt){

    // we can not be present at the same time at two activities
    if ($(this).attr("checked",true)){
        console.log("daa")
        if($(this).is(':checked')){
            total = total + Number($(this).attr("data-cost").slice(1,$(this).attr("data-cost").length))
        }
        if(!($(this).is(':checked'))){
            total = total - Number($(this).attr("data-cost").slice(1,$(this).attr("data-cost").length))
        }
        var thiss = $(this)
        
        console.log(total);
        //$('#cost').show();
        console.log(thiss.attr("name"));
    }
    comparaison(thiss);
    if(total !== 0){
        $('#cost').show();
    }
    if (total === 0 ){
        $('#cost').hide();
    }
    str = "Total Cost : "  + total  + "$" ;
    document.getElementById("cost").innerHTML = str;
    

    //trihgger change handler initially!
 //calculate the overall cost of the selected activities
    // update styles to prevent the user from checking a parallel activity
    // The overall cost must be inside a 'span' with the '.cost' css class
}

/**
 * called when the user selects the other option of Job role select
 */

function comparaison (thiss){
    var c=0;
    var v;
    $('.activities input').each(function(){
        c++;
        if(thiss.attr("data-day-and-time") === $(this).attr("data-day-and-time") && (thiss.attr("name") != $(this).attr("name"))){
            //console.log($(this).attr("name"))
            $(this).prop("disabled", true );
            v=c;
            $(this).css("text-decoration","line-through");

        }
      

    });
    var c2=0;
    $('.activities label').each(function(){
        c2++
        if(c2 === v){
            //console.log($(this).attr("name"))
            $(this).css("text-decoration","line-through");

        }
      

    });
}
function updateJobRole() {
    // When the user chooses the 'other' option, 
    // the 'title' text box should be displayed
    var job_other=$('#title').val();
    if(job_other=="other")
    {$('#other-title').slideDown();
//$(this).hide();
    }
    else{
        $('#other-title').slideUp();
    }

    
}


/**
 * Called when the user selects a design theme
 * @param  {} evt
 */
function updateTShirtColor(evt) {
    // depending on the color theme chosen by the user, 
    // display only the corresponding options.
    var des=$('#design').val();
    if(des=="JS Puns")
    { $('#colors-js-puns').show();
    // $( "" ).prop( "disabled", true );
    //var tab=["cornflowerblue","darkslategrey","gold"];
    for(var i=0;i<$("#color option").length;i++)
        if($($("#color option")[i]).val()=="tomato" || $($("#color option")[i]).val()=="steelblue" || $($("#color option")[i]).val()=="dimgrey") 
        {$($("#color option")[i]).prop( "disabled", true );}
        else{
            $($("#color option")[i]).prop( "disabled", false );
        }
    }
    else{
        $('#colors-js-puns').show();
        for(var i=0;i<$("#color option").length;i++)
        if($($("#color option")[i]).val()=="cornflowerblue" || $($("#color option")[i]).val()=="darkslategrey" || $($("#color option")[i]).val()=="gold") 
        {$($("#color option")[i]).prop( "disabled", true );}
        else{
            $($("#color option")[i]).prop( "disabled", false );
        }
    }
}

/**
 * Called when the user selects the payment method
 */
function updatePaymentInfo() {
    // depending on the choice of payment type, 
    // the corresponding fields are displayed.
    var man_py=$('#payment').val();
    if(man_py=="PayPal")
    {$('#paypal').slideDown();
    $('#bitcoin').slideUp();
    $('.credit-card').hide();
    }
    else if(man_py=="Bitcoin")
    {$('#bitcoin').slideDown();
    $('#paypal').slideUp();
    $('.credit-card').hide();
    }

    else
    {$('.credit-card').show();
    $('#paypal').slideUp();
    $('#bitcoin').slideUp();
}


}

/**
 * validate a specific rule and show error if any
 * @param  {} rule
 */
function validate(){
    // Executed for each of the rules in the table given at the end. 
    // Depending on the rule type and if there is an error, 
    // it is displayed in a 'div' tag with the class 'error' 
    // and added before the validated field
    console.log($(this));
    var rule = $(this).selector.val();

    ;console.log(rule);

    
    if (rule.match($(this).regExp))
    {
        console.log("validé")
    }
    else
    {
        console.log($(this).errorMessage);
    }





    
}

// no comment

document.addEventListener('DOMContentLoaded', formInit)

$('#title').on('change', updateJobRole)

$('.activities').on('change', '[type=checkbox]', updateAcivitiesRegistration)

$('#design').on('change', updateTShirtColor)

$('#payment').on('change', updatePaymentInfo)

$('form').on('submit', (evt) => {
    evt.preventDefault()
    var rule = $("#mail").val();
    validate(rule);
    // remove all previous errors before computing the overall validation
    $('form .error').remove()
    validationRules.forEach(validate)
})

// all validation rules array.  
const validationRules = [
    {
        type: 'regExp',
        selector: '#name', 
        regExp: /^[AZ][AZ',\.\-]+$/i,
        errorMessage: 'This field must contains at least 2 characters'
    },
    {
        type: 'regExp',
        selector: '#mail', 
        regExp: /^[^@]+@[^@]+$/,
        errorMessage: 'Please enter a valid email'
    },
    {
        type: 'regExp',
        selector: '#cc-num', 
        regExp: /^d{13,16}$/,
        errorMessage: 'Please enter a valid credit card Num'
    },
    {
        type: 'regExp',
        selector: '#zip', 
        regExp: /^d{5}$/,
        errorMessage: 'Please enter a valid zip code'
    },
    {
        type: 'regExp',
        selector: '#cvv', 
        regExp: /^d{3}$/,
        errorMessage: 'Please enter a valid CVV'
    },
    {
        type: 'multiCheck',
        tag: 'input:checked',
        selector: '.activities', 
        minValues: 1,
        errorMessage: 'Please check at least one activity'
    },
    {
        type: 'empty',
        selector: '#title', 
        errorMessage: 'Please select a job title'
    },
    {
        type: 'empty',
        selector: '#design', 
        errorMessage: 'Please select a design theme'
    },
    {
        type: 'empty',
        selector: '#colors-js-puns select', 
        errorMessage: 'Please select a color'
    },
    {
        type: 'empty',
        selector: '#exp-month', 
        errorMessage: 'Please select a month'
    },
    {
        type: 'empty',
        selector: '#exp-month', 
        errorMessage: 'Please select an expiration year'
    },
    {
        type: 'empty',
        selector: '#payment', 
        errorMessage: 'Please select a payment method'
    },
    
]


