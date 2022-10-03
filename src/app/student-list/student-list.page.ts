//student-list.page.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { AlertController } from "@ionic/angular";


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.page.html',
  styleUrls: ['./student-list.page.scss'],
})
export class StudentListPage implements OnInit {

  studentsData: any;
  id: string;

  constructor(public alertController: AlertController,public router: Router,public apiService: ApiService) {
    this.studentsData = [];
  }

  ngOnInit() {
    // this.getAllStudents();
  }

  ionViewWillEnter() {
    // Used ionViewWillEnter as ngOnInit is not
    // called due to view persistence in Ionic
    this.getAllStudents();
  }

  getAllStudents() {
    //Get saved list of students
    this.apiService.getList().subscribe(response => {
      console.log(response);
      this.studentsData = response;
    });
  }

  async presentAlert(item) {
    const alert = await this.alertController.create({
      message: item.id + 'Are Sure Want To Delete?',
    });

    await alert.present();
  }

  delete(item) {
    this.presentAlert(item);
    //Delete item in Student data
    this.apiService.deleteItem(item.id).subscribe(response => {
      //Update list after delete is successful
      this.getAllStudents();
    });

  }

  update(item){
    // this.router.navigate(['student-edit/'+this.id]);
    this.router.navigate(['/student-edit/'+item.id]);
  }

}
