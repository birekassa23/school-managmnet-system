

#*******************************************************Used in Log In form***************************************************
 
 SELECT * from login where email='$email' AND password='$pass'";

 #***********************************************************Admission Form******************************************
            
            $query="SELECT * from Parent where (FATERCNIC='$fatherCNIC' AND MOTHERCNIC='$motherCNIC')";
            $query="SELECT * from Parent where (FATHERPHONENO='$fatherContact' AND MOTHERPHONENO='$motherContact' AND FATERCNIC='$fatherCNIC' AND MOTHERCNIC='$motherCNIC')";
            $guad="SELECT parentid from parent where FATHERPHONENO='$fatherContact' AND MOTHERPHONENO='$motherContact' AND FATERCNIC='$fatherCNIC' AND MOTHERCNIC='$motherCNIC'";
            $query="INSERT into guardian values('$maximumGuard','$guardianName','$guardianContact','$guardianCNIC','$guardianGender','$systemDate')";
            $query="INSERT into fee(VOUCHERNO , fee ,discount, discountreason,EDATE,fullypaid) values('$voucherNo','$fee','$discount','$reason','$systemDate','$paid')";
            $query="INSERT into student(NAME , gender , DOB, EDATE, studentid , parentid, guardianid, relationwithguardian) values('$NameS','$studentGender','$studentDOB','$systemDate','$maximumStudent','$parentIDExisting','$maximumGuard','$guardianRelation')";
            $query="INSERT into guardian values('$maximumGuard','$guardianName','$guardianContact','$guardianCNIC','$guardianGender','$systemDate')";              
            $query="INSERT into parent values('$maximumParent','$motherCNIC','$motherName','$systemDate','$motherEmail','$motherAddress','$motherContact','$fatherCNIC','$fatherName','$fatherAddress','$fatherContact','$fatherEmail')";
            $query="INSERT into fee(VOUCHERNO , fee ,discount, discountreason,EDATE,fullypaid) values('$voucherNo','$fee','$discount','$reason','$systemDate','$paid')";
            $query="INSERT into student(NAME , gender , DOB, EDATE, studentid , parentid, guardianid, relationwithguardian) values('$NameS','$studentGender','$studentDOB','$systemDate','$maximumStudent','$maximumParent','$maximumGuard','$guardianRelation')";

                $guad="SELECT MAX(guardianid)+1 as gmaximum from guardian";
                $parent="SELECT max(parentid)+1 as pmaximum from parent";
                $student="SELECT max(studentid)+1 as smaximum from student";
                $student="SELECT max(voucherno)+1 as smaximum from fee";
               $student="SELECT sysdate from dual";             

               
 #***********************************************************Admission Form******************************************








// for form 15

select student.name as STUDENT,classsection.class as CLASS, classsection.section as SECTION ,(select guardian.name 
                                                                                              from guardian 
                                                                                              where guardianid = student.guardianid ) as  GUARDIAN
from student
inner join registration
on registration.studentid = student.studentid
inner join classsection
on registration.classsectionid = classsection.classsectionid
and student.parentid = 2; // here last 1 is actually parent id change it according to condition.

select student.name , classsection.class as CLASS , classsection.section as SECTION, (select guardian.name 
                                                                                              from guardian 
                                                                                              where guardianid = student.guardianid ) as  GUARDIAN
from parent 
inner join student
on parent.parentid = student.parentid
inner join registration
on registration.studentid = student.studentid
inner join classsection
on classsection.classsectionid = registration.classsectionid
and (fathername = 'Aiza' or mothername = 'Aiza');// Change name AIZA to any name to get results required


//for from  12


select max(classsection.class) as CLASS, max(classsection.section) as SECTION  , count( registration.classsectionid )  as STUDENTCOUNT
from registration
inner join classsection
on registration.classsectionid = classsection.classsectionid
group by registration.classsectionid
order by registration.classsectionid;







