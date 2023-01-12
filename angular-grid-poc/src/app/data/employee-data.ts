import { Employee, iEmployee } from "../model/employee";

export const EMPLOYEELIST: iEmployee[] =[{"id":1,"first_name":"Gerhardine","last_name":"Bielfeld","email":"gbielfeld0@webs.com","gender":"Female","ip_address":"227.206.230.166"},
{"id":2,"first_name":"Haily","last_name":"Gulleford","email":"hgulleford1@skype.com","gender":"Female","ip_address":"105.128.144.119"},
{"id":3,"first_name":"Bernete","last_name":"Simmon","email":"bsimmon2@cbslocal.com","gender":"Female","ip_address":"60.2.243.164"},
{"id":4,"first_name":"Juieta","last_name":"Ceschini","email":"jceschini3@bizjournals.com","gender":"Female","ip_address":"212.64.166.170"},

{"id":425,"first_name":"Daryl","last_name":"Manuelli","email":"dmanuellibs@google.cn","gender":"Male","ip_address":"28.248.232.53"},
{"id":426,"first_name":"Gerti","last_name":"Berthomier","email":"gberthomierbt@comcast.net","gender":"Female","ip_address":"24.141.226.247"},
{"id":427,"first_name":"Maxie","last_name":"Eicke","email":"meickebu@alexa.com","gender":"Female","ip_address":"255.53.147.204"},

{"id":978,"first_name":"Evvie","last_name":"Ewers","email":"eewersr5@guardian.co.uk","gender":"Non-binary","ip_address":"75.4.147.58"},
{"id":979,"first_name":"Vladamir","last_name":"Berrecloth","email":"vberreclothr6@histats.com","gender":"Male","ip_address":"203.16.213.229"},
{"id":980,"first_name":"Daphene","last_name":"Bente","email":"dbenter7@census.gov","gender":"Female","ip_address":"149.109.76.160"},
{"id":981,"first_name":"Madelina","last_name":"Hellicar","email":"mhellicarr8@weebly.com","gender":"Female","ip_address":"205.163.203.152"},

{"id":996,"first_name":"Bendicty","last_name":"Baumadier","email":"bbaumadierrn@cargocollective.com","gender":"Male","ip_address":"126.215.247.167"},
{"id":997,"first_name":"Editha","last_name":"Schaffler","email":"eschafflerro@imgur.com","gender":"Female","ip_address":"241.171.124.241"},

{"id":1000,"first_name":"Latia","last_name":"Coupe","email":"lcouperr@bloglovin.com","gender":"Female","ip_address":"35.137.139.135"}]

export const EMPLOYEES: Employee[] = EMPLOYEELIST.map(emp=> new Employee(emp));