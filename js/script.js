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
   $('#cost').addClass('cost');
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
    //j'ai ajouté une fontion qui compare le input choisi avec d'autres , s'il ya un autre
    //avec ela meme date , il le barre et desactive le input .
    //s'il le input est décoché , il cherche le input barré et le débarre et le réactive

    comparaison(thiss);
    if(total !== 0){
        $('#cost').show();
    }
    if (total === 0 ){
        $('#cost').hide();
    }
    str = "Total Cost : "  + total  + "$" ;
    //remplir le span cost
    document.getElementById("cost").innerHTML = str;

    // The overall cost must be inside a 'span' with the '.cost' css class
}



function comparaison (thiss){
    //1 er cas : si on l'est a coché
    if(thiss.is(':checked')){
        var c=0;
        var v;
    $('.activities input').each(function(){
        c++;
        if(thiss.attr("data-day-and-time") === $(this).attr("data-day-and-time") && (thiss.attr("name") != $(this).attr("name"))){
            
            $(this).prop("disabled", true );
            v=c;//on recupere dans v l'ordre de l'input qui doit etre scratché
        }
      

    });
    var c2=0;
    //maintenant on parcours les label
    $('.activities label').each(function(){
        c2++
        if(c2 === v){ 
            $(this).css("text-decoration","line-through");

        }
      

    });
    }
    else {
        //si on l'est a décoché cette fois
    var c=0;
    var v;
    //cette fois on recupere
    $('.activities input').each(function(){
        c++;
        //on recupere l'ordre mais cette fois pour eliminer le trait
        if(thiss.attr("data-day-and-time") === $(this).attr("data-day-and-time") && (thiss.attr("name") != $(this).attr("name"))){
            //console.log($(this).attr("name"))
            $(this).prop("disabled", false );
            console.log("disabled")
            v=c;
            //$(this).css("text-decoration","line-through");
        }
      

    });
    var c2=0;
    $('.activities label').each(function(){
        c2++
        if(c2 === v){
            
            //console.log("i reached here man")
            $(this).css("text-decoration","");

        }
      

    });
    }
    
}

function updateJobRole() {
    // When the user chooses the 'other' option, 
    // the 'title' text box should be displayed
    var job_other=$('#title').val();
    if(job_other=="other")
    {$('#other-title').slideDown();

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
    //on recupere la valeur du design
    var des=$('#design').val();
    //console.log(des);
    //1er cas : s'il sont du type JSpunes
    if(des=="JS Puns")
    { $('#colors-js-puns').show();
    for(var i=0;i<$("#color option").length;i++)
    //on désactive les autres options
        if($($("#color option")[i]).val()=="tomato" || $($("#color option")[i]).val()=="steelblue" || $($("#color option")[i]).val()=="dimgrey") 
        {$($("#color option")[i]).prop( "disabled", true );}
        else{
            $($("#color option")[i]).prop( "disabled", false );
        }
    }
    //si aucune valeur n'est choisi
    else if(des==""){
        $('#colors-js-puns').hide();
    }
    //si on choisie i love javascript (le cas qui reste)
    else {
        $('#colors-js-puns').show();
        //on décoche les autres options
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
function validate(rule){
    // Executed for each of the rules in the table given at the end. 
    // Depending on the rule type and if there is an error, 
    // it is displayed in a 'div' tag with the class 'error' 
    // and added before the validated field
    

    //on récupère la valeur du string qui doit etre comparé avec le regEXP 
    var a = $(rule.selector).val();
    // 1 er cas : les rules qui ont une regExp attribut
    // et aussi les input qui sont affichés
    if((rule.selector=='#name' || rule.selector=='#mail' || rule.selector=='#cc-num' || rule.selector=='#zip' || rule.selector=='#cvv') && ($(rule.selector).is(":visible"))){
        
        console.log(rule.regExp.test(a))
        if (rule.regExp.test(a))
    {
        console.log("validé")

    }
    else
    {   //on insert le message d'erreur   
         $('<div>').insertBefore(rule.selector).text(rule.errorMessage).addClass('error');
        
    }}
    else if(rule.selector == '.activities'){
        if(rule.minValues>$("input:checkbox:checked").length){
            $('<div>').insertBefore(rule.selector).text(rule.errorMessage).addClass('error');
        }
    }
    else {
        //les autres rules qui ne contiennent pas une regExp 
        // on test seulement les input affichés
        if ($(rule.selector).is(":visible")){
            /*
        console.log(" la selector "+rule.selector);
        console.log(" la valeur "+$(rule.selector).val());
        console.log("la longueur "+$(rule.selector).val().length)*/
        if($(rule.selector).val().length == 0){
            $('<div>').insertBefore(rule.selector).text(rule.errorMessage).addClass('error');
        }
        }
        
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
        regExp: /^\d{13,16}$/,
        errorMessage: 'Please enter a valid credit card Num'
    },
    {
        type: 'regExp',
        selector: '#zip', 
        regExp: /^\d{5}$/,
        errorMessage: 'Please enter a valid zip code'
    },
    {
        type: 'regExp',
        selector: '#cvv', 
        regExp: /^\d{3}$/,
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


