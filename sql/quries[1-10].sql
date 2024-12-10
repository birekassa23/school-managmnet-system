//1
select * from student;

//2
select mothername as mother,fathername as spouse from parent;

//3
select guardian.name as guardian,student.name as student,student.relationwithguardian as RELATION 
from student 
inner join guardian
on guardian.guardianid = student.studentid;

//4
select p.mothername as MOTHER ,p.fathername as FATHER , s.name as STUDENT
from student s, parent p
where s.parentid = p.parentid;

//5
select s1.name,s2.name as SIBILING,cs.class,cs.section
from student s1
left join student s2
on s1.parentid = s2.parentid
and s1.name != s2.name
inner join registration r
on s1.studentid = r.studentid
inner join registration r1
on s2.studentid = r1.studentid 
and r.classsectionid = r1.classsectionid
inner join classsection cs
on cs.classsectionid = r.classsectionid;

//6
//while igroring new admissions
select student.name,sectionchange.oldsection,sectionchange.newsection, sectionchange.edate as SECTIONCHANGEDATE
from sectionchange
inner join student
on sectionchange.studentid = student.studentid
and sectionchange.edate >= to_date('02-jun-20','DD-MON-YY')
and sectionchange.edate <= to_date('05-jun-20','DD-MON-YY');



//7
select * 
from student 
where edate <= to_date( '04-jun-20','DD-MON-YY' )
and edate >=  to_date( '02-jun-20','DD-MON-YY' ) ; //  select date to desired values (assuming that these new stuudents have not registered yet)

//8
select parent.mothername,parent.fathername,student.name as STUDENTNAME
from parent
inner join student
on student.parentid= parent.parentid
and parent.edate <= to_date( '04-jun-20','DD-MON-YY' )
and parent.edate >=  to_date( '02-jun-20','DD-MON-YY' ) ; //  select date to desired values (here name of parents will repeat if they admit more than 1 student)

//9
select student.name as STUDENT, round((sysdate-student.dob)/365.2425,2) as AGE, parent.mothername as MOTHERNAME, parent.fathername as FATHERNAME 
from student
inner join parent
on parent.parentid = student.parentid
and (sysdate-student.dob)/365.2425 < 5;//here channge value 5 to any early introducer age.

//10
///while igroring new admissions
select student.name,sectionchange.oldsection,sectionchange.newsection, sectionchange.edate as SECTIONCHANGEDATE
from sectionchange
inner join student
on sectionchange.studentid = student.studentid
and student.studentid = '8'// change this last 8 to required student id.