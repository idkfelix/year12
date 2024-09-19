## Misc Glossary
- **Data Breach**: where private, sensitive, protected or confidential information is exposed to, copied by, transmitted to, shared with, or stolen by an unauthorised person
- **Software Update**: sometimes called a patch, it is not the same as an **Upgrade**, instead it enhances the current version of the software or application
- **Goals**: used by organisations to state long term intentions or purposes, whereas **Objectives** are shorter term measurable tasks that work towards goals

- **Authentication** is the process of identifying user and validating who they claim to be. This is most commonly achieved with the use of a username / password pair of credentials.
- **Authorisation** is the process of checking what level of access and permission a user, external service or device has

- Over time an improved model of the **3-2-1** rule has been developed
    - Keep at least three copies of any important files or data
    - Keep the files or data on two different media types
    - Keep one copy offsite and offline & one copy offsite in the cloud
- **Backups** are created for data recovery purposes, **Archives** are designed for long-term storage of important data and not as a recovery mechanism.
## Data Characteristics 
- **Secure Information** should be **Protected**, **Confidential** and **Risk Managed**
- **Data integrity** relates to data being **Valid, Accurate and Consistent**:
    - As a **state** defines a data set that is both valid and accurate
    - As a **process** it describes measures used to ensure validity and accuracy of a data set.
- **Validation** checks that the correct type of data is entered
- **Verification** checks the data is actually what you require 
- **Accuracy**: accurate data is correct and complete
- **Correctness**: information that matches its real world representation
- **Completeness**: every part of the data is recorded, critical to decision making
- **Appropriateness**: data that can be accessed with reasonable restrictions
- **Relevance**: the stored data is relevant to those collecting it
- **Timeliness**: data is accessible and available as required.   
- **Consistency**: multiple sources of the same data should match up 
- **Validity**: data that is formatted correctly and is usable by those accessing it
- **Uniqueness**: a data sources assurance against unintended duplicate records.
- **Accessibility**: users that need the data can access it
<div style="page-break-after: always;"></div>
## Data Disposal
- According to the **Victorian Information Privacy Principles**, organisation are required to take reasonable steps to destroy or permanently de-identify personal info if its no long needed for any purpose.
- Under the **Public Records Act**, public records cannot be destroyed unless authorised by the **Public Records Office Victoria (PROV)**, which will be classified under one of the following authorisations:
    - Normal Administrative Practice (NAP)
    - Retention and Disposal Authority (RDA)
    - Single Instance Disposal Authority (SIDA)
- **Degaussing** (magnetic media): removing the data by demagnetising the media
## Encryption
- **Symmetric Encryption**: also known as **private-key**, this uses a single password to encrypt and decrypt data. Communicating parties must have the same key
- **Asymmetric Encryption**: also known as **public-key**, uses two keys for encryption and decryption. A public key, which is shared among users and encrypts the data. A private key decrypts the data and only the receiving party has access
- **SSL (Secure* Socket Layer)** and **TLS (Transport Layer Security)**, are protocols for establishing authenticated and encrypted links between networked computers
## Social Engineering
- Under the **Privacy Act 1988** phishing attacks are classified into the following:
    - **Phishing Attacks** are where confidential information is stolen by broadly sending fraudulent messages to victims
    - **Spear Phishing Attacks** are social engineering attacks used to target individuals with personalised bait messages based on public information
- **Proactive** awareness training is used to prevent an attack, whereas **Reactive** incident training teaches a plan of action in case of an attack
- **Baiting**: offering a user something in exchange for credentials or sensitive data
- **Quid Pro Quo**: requesting credentials or sensitive data in exchange for a service
- **Pretexting**: creating a false trust with a victim to gain login credentials
- **Tailgating / Piggybacking**: physically following an authorised person into a secure area
<div style="page-break-after: always;"></div>
## Security Controls
- **Preventative** security controls: designed to prevent cyber security incidents
- **Detective** security controls:  detecting a cyber security breach attempt or successful breach while it is in progress
- **Corrective** security controls: used after an incident to minimise data loss, damage to systems and restore critical systems as quickly as possible.
- **Physical Controls** include anything that's used to prevent or detect unauthorised access to physical areas, systems, or assets
- **Software Controls** include software mechanisms used to protect assets
- **Administrative Controls** are policies, procedures, or guidelines that define personnel or business practices in accordance with the organisations security goals
## Secure Development
- **Development Environments**: segregating development, testing and production environments can limit the spread of malicious code
- **Secure Software Design**: threat modelling is an important part of secure software design, used to identify at risk components of software
- **Secure Programming Practices**: once a secure software design has been identified, secure practices must be followed throughout development activities
- **Software Testing**: release candidates must be thoroughly and dynamically tested / scanned for vulnerabilities before reaching production
- **Vulnerability Disclosure Program**: implementing a program for users to responsibility report vulnerabilities can be used to proactively address insecure components of a system
## Types of Tests
- **Unit Testing:** Testing individual components or functions in isolation to ensure they work as intended
- **Integration Testing:** Testing interactions between different components or modules to ensure they integrate correctly
- **User Acceptance Testing (UAT):** Involves end-users testing the software to ensure it meets their final needs and expectations
- **Penetration testing**, also known as pen test, identifies security vulnerabilities in web applications, achieved by challenging each component of a system
- **Scenario-based Testing:** Creating test cases that mimic real-world scenarios to validate that the software functions as expected. 
- **White-box Testing:** functionality tests that ensure every possible path is covered
- **Black-box Testing:** Testing the software without knowledge of its internal logic, focusing on validating functionality from a user's perspective. 

- **Fuzzing**: a black-box testing technique, which consists of finding implementation bugs using malformed/semi-malformed data injection in an automated fashion
- **Software Instrumentation**: involves adding extra code to an application to monitoring behaviour, often used to debug performance
## AppSec Testing Tools
- **Static Application Security Testing (SAST)**: tools to analyse source code and prevent vulnerabilities, this is used in a white-box approach 
- **Dynamic Application Security Testing (DAST)**: also known as **vulnerability scanners** these tools attempt attacks in a black-box approach
- **Interactive Application Security Testing (IAST)**: testing that's conduced from within the app in development to analyse logic vulnerabilities 
- **Run-time Application Security Protection (RASP)**: run from within the application at production run-time, this responds to and defends live attacks.
## Evaluating & Auditing Strategies
- To evaluate security strategies used to treat risks, the following must be considered before implementation:
    - **Identify Objectives**: the risk's environment must first be clearly set in order to create a list of measurable goals in its prevention
    - **Current Capabilities**: understand to what extent the set objectives are already being met and does not require improvement
    - **Areas for Improvement**: identifying what new capabilities are required and must be implemented to satisfy all objectives of the business
- A typical software **Audit** process will usually:
    - document all uses and demands of the software 
    - test the software for standards compliance, also known as pen testing 
    - identify assets necessary for the operation of the software
    - identify security configurations and compare with acceptable settings 
    - consider levels of user training necessary for the operation of the software.