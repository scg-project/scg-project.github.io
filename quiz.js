

Survey
    .StylesManager
    .applyTheme("darkblue");

//Add a property a text property into all questions types and into page
Survey
    .Serializer
    .addProperty("question", "popupdescription:text");
Survey
    .Serializer
    .addProperty("page", "popupdescription:text");
function showDescription(element) {
    document
        .getElementById("questionDescriptionText")
        .innerHTML = element.popupdescription;
    $("#questionDescriptionPopup").modal();
}

var json = {
    "completedHtml": "<h3>Thank you for checking the eligibilty.</h3>",
    "completedHtmlOnCondition": [
        {
            "expression": "{citizen_bool} = false or  {2C_bool} = true or {10Y_check} = 0 or {sex_offence_check} = 1 or {offence_checkbox.length} > 1 or  {open_criminal_case_check_bool} = 1",
            "html": "<h3>Not Eligible for Sealing </h3> <h5> Thank you for checking the eligibilty. </h5>"
        }, {
            "expression": "{open_criminal_case_check} = 0",
            "html": "<h3>You are Eligible for Sealing </h3> <h5> Thank you for checking the eligibilty. </h5>"
        }
    ],
    "pages": [
        {
            "elements": [
                {
                    "type": "panel",
                    "elements": [
                        {
                            "type": "html",
                            "name": "Clean_slate Intro",
                            "html": "<article class='intro'>    <h1 class='intro__heading intro__heading--NY title'>  About New York Sealing    </h1>    <div class='intro__body wysiwyg'>       <p>New York uses a process called sealing for some cases. Sealing means that the record still exists, but all related fingerprint and palmprint cards, booking photos, and DNA samples may be returned to you or destroyed (except digital fingerprints are not destroyed if you already have fingerprints on file from a different unsealed case). Department of Criminal Justice System, Police, Prosecutor, and in some cases, court records, are hidden from the public.</p> <p>The following cases are closed or sealed without you having to do anything:</p>       <ul>        \t<li>        \t\tCases where you got a Good Result        \t</li>        \t<li>        \t\tCrimes Committed by Children        \t\t<li>        \t\t\tCrimes committed by Youthful Offenders        \t\t        \t</li>        \t<li>        \t\tViolations and Traffic Infractions like disorderly conduct and trespass are partially sealed)        \t</li>       </ul>         <p>If a record that is supposed to be sealed comes up on your Criminal Records search, you can ask to seal that record. Click on \"NEXT\" to check your eligibility.</p></div> </article>"
                        }
                    ],
                    "name": "panel1"
                }
            ],
            "name": "page0"
        },


        {
            "name": "page1",
            "elements": [
                {
                    "type": "boolean",
                    "name": "citizen_bool",
                    "title": "Citizenship check",
                    "label": "Are you a Citizen of United States of America ?",
                    "isRequired": true
                },
                {
                    "type": "boolean",
                    "name": "2C_bool",
                    "visibleIf": "{citizen_bool} = true",
                    "title": "2C_bool check",
                    "label": "Do you have more than two criminal convictions (Misdemeanor or Felony) ?",
                    "popupdescription": "If you have more than one conviction that was “committed as part of the same criminal transaction,” they count as a single conviction under this law.",
                    "isRequired": true
                },
                {
                    "type": "radiogroup",
                    "name": "10Y_check",
                    "title": "Have less than ten years passed since your last criminal conviction ?",
                    "visibleIf": "{2C_bool} = false",
                    // "label": "Have less than ten years passed since your last criminal conviction ?",
                    "choices": [
                        {
                            "value": "0",
                            "text": "No"
                        }, {
                            "value": "1",
                            "text": "Yes"
                        }, {
                            "value": "-1",
                            "text": "Not Sure"
                        }
                    ],
                    "colCount": 3
                },
                {
                    "type": "radiogroup",
                    "name": "sex_offence_check",
                    "title": "Are you guilty of any sex offense ?",
                    "visibleIf": "{10Y_check} = 1 or {10Y_check} = -1",
                    "choices": [
                        {
                            "value": "0",
                            "text": "No"
                        }, {
                            "value": "1",
                            "text": "Yes"
                        }, {
                            "value": "-1",
                            "text": "Not Sure"
                        }
                    ],
                    "colCount": 3
                  },
                  {
                    "type": "checkbox",
                    "name": "offence_checkbox",
                    "visibleIf": "{sex_offence_check} = 0 or {sex_offence_check} = -1",
                    "title": "Please select the offences that you plan to expunge?",
                    "isRequired": true,
                    "validators": [
                        {
                            "type": "answercount",
                            "text": "Please select at least one",
                            "minCount": 1
                        }
                    ],
                    // "hasOther": true,
                    "choices": [
                        "Homicide Offenses", "Class A Felony Offenses", "Class B Violent Felony Offenses", "Class C Violent Felony Offenses","Class D Violent Felony Offenses","Class E Violent Felony Offenses","Conspiracy Offenses","None of the above" 
                    ],
                    // "otherText": "Other feature:",
                    "colCount": 2
                },
                {
                    "type": "radiogroup",
                    "name": "open_criminal_case_check",
                    "title": "Do you have any open criminal case ?",
                    "visibleIf": "{offence_checkbox} = ['None of the above'] ",
                    // "label": "Have less than ten years passed since your last criminal conviction ?",
                    "choices": [
                        {
                            "value": "0",
                            "text": "No"
                        }, {
                            "value": "1",
                            "text": "Yes"
                        }
                    ],
                    "colCount": 3
                  }
                  
            ]
            
        }
        , {
            "name": "page2",
            "elements": [
                {
                    "type": "multipletext",
                    "name": "contact_customer",
                    "title": "Want us to connect with us? Leave your name and email here:",
                    "items": [
                        {
                            "name": "Name"
                        }, {
                            "name": "E-mail",
                            "inputType": "email",
                            "validators": [
                                {
                                    "type": "email"
                                }
                            ]
                        }
                    ]
                }
            ]
        }

    ],
    "showQuestionNumbers": "off",
    "title": "New York Sealing Determination Form"
};

window.survey = new Survey.Model(json);

survey
    .onComplete
    .add(function (result) {
        document
            .querySelector('#surveyResult')
            .textContent = "Result JSON:\n" + JSON.stringify(result.data, null, 3);
    });

    survey
    .onAfterRenderQuestion
    .add(function (survey, options) {
        //Return if there is no description to show in popup
        if (!options.question.popupdescription) 
            return;
        
        //Add a button;
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn btn-info btn-xs";
        btn.innerHTML = "More Info";
        var question = options.question;
        btn.onclick = function () {
            showDescription(question);
        }
        var header = options
            .htmlElement
            .querySelector("h5");
        if (!header) 
            header = options.htmlElement;
        var span = document.createElement("span");
        span.innerHTML = "  ";
        header.appendChild(span);
        header.appendChild(btn);
    });

survey
    .onAfterRenderPage
    .add(function (survey, options) {
        //Return if there is no description to show in popup
        if (!options.page.popupdescription) 
            return;
        
        //Add a button;
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn btn-info btn-xs";
        btn.innerHTML = "More Info";
        btn.onclick = function () {
            showDescription(survey.currentPage);
        }
        var header = options
            .htmlElement
            .querySelector("h4");
        var span = document.createElement("span");
        span.innerHTML = "  ";
        header.appendChild(span);
        header.appendChild(btn);
    });
$("#surveyElement").Survey({model: survey});