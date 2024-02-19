import { JobsService } from './../services/jobs.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
})
export class JobListComponent implements OnInit {
  jobs!: any[];
  filteredJobs!: any[];
  categories!: string[];
  selectedCategory!: string;

  constructor(
    private router: Router,
    private JobsService: JobsService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getJobs();
    this.categories = ['All', 'Full Stack', 'Front End'];
    this.selectedCategory = 'All';
  }

  AddJob() {
    this.router.navigate(['admin']);
  }

  getJobs() {
    this.JobsService.getJobs().subscribe((jobs) => {
      this.jobs = [];
      if (jobs) {
        Object.keys(jobs).forEach((key) => {
          const job = jobs[key];
          this.jobs.push({ key, ...job });
          this.filteredJobs = this.jobs;
        });
      }
    });
  }

  filterJobs(category: string) {
    this.selectedCategory = category;
    if (category === 'All') {
      this.filteredJobs = this.jobs;
    } else {
      this.filteredJobs = this.jobs.filter((job) => job.position === category);
    }
  }

  updateJob(key: string) {
    this.router.navigate(['admin'], {
      queryParams: {
        key: key,
      },
    });
  }

  deleteJob(key: string) {
    this.JobsService.deleteJob(key).subscribe((response) => {
      this.getJobs();
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
