// Global variable which references the form resumeForm
var myForm = document.resumeForm;

function isValidEmail(emailAddress)
{
    // Regualr Expression for a valid email Address
    const emailRegExp = /^(([^<>()\[\]\\.,;:@"\x00-\x20\x7F]|\\.)+|("""([^\x0A\x0D"\\]|\\\\)+"""))@(([a-z]|#\d+?)([a-z0-9-]|#\d+?)*([a-z0-9]|#\d+?)\.)+([a-z]{2,4})$/i;
    return emailRegExp.test(emailAddress);
}

function validateEmail()
{
    // Local variable which stores the value of the HTMLInputElement named email
    var email = myForm.email;
    if (isValidEmail(email.value))
    {
        generateResume();
  
    }
    else
    {
        email.focus();
        document.getElementById("emailAddress").innerHTML = "Invalid Email Address";
        document.getElementById("emailAddress").style.color = "red";
        email.style.borderColor = "red";
    }
}

document.getElementById("createResume").addEventListener("click", validateEmail);

function generateResume()
{
    var resumeWindow = window.open('about:blank','myPop');
    myText = ("<html>\n<head>\n<title>Resume/CV</title>\n<meta name=\"viewport\"");
    myText += ("content=\"width=device-width,initial-scale=1.0\">");
    myText += ("<link rel=\"stylesheet\" href=\"popUpStyle.css\">\n</head>\n<body>\n");
    
    var firstName = myForm.firstName.value;
    var lastName = myForm.lastName.value
    var jobTitle = myForm.title.value;
    var headshot = myForm.headshot.value;
    headshot = headshot.substring(12);

    // Start of resume Container
    myText += ("<div id=\"resumeContainer\">");
    myText += ("<div class=\"topBanner\"></div>");

    // Start of header Container & Name /Info Container 
    myText += ("<div id=\"headerContainer\"><img src=\"" + headshot + "\"width=\"165\" height=\"165\"><div id=\"nameAndInfo\">");
    myText +=("<h1 id=\"name\"><span id=\"firstName\">" + firstName + "</span><br><span id=\"lastName\">" + lastName + "</span>");
    myText += ("<br><span id=\"jobTitle\">" + jobTitle + "</span></h1>");   
    
    var city = myForm.city.value;
    var state = myForm.state.value;
    var zipcode = myForm.zipcode.value;
    var phoneNumber = myForm.phoneNumber.value;
    var email = myForm.email.value;
    var linkedIn= myForm.socialsLink.value;
    var portfolio = myForm.portfolioLink.value;
    
    // Start of personal info Container
    myText += ("<div id=\"infoContainer\"><p class=\"info\">" + city + ", " + state + ", " + zipcode + "</p>")
    myText += ("<p class=\"info\">Phone Number: " + phoneNumber + "</p>");
    myText += ("<p class=\"info\">Email: " + email + "</p>");
    myText += ("<p class=\"info\">LinkedIn: " + "<a href=\"" + linkedIn + "\" target=\"_blank\">LinkedIn URL</a></p><p class=\"info\">Portfolio: ");
    myText += ("<a href=\"" + portfolio + "\" target=\"_blank\">Portfolio Site</a></p>");
    //End of personal Info Container, name/Info, and header Container
    myText += ("</div></div></div>")

    var developerProfile = myForm.developerProfile.value;
    var profileArray = developerProfile.split(".");
    
    // Start of main resume content Container and Profile Section
    myText += ("<div class=\"resumeContent\"><div class=\"resumeSection\">");
    // Start of section title container(includes left and right columns)
    myText += ("<div class=\"sectionTitle\"><div class=\"leftColumn\"><h1 class=\"profileHeader\">Developer Profile</h1>");
    // End of leftColumn beginning/end of rightColumn
    myText += ("</div><div class =\"rightColumn\"><div class=\"dividers\"></div></div>")
    // End of section title Container
    myText += ("</div>")
    
    // Developer Profile Content Section
    myText += ("<div class =\"rightColumn\"><div class=\"content\"><ul id=\"profileList\">");
    for (var i = 0; i < profileArray.length - 1; i++)
    {
        myText += ("<li>" + profileArray[i] +"</li>");
    }
    // End of Profile content Section and First Section
    myText += ("</ul></div></div></div>");

    /** Work Experience Section
     */
    
    var company = [
        myForm.company1.value,
        myForm.company2.value,
        myForm.company3.value
    ];
    var position = [
        myForm.position1.value,
        myForm.position2.value,
        myForm.position3.value
    ];

    var jobDescription = [
        myForm.jobDescription1.value,
        myForm.jobDescription2.value,
        myForm.jobDescription3.value
    ]

    var startDates = document.getElementsByClassName("startDate");
    var endDates = document.getElementsByClassName("endDate");
    
    // Start of work Experience Section(this line includes section title container)
    myText += ("<div class =\"resumeSection\"><div class=\"sectionTitle\"><div class=\"leftColumn\">");
    myText += ("<h1 class=\"profileHeader\">Experience</h1>");
    // End of left Column, beginning/end of rightColumn
    myText += ("</div><div class=\"rightColumn\"><div class=\"dividers\"></div></div>");  
    // End of section title container
    myText += ("</div>");
    var jobDescriptionArray;

    for (var i = 0; i < 3; i++)
    {
        jobDescriptionArray = jobDescription[i].split(".");
        // Start of work Experience Content Section, end of left column(position)
        myText += ("<div class=\"experienceContainer\"><div class=\"leftColumn\"><h2 class =\"position\">" + position[i] + "</h2></div>");
        // Start of right column(company + description) including <div> inside right column(job description)
        myText += ("<div class=\"rightColumn\"><div class=\"experienceContent\"><span class=\"company\">" + company[i]);
        
        // Start and end date inside <span> inside right column(job description)
        myText += ("(" + startDates[i].value.substring(0,4) + " - " + endDates[i].value.substring(0,4) + ")");
        // End of company and date </span>
        myText += ("</span>");

        // Start  of unordered List for job description
        myText += ("<ul class=\"jobDescription\">")
        for (var j = 0; j < jobDescriptionArray.length - 1; j++)
        {
            myText +=("<li>" + jobDescriptionArray[j] + "</li>")
        }
        // End of unorder list for job description
        myText += ("</ul>");

        // End of job description <div> inside right column (company  + description)
        myText += ("</div>");
        
        // End of right column(company and Description(content))
        myText += ("</div>");

        // End of experienceContainer
        myText +=("</div>")
    }
     /**  
      * End of Work experience resumeSection (title + content sections)
    */
      myText += ("</div>");

    /**
     * Start of Key Skills Section
     */
    // Start of Key Skills Experience Section(this line includes section title container)
    myText += ("<div class =\"resumeSection\"><div class=\"sectionTitle\"><div class=\"leftColumn\">");
    myText += ("<h1 class=\"profileHeader\">Key Skills</h1>");
    // End of left Column, beginning/end of rightColumn
    myText += ("</div><div class=\"rightColumn\"><div class=\"dividers\"></div></div>");  
    // End of section title container
    myText += ("</div>");

    var skills1 = myForm.softSkills.value;
    var skillsArray = skills1.split(",");

    // Start of right Column for Key skills content, and right column(skills)
    myText +=("<div class=\"skillsContainer\"><div class=\"rightColumn\"><div class =\"skillsContent\">");
    
    myText += ("<span class=\"softskill\">Soft Skills</span>");

    // // Start of unordered list for key skills description
    myText += ("<ul class=\"skillsDescription\">");
    
    for (var j = 0; j < skillsArray.length; j++)
    {
        myText += ("<li>" + skillsArray[j] + "</li>");
    }

    // End of unordered list for key skills description
    myText += ("</ul>");

    // End of key skills category container(inside right column(skills category + description))
    myText += ("</div>");
    
    // New  key skill category container(inside right column(skill category + description))
    myText += ("<div class=\"skillsContent\"><span class=\"softskill\">Branding Skills</span>");
    
    var skills2 = myForm.brandingSkills.value;
    var skillsArray2 = skills2.split(",");

    myText += ("<ul class=\"skillsDescription\">");
    
    for (var j = 0; j < skillsArray2.length; j++)
    {
        myText += ("<li>" + skillsArray2[j] + "</li>");
    }

    // End of skills category container (inside right column(skill category + description))
    myText +=  ("</div>")

    // New  key skill category container(inside right column(skill category + description))
    myText += ("<div class=\"skillsContent\"><span class=\"softskill\">Misc. Skillsets</span>");
    
    var skills3 = myForm.skillsetChoice.value;
    var skillsArray3 = skills3.split(",");

    myText += ("<ul class=\"skillsDescription\">");
    
    for (var j = 0; j < skillsArray3.length; j++)
    {
        myText += ("<li>" + skillsArray3[j] + "</li>");
    }

    // End of skills category container (inside right column(skill category + description))
    myText +=  ("</div>")
        
    // End of right column
    myText += ("</div>");
    
    // End of key Skills container content section(right column)
    myText += ("</div>");

    /**  
      * End of key Skills resumeSection (title + content sections)
    */
      myText += ("</div>");

    /**
     * Start of Technical Skills Section
     */
    // Start of Key Skills Experience Section(this line includes section title container)
    myText += ("<div class =\"resumeSection\"><div class=\"sectionTitle\"><div class=\"leftColumn\">");
    myText += ("<h1 class=\"profileHeader\">Technical Skills</h1>");
    // End of left Column, beginning/end of rightColumn
    myText += ("</div><div class=\"rightColumn\"><div class=\"dividers\"></div></div>");  
    // End of section title container
    myText += ("</div>");


    var techSkills1 = myForm.programmingLanguages.value;
    var techSkillsArray1 = techSkills1.split(",");

    // Start of right Column for Key skills content, and right column(skills)
    myText +=("<div class=\"skillsContainer\"><div class=\"techSkillsrightColumn\"><div class =\"techSkillsContent\">");
    
    myText += ("<span class=\"techSkill\">Programming Languages</span>");

    // // Start of unordered list for key skills description
    myText += ("<ul class=\"techskillsDescription\">");
    
    for (var j = 0; j < techSkillsArray1.length; j++)
    {
        myText += ("<li>" + techSkillsArray1[j] + "</li>");
    }

    // End of unordered list for key skills description
    myText += ("</ul>");

    // End of key skills category container(inside right column(skills category + description))
    myText += ("</div>");
    
    // New  key skill category container(inside right column(skill category + description))
    myText += ("<div class=\"techSkillsContent\"><span class=\"techSkill\">Frameworks</span>");
    
    var techskills2 = myForm.frameworks.value;
    var techskillsArray2 = techskills2.split(",");

    myText += ("<ul class=\"techskillsDescription\">");
    
    for (var j = 0; j < techskillsArray2.length; j++)
    {
        myText += ("<li>" + techskillsArray2[j] + "</li>");
    }

    // End of skills category container (inside right column(skill category + description))
    myText +=  ("</div>")

    // New  key skill category container(inside right column(skill category + description))
    myText += ("<div class=\"techSkillsContent\"><span class=\"techSkill\">Software Dev. Tools</span>");
    
    var techskills3 = myForm.softwareTools.value;
    var techskillsArray3 = techskills3.split(",");

    myText += ("<ul class=\"techskillsDescription\">");
    
    for (var j = 0; j < techskillsArray3.length; j++)
    {
        myText += ("<li>" + techskillsArray3[j] + "</li>");
    }

    // End of skills category container (inside right column(skill category + description))
    myText +=  ("</div>")
    
    // New  key skill category container(inside right column(skill category + description))
    myText += ("<div class=\"techSkillsContent\"><span class=\"techSkill\">Software Dev. Methedologies</span>");
    
    var techskills4 = myForm.softwareMethedologies.value;
    var techskillsArray4 = techskills4.split(",");

    myText += ("<ul class=\"techskillsDescription\">");
    
    for (var j = 0; j < techskillsArray4.length; j++)
    {
        myText += ("<li>" + techskillsArray4[j] + "</li>");
    }

    // End of skills category container (inside right column(skill category + description))
    myText +=  ("</div>")
        
    // End of right column
    myText += ("</div>");
    
    // End of key Technical container content section(right column)
    myText += ("</div>");
    /**  
      * End of Technical Skills resumeSection (title + content sections)
    */
    myText += ("</div>");

    /**
     * Start of Education Section
     */
    // Start of Key Skills Experience Section(this line includes section title container)
    myText += ("<div class =\"resumeSection\"><div class=\"sectionTitle\"><div class=\"leftColumn\">");
    myText += ("<h1 class=\"profileHeader\">Education</h1>");
    // End of left Column, beginning/end of rightColumn
    myText += ("</div><div class=\"rightColumn\"><div class=\"dividers\"></div></div>");  
    // End of section title container
    myText += ("</div>");

    var education = myForm.education.value;
    var educationArray = education.split(",");
    var degree = educationArray[0];
    var school = educationArray[1];
    var schoolDates = document.getElementsByClassName("schoolDates");

    // Start of Eduucation Content section(contains left column with degree header)
    myText += ("<div class=\"educationContainer\"><div class=\"leftColumn\"><h2 class=\"degree\">" + degree + "</h2></div>");
    
    // Start of right column(college attended )
    myText += ("<div class=\"rightColumn\"><div class=\"educationContent\">");
    myText += ("<span class=\"college\">" + school);

    myText += ("(" + schoolDates[0].value.substring(0,4) + " - " + schoolDates[1].value.substring(0,4) + ")");
    
    // End of school and date </span>
    myText += ("</span>");

    // End of rightColumn and educationContentSection
    myText += ("</div></div>");
    // End of education content block(degree + college)
    myText += ("</div>");
    
    /**  
      * End of Education  resumeSection (title + content)
    */
     myText += ("</div>");

     var references = [
         myForm.reference1.value,
         myForm.reference2.value,
         myForm.reference3.value
     ];

     /**
     * Start of references Section
     */
     // Start of Key Skills Experience Section(this line includes section title container)
    myText += ("<div class =\"resumeSection\"><div class=\"sectionTitle\"><div class=\"leftColumn\">");
    myText += ("<h1 class=\"profileHeader\">References</h1>");
    // End of left Column, beginning/end of rightColumn
    myText += ("</div><div class=\"rightColumn\"><div class=\"dividers\"></div></div>");  
    // End of section title container
    myText += ("</div>");

    var referenceDescriptionArray;

    for (var i = 0; i < 3; i++)
    {
        var referenceNumber;
        if (i == 0)
        {
            referenceNumber = 1;
        }
        else if(i == 1)
        {
            referenceNumber = 2;
        }
        else
        {
            referenceNumber = 3;
        }

        referenceDescriptionArray = references[i].split(",")
        //Start of reference section, start&end of left column(reference#)
        myText += ("<div class=\"\"referenceContainer><div class=\"leftColumn\"><h2 class=\"referenceHeader\">Reference" + referenceNumber + "</h2>" + "</div>");

        // Start of right column(Professional relationship + contact info) including <div> inside right column(reference description)
        myText += ("<div class=\"rightColumn\"><div class=\"referenceContent\"><div class=\"referenceInfoContainer\"><span class=\"referenceName\">" + referenceDescriptionArray[0] + ", ");
        myText += ("</span><span class=\"referenceRelationship\">" + referenceDescriptionArray[1]);
        
        // Relationship Inisde <span> inside right column (reference description)
        myText += ("</span></div><span class=\"referenceContact\">" + referenceDescriptionArray[2] + "</span>");
        
        // End of reference description <div> inside right column (relationship + contact info)
        myText += ("</div>");
        
        // End of right column(reference relationship + contact info)
        myText+= ("</div>")
        
        // End of references container
        myText += ("</div>")
    }  
    /**  
      * End of References resumeSection (title + content)
    */
     myText += ("</div>");

    /**
     *  End of resume Content container
     */
    myText += ("</div>");
    
    // Bottom banner
    myText += ("<div class=\"bottomBanner\"></div>");
    // End of Pop Up window 
    myText += ("\n</div></body>\n</html>");
    
    // Writes the string to the new popUp window
    resumeWindow.document.write(myText);

    // End of the generateResume() functio
}

