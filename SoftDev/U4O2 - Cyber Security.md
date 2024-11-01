## Data Characteristics
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
## Software Characteristics
- **Types of Software**
	- Systems software: an operating system or device driver
	- Programming software: tools for writing software, IDE, GCC, etc.
	- Applications: programs / websites which help users complete tasks
	- Embedded Software: used to control machines and devices

- **Reasons for Development**
	- Custom software: created to meet the specific needs of a user
	- Commercial & OSS: made to meet a broad set of *perceived* needs of potential users
	- Personal: created to automate mundane tasks or entertainment or educational purposes
## Organisations
- **Goals**: used by organisations to state long term intentions or purposes
- **Objectives**: define shorter term measurable actions or tasks that contribute to these set goals

- Organisations must decide **which types of software are required** to support the business based on many factors:
	- If generic commercial / OSS will cover their use case?
	- Must custom software be developed for their requirements?
	- Does the chosen software sufficiently meet their security standards?
	
- Use of software can **enhance business processes** by:
	- improving productivity through increased efficiency and quality
	- managing information to enhance decision making 
	- cost reduction by improving efficiency and automating processes
	- facilitating collaboration with remote teams
	- accelerating growth by enabling innovation and integration 
	- improving sales and customer service
	- increasing engagement and communication with customers
## Data Integrity
- Data integrity relates to data being **Valid, Accurate and Consistent**
- Has two different meanings
	- As a **state** defines a data set that is both valid and accurate
	- As a **process** it describes measures used to ensure validity and accuracy of a data set.
	
- **Secure Information** process characteristics
	- **Protected**: user authentication, passwords, firewalls, anti-malware and physical protections should be in place to restrict access to data.
	- **Confidential**: per the privacy and protection act 2014, sensitive information should only be made available on a need to know basis
	- **Risk Managed**: backups should be taken regularly in case of data loss, safety equipment such as ventilation, fire extinguishers and alarms should be used in data centres to prevent catastrophic data loss.
## Back Ups
- **The 3-2-1 Rule** is the most well known and recommended back up strategies
	- Keep at least three copies of any important data, the original and two backups
	- Keep the files or data on two different media types
	- Keep one copy offsite
- Over time an improved model of the 3-2-1 rule has been developed
	- Keep at least three copies of any important files or data
	- Keep the files or data on two different media types
	- Keep one copy offsite and offline
	- Keep one copy offsite in the cloud
	
- The Australian government recommends the **Essential Eight Maturity Model**. All businesses should be aiming for maturity level three
- **Level 1**
	- Backups of important information, software and configuration settings are performed monthly
	- Backups are stored for between one to three months
	- Partial restoration of backups is tested at least once a year
- **Level 2**
	- Backups of important information, software and configuration settings are performed weekly
	- Backups are stored offline, or online but in a non-rewritable and non-erasable manner.
	- Partial restoration of backups is tested on a bi-annual or more frequent basis
	- Full restoration of backups is tested at least once when initially implemented
- **Level 3**
	- Backups of important information, software and configuration settings are performed at least daily
	- Full restoration of backups is tested at least once when initially implemented and each time fundamental information technology infrastructure changes occur
	- Partial restoration of backups is tested on a quarterly or more frequent basis
## Archiving Data
- Data that is important, but doesn't need to be accessed frequently can be archived
- Whereas backups are created for data recovery purposes, archives are designed for long-term storage of data and is not intended as a recovery mechanism.
- Data archiving involves identifying data that is no longer active and moving it to long term storage systems.
- This data is often retained to meet regulatory requirements.
## Data Disposal
- Data disposal refers to to the destruction, transfer, damage or alteration of data
- According to the **Victorian Information Privacy Principles**, organisation are required to take reasonable steps to destroy or permanently de-identify personal info if its no long needed for any purpose.

- Under the **Public Records Act**, public records cannot be destroyed unless authorised by the **Public Records Office Victoria (PROV)**, which will be classified under one of the following authorisations:
	- Normal Administrative Practice (NAP)
	- Retention and Disposal Authority (RDA)
	- Single Instance Disposal Authority (SIDA)
- the NAP disposal is used by organisations to destroy certain records as apart of normal day to day practices that does not require further authorisation:
	- Transitory messages, for example, calendars, personal emails
	- Rough working papers, for example or rough meeting notes.
	- Drafts not intended for further reference, in paper or electronic form
	- Copies retained for reference purposes only
	- Published material not included in the organisation’s records.

- Physical data such as papers, photographs and films can be destroyed with the following methods:
	- Shredding: normal office shredding or cross shredding for sensitive documents
	- Pulping: pulped paper is reduced to fibres
	- Burning: only used as a last resort in an appropriate industrial facility
- Digital data deletion is more complex as traditional deletion only removes the file drives pointer to the data, hence sanitisation is required for permanent deletion:
	- Clearing: writing nonsensical data to a drive to bury sensitive or important data
	- Purging: writing random data over the entire drive to protect from a lab attack
	- Degaussing (magnetic media): removing the data by demagnetising the media 
	- Destruction: the most extreme form ensures media is drastically altered and can never by reused by physically destroying the storage media
## Data Breaches
- A data breach is when private, sensitive, protected or confidential information is exposed to, copied by, transmitted to, shared with, or stolen by an unauthorised person
- **Fax Machines**: still used in the health industry, if a number is dialled wrong or a previous fax is forgotten, data could be transmitted to an unauthorised person.
- **Email**: email addresses can easily be mistyped leading to private or sensitive data being misdirected to an unauthorised person
- **IoT**: these devices can be exploited due to weak credentials or insecure software
- **Invoice Scamming**: impersonating a business or intercepting emailed invoices with altered banking details to steal payments from customers
- **MitM**: man in the middle attacks impersonate both victimised parties acting as if they are each of the intended recipients to relay malicious data
	- MitM attacks often use SSL striping to downgrade victims certificates
	- Evil twin attacks are impersonate a secure network to monitor victims traffic
- Some common types of MitM attacks include:
	- Email Hijacking: using a compromised email account to mislead adjacent parties
	- Wi-Fi Eavesdropping: passive traffic monitoring on an open network
	- Session Hijacking: using a stolen session authentication for a web service
	- DNS Spoofing: poisoning a target networks DNS records to redirect victims
	- IP Spoofing: posing as a victims target IP address on the network to intercept data
	- Email Spoofing: forging email headers to mislead targeted victims by taking advantage of unenforced DKIM or SPF records.
	- Caller ID Spoofing: although legal in Australia, scammers can use caller ID spoofing to mislead targeted victims
- To prevent MitM attacks, organisations can implement rigid email security solutions, force SSL on all requests, educate employees on the attacks and rotate credentials.
## Mitigating Data Breaches
- **Preventing data breaches** is advised by the **Australian Cyber Security Center** to use strong password protection strategies and raise staff awareness on the importance of protecting credentials.
- The **ACSC** state that credentials are typically stolen when:
	- A user is tricked into entering their credentials into a dummy website
	- A brute force attack is performed against a service that doesn't enforce minimum password requirements
	- A service is compromised and credentials are stolen and tested across many sites
	- A users system is compromised by malware designed to steal credentials
- Under the **Privacy Act 1988** phishing attacks are classified into the following:
	- **Phishing Attacks** are where confidential information is stolen by broadly sending fraudulent messages to victims
	- **Spear Phishing Attacks** are social engineering attacks used to target individuals with personalised bait messages based on publicly available information.
- To mitigate data breaches from **poor password management** the ACSC advise the following:
	- Regular rotation of credentials
	- Using long complex passwords
	- Implementing a lockout for multiple failed logins
	- Discourage the reuse of passwords across services
	- Discourage passwords made up of dictionary terms
	- Not using a pattern across new passwords
- To mitigate data breaches from **cyber security incidents** the ACSC advise the following:
	- Use multi-factor authentication for all remote access to business systems
	- Look out for unusual account activity or suspicious logins
	- Encourage users to think carefully before entering credentials
	- Keep OS, browser and plugins up to date
	- Enabling anti-virus protections
## Social Engineering
- **Baiting**: offering a user something enticing in exchange for credentials or sensitive data
- **Quid Pro Quo**: requesting credentials or sensitive data in exchange for a service
- **Pretexting**: creating a false trust with a victim to gain login credentials
- **Tailgating / Piggybacking**: physically following an authorised person into a secure area

- Implementing policies and procedures across an organisation can set clear guidelines to identify and prevent social engineering attacks
- Software such as email clients can help filter out social engineering attempts
- To prevent social engineering attacks security awareness training is a **Proactive Approach**, the key components of this training include:
	- Identifying / Recognising social engineering tactics
	- Understanding the risks / consequences of falling victim
	- Learning best practices for prevention
	- Implementing reporting procedures for attempted attacks
	- Regularly refreshing employees on their training
- To prepare for incidents that may occur as a **Reactive Approach**, incident response training should cover:
	- Identifying signs of an attack such as unusual system activity
	- Containment and isolation to prevent further damage
	- Evidenced collection and preservation for legal purposes
	- Notification and communication to appropriate personal
	- Remediation and recovery to restore systems to their pre-incident state
## Software Security
- The **Open Web Application Security Project (OWASP)** identify the top ten web application security risks as:
	1. Injection
	2. Broken authentication
	3. Sensitive data exposure
	4. XML external entities (XXE)
	5. Broken access control
	6. Security misconfiguration
	7. Cross-site scripting (XSS)
	8. Insecure deserialization
	9. Using component with known vulnerabilities
	10. Insufficient logging and monitoring
- **Cross Site Scripting**: XSS is a type of vulnerability in web applications that allow for users to publicly publish HTML content without proper sanitisation, creating an opportunity to publish malicious JS that executes on other users web browsers.
- Preventing XSS requires a website to escape special characters, validate input types, encode special characters and disable client side JS on published content. 
- **SQL injection**: the improper sanitisation of input fields that are used in SQL queries that allows for malicious queries to be inserted compromising a database 
## Security Controls
- Information security is aimed at protecting the assets of an organisation. This security is through various controls that can be classified into one of the following:
	- **Preventative** security controls: designed to prevent cyber security incidents
	- **Detective** security controls: aimed at detecting a cyber security breach attempt or successful breach while it is in progress and alerting appropriate personnel
	- **Corrective** security controls: used after an incident to minimise data loss, damage to systems and restore critical systems as quickly as possible.
- **Physical Controls** include anything that's used to prevent or detect unauthorised access to physical areas, systems, or assets, such as:
	- fences, gates and guards
	- security badges, access cards, biometric access controls
	- CCTV, motion sensors, surveillance cameras and security lighting
	- fire suppression and environmental controls
- **Software Controls** include software mechanisms used to protect assets, such as:
	- authentication solutions
	- firewalls and antivirus software
	- intrusion detection and protection systems
	- constrained interfaces
	- access logs and audits
	- encryption measures
- **Administrative Controls** are policies, procedures, or guidelines that define personnel or business practices in accordance with the organisations security goals. These can apply to:
	- Employee hiring and termination
	- Equipment and internet usage
	- Physical access to facilities
	- Separation of duties
	- Data classification
## Secure Software Development
- **Development Environments**: segregating development, testing and production environments can limit the spread of malicious code
- **Secure Software Design**: threat modelling is an important part of secure software design, used to identify at risk components of software
- **Secure Programming Practices**: once a secure software design has been identified, secure practices must be followed throughout development activities
- **Software Testing**: release candidates must be thoroughly and dynamically tested / scanned for vulnerabilities before reaching production
- **Vulnerability Disclosure Program**: implementing a program for users to responsibility report vulnerabilities can be used to proactively address insecure components of a system
## Encryption
- **Encryption** is the process of taking plain text and scrambling it into an unreadable format, called ciphertext
- **Symmetric Encryption**: also known as **private-key**, this uses a single password to encrypt and decrypt data. Communicating parties must both have the same key
- **Asymmetric Encryption**: also known as **public-key**, uses two keys for encryption and decryption. A public key, which is shared among users, encrypts the data. A private key decrypts the data. Only the receiving party has access to the private key.
- **Brute Force Attack**: a type of basic cryptographic attack involves trying random private keys until the correct string is found, although this is ineffective against long keys.
## SSL & TLS
- **SSL (Secure Socket Layer)** and **TLS (Transport Layer Security)**, are protocols for establishing authenticated and encrypted links between networked computers
- This works by binding each entity to cryptographic public/private key pairs
- A major flaw in SSL allowing users to fake certificate data caused the creation of is successor and replacement TLS. This was achieved by intercepting a response with a fake certificate that allowed a user to reply with his own public key and encryption for the entire session.
## Authentication & Authorisation
- **Authentication** is the process of identifying user and validating who they claim to be. This is most commonly achieved with the use of a username / password pair of credentials.
- **Single Factor**: this authentication requires a user to possess one piece of information to identify themselves to a piece of software, such as a pin or password
- **Two Factor**: requiring two pieces of information from a user to authenticate, this method vastly improves software security, commonly implemented as a one time code used to login in addition to a password or biometric authentication
- **Multi Factor**: even more secure than two factor authentication, this requires a user to provide two or more pieces of information to authenticate from different categories. these factors can include:
	- A Username and Password
	- Fingerprints or Facial Recognition
	- One Time Code
	- Limited time PIN
- **Authorisation** is the process of checking what level of access and permission a user, external service or device has
- Systems should be designed on a principle of deny by default for every resource, requiring manual approval for user access 
## Version Control
- **Version Control**, also known as **Source Control**, is a management strategy to track and store changes to software development files that follows the development project from beginning to end-of-life.
- This enables a large team of developers, designers and team members to contribute to the same project at the same time, often in separate branches on larger projects
- Version control provides a logical method that preserves the individual contributions of team members without overwriting another developers work (diff files)
- Version control systems:
	- Improve team productivity and enable collaboration
	- Enhance team communication with a reliable solution
	- Reduce development errors and conflicts
	- Reduce development time and increase successful deployments
	- Improve customer satisfaction with reliable software versions
- To effectively use version control, frequent commits should be made and documented to provide detail on a changes to the software
- Version control protects source code from both catastrophe and the casual degradation of human error and unintended consequences
- Software teams that do not use any form of version control may face problems such as:
	- not knowing which changes that have been made and available to users, or 
	- the creation of incompatible changes between two unrelated pieces of work that must then be painstakingly untangled and reworked.
## Software Updates
- A **Software Update**, sometimes called a patch is not the same as an **Upgrade**, instead it enhances the current version of the software or application
- Software update usually provides:
	- Fixes to features that are not working as intended
	- Minor bug fixes & software enhancements
	- Fixes against security issues concerns
	- Add or improve the operation of current or new hardware
- Software updates are the first line of defence against malicious actors and software 
- Patches and updates should be applied to the following:
	- Operating systems
	- Firewalls & antivirus software
	- Internet browsers
	- Device drivers & firmware
	- Applications / Desktop software
## Risk Management
- **Risk Management** is the assessment of potential dangers to an organisation, and the implementation of processes or technology to reduce those dangers.
- After a potential danger has been identified, the following steps are:
	- Identify the risks
	- Assess the risks (likelihood of occurrence and consequences)
	- Evaluate the risks (acceptable or unacceptable)
	- Treat the risks
- **Threats** in cyber security may be one of the following
	- Natural disasters
	- System failure
	- Human error
	- Adversarial threats
- **Human and adversarial threats** include:
	- Unauthorized access
	- Misuse of information
	- Data leaks
	- Loss of data
	- Service disruption
## Evaluating Security Strategies
- To evaluate security strategies used to treat risks, the following must be considered before implementation:
	- **Identify Objectives**: the risk's environment must first be clearly set in order to create a list of measurable goals in its prevention
	- **Current Capabilities**: understand to what extent the set objectives are already being met and does not require improvement
	- **Areas for Improvement**: identifying what new capabilities are required and must be implemented to satisfy all objectives of the business
- Some key aspects of this evaluation include:
	- **Threat Assessment**: considering all factors in a potential risk
	- **Risk Analysis**: evaluating the potential impact and likelihood associated with a risk
	- **Security Controls**: reviewing the mechanisms in place and their effectiveness
	- **Code Review and Analysis**: assessing code for potential variabilities
	- **Security Testing**: conducting penetration test and vulnerability scans on a system
	- **Secure Architecture**: reviewing the entire system to ensure consistent protection
	- **Secure Development**: evaluating the effectiveness and assurance of practices
	- **Third-party components**: reviewing third party code security
	- **Security Training**: reviewing the comprehension of secure practices among users
	- **Incident Response Readiness**:  assessing current procedures for an incident
	- **Compliance and Regulations**: evaluating the compliance of relevant regulations
	- **Continuous Improvement**: ensuring software is kept up to date with new threats 
## Risk Minimisation
- A **risk management strategy** is a framework or plan designed to identify, assess, and prioritise risks within development. Having a strategy alone does not manage risks
- **Techniques** that can minimise risks include:
	- a software audit to ensure software meets legal and technical requirements
	- security, vulnerability or penetration testing ensures that vulnerabilities are identified and not present on release
	- security and compliance checks ensure third-party software won’t introduce vulnerabilities
	- security coding practice training for developers minimises risk as it places security at the forefront of their minds

## Software Auditing
- **Software Auditing** assesses a pieces of software and may be conducted internally or externally so as to:
	- uncover any issues or problems early
	- improve performance, scalability and reliability 
	- review any necessary or unnecessary testing 
	- ensure the application can be maintained and extended in the future 
	- make sure you use the appropriate technology for the job 
	- satisfy legal and licensing requirements.
- A typical software audit process will usually:
	- document all uses and demands of the software 
	- test the software for standards compliance, also known as pen testing 
	- identify assets necessary for the operation of the software, including large limits 
	- identify security configurations and compare with acceptable security settings 
	- consider levels of user training necessary for the operation of the software.
## Testing Strategies
- **Unit Testing:** Testing individual components or functions in isolation to ensure they work as intended
- **Integration Testing:** Testing interactions between different components or modules to ensure they integrate correctly
- **Functional Testing:** Evaluating the software's features and functionalities to ensure they meet specified requirements
- **User Acceptance Testing (UAT):** Involves end-users testing the software to ensure it meets their final needs and expectations
- **Performance Testing:** Assessing the software's responsiveness, stability, and scalability under different conditions.
- **Penetration testing**, also known as pen test, identifies security vulnerabilities in web applications, achieved by challenging each component of a system

- Tests may fall into one of the following **approaches**:
	- **Scenario-based Testing:** Creating test cases that mimic real-world scenarios to validate that the software functions as expected. 
	- **White-box Testing:** functionality tests that ensure every possible path is covered
	- **Black-box Testing:** Testing the software without knowledge of its internal logic, focusing on validating functionality from a user's perspective. 
## Application Security (AppSec)
- **Application Security** is the process of making applications more secure by finding, fixing, and preventing vulnerabilities throughout each development stage.
- AppSec tools are usually grouped into the following categories:
	- **Static Application Security Testing (SAST)**: tools to analyse source code and prevent vulnerabilities, this is used in a white-box approach 
	- **Dynamic Application Security Testing (DAST)**: also known as **vulnerability scanners** these tools attempt attacks in a black-box approach
	- **Interactive Application Security Testing (IAST)**: testing that's conduced from within the app in development to analyse logic vulnerabilities 
	- **Run-time Application Security Protection (RASP)**: run from within the application at production run-time, this responds to and defends live attacks.
- **Fuzzing**: a black-box testing technique, which consists of finding implementation bugs using malformed/semi-malformed data injection in an automated fashion
- **Software Instrumentation**: involves adding extra code to an application to monitoring behaviour, often used to debug performance
- **Web Application Firewalls (WAFs)**: a type of firewall used to manage HTTP traffic for web applications and block malicious requests using common attacks 
## Third-Party Risk
- **Third-Party Software** includes libraries, platforms, APIs, SDKs, software tools, and applications developed by other organisations
- While you may go to great lengths to ensure the security of your own code, you cannot assume that your third-party software has been properly secured
- **Software composition analysis (SCA)**: tools that perform automated scans of an application’s code base to identify open source software usage. This checks for known vulnerabilities and compliance with dependency licencing
- Third party software components and vendors for out-sourced services, should only be given the minimum amount of sensitive data to do their job