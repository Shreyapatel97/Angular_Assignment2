import { JobsService } from './../services/jobs.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  jobForm!: FormGroup;
  JobDetail: any;
  key:any;
  constructor(
    private formBuilder: FormBuilder,
    private jobsService: JobsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.key =params['key'];
      this.jobsService.getJobById(this.key).subscribe(
        (job) => {
          if (this.key) {
            this.JobDetail = job;
          }
          console.log('Job:', this.JobDetail);
          this.jobForm = this.formBuilder.group({
            title: [
              this.key ? this.JobDetail.title : '',
              Validators.required,
            ],
            position: [
              this.key ? this.JobDetail.position : '',
              Validators.required,
            ],
            location: [
              this.key ? this.JobDetail.location : '',
              Validators.required,
            ],
            salary: [
              this.key ? this.JobDetail.salary : '',
              Validators.required,
            ],
            company: [
              this.key ? this.JobDetail.company : '',
              Validators.required,
            ],
          });
        },
        (error) => {
          console.log('Error fetching job:', error);
        }
      );
    });
    this.jobForm = this.formBuilder.group({
      title: [this.JobDetail ? this.JobDetail.title : '', Validators.required],
      position: [
        this.JobDetail ? this.JobDetail.position : '',
        Validators.required,
      ],
      location: [
        this.JobDetail ? this.JobDetail.location : '',
        Validators.required,
      ],
      salary: [
        this.JobDetail ? this.JobDetail.salary : '',
        Validators.required,
      ],
      company: [
        this.JobDetail ? this.JobDetail.company : '',
        Validators.required,
      ],
    });
  }

  onSubmit() {
    if (this.jobForm.valid) {
      console.log(this.jobForm.value);
      if (this.key) {
        this.jobsService
          .updateJob(this.key, this.jobForm.value)
          .subscribe((response) => {
            console.log('Job updated successfully');
            this.router.navigate(['job-list']);
          });
      } else {
        this.jobsService.addJob(this.jobForm.value).subscribe((response) => {
          console.log('Job added successfully');
          this.router.navigate(['job-list']);
        });
      }
    } else {
      alert('Form is invalid');
    }
  }
}
