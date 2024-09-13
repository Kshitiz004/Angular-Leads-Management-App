import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../api.service';  // Adjust the path as necessary
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {
  leads = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [
    'select',
    'leadId',
    'prospectName',
    'phone',
    'email',
    'college',
    'course',
    'applicationForm',
    'lastOutgoing',
    'lastOutgoingCallStatus',
    'lastOutgoingCallAt',
    'lastActivity',
    'leadPriority',
    'instanceType',
    'leadInstanceSource',
    'leadType',
    'leadOwnerAssignmentAge',
    'leadOwner',
    'action'
  ];
  selectedLeads: Set<any> = new Set();

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getLeads();
  }

  getLeads() {
    const token = localStorage.getItem('token');
    if (token) {
      this.apiService.getLeads(token).subscribe({
        next: (response: any) => {
          this.leads.data = response.data;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Failed to fetch leads', error);
          // Handle error (show message to user)
        }
      });
    } else {
      console.error('No token found');
      // Handle case when no token is available
    }
  }

  toggleAllRows(event: MatCheckboxChange) {
    if (event.checked) {
      this.leads.data.forEach(lead => this.selectedLeads.add(lead));
    } else {
      this.selectedLeads.clear();
    }
  }

  toggleRow(lead: any) {
    if (this.selectedLeads.has(lead)) {
      this.selectedLeads.delete(lead);
    } else {
      this.selectedLeads.add(lead);
    }
  }
}
