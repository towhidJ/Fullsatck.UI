import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { Student, StudentResultView } from 'src/app/model/student.model';
import { StudentResultService } from 'src/services/student-result.service';
import { StudentService } from 'src/services/student.service';

@Component({
  selector: 'app-result-pdf',
  templateUrl: './result-pdf.component.html',
  styleUrls: ['./result-pdf.component.css'],
})
export class ResultPdfComponent implements OnInit {
  date = new Date();
  results: StudentResultView[] = [];
  students: Student[] = [];
  studentName?: string = '';
  registrationNo?: string | null;
  departmentName?: string | null;
  id: number = 0;
  cgpa: string = '';

  constructor(
    private studentResultService: StudentResultService,
    private studentService: StudentService,
    private toaster: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.params['id']);
    this.getStudent(this.id);
    this.getResult(this.id);
  }

  getStudent(id: number) {
    this.studentService.getStudentById(id).subscribe({
      next: (student) => {
        console.log(student);
        this.studentName = student.studentName;
        this.registrationNo = student.registrationNo;
        this.departmentName = student.departmentTB.departmentName;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  getResult(id: number) {
    this.studentResultService.getResultByStudentId(id).subscribe({
      next: (result) => {
        this.results = result;
        this.cgpa = this.calculatedCGPA(result);
      },
      error: (err) => {
        this.results = [];
      },
    });
  }

  calculatedCGPA(result: any) {
    var totalCredit: number = 0.0;
    var calculateGP = 0.0;
    var r = result.forEach((ele: any) => {
      totalCredit += ele.credit;
      calculateGP += ele.credit * parseFloat(ele.gp);
    });
    return (calculateGP / totalCredit).toFixed(2);
  }

  public convertToPDF() {
    html2canvas(document.getElementById('wrapper')!).then((canvas) => {
      // Few necessary setting options

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var width = pdf.internal.pageSize.getWidth();
      var height = (canvas.height * width) / canvas.width;
      pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height);
      pdf.save(this.registrationNo + '.pdf'); // Generated PDF
    });
  }
}
