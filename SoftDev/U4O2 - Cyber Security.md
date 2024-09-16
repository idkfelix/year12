## Software
- **Types of Software**
	- Systems software: an operating system or device driver
	- Programming software: tools for writing software, IDE, GCC, etc.
	- Applications: programs / websites which help users complete tasks
	- Embedded Software: used to control machines and devices

- **Reasons for Development**
	- Custom software: created to meet the specific needs of a user
	- Commercial & OSS: made to meet a broad set of *perceived* needs of potential users
	- Personal: created to automate mundane tasks or entertainment or educational purposes

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

- **Preventing data breaches** is advised by the **Australian Cyber Security Center** to use strong password protection strategies and raise staff awareness on the importance of protecting credentials.
- The **ACSC** state that credentials are typically stolen when:
	- A user is tricked into entering their credentials into a dummy website
	- A brute force attack is performed against a service that doesn't enforce minimum password requirements
	- A service is compromised and credentials are stolen and tested across many sites
	- A users system is compromised by malware designed to steal credentials
- Under the **Privacy Act 1988** a
- **Phishing Attacks** are where confidential information is stolen by sending fraudulent messages to victims
