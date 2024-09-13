import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../api.service';  // Adjust the path as necessary
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getLeads();
  }

  getLeads() {
    const token = localStorage.getItem('token');
    if (token) {
      this.apiService.getLeads(token).subscribe({
        next: (response: any) => {
          if (response && response.data && Array.isArray(response.data)) {
            this.leads.data = response.data;
          } else {
            console.error('Unexpected response format', response);
            this.snackBar.open('Unexpected response format. Please try again later.', 'Close', { duration: 5000 });
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Failed to fetch leads', error);
          this.snackBar.open('Failed to fetch leads. Please try again later.', 'Close', { duration: 5000 });
        }
      });
    } else {
      console.error('No token found');
      this.snackBar.open('No authentication token found. Please log in again.', 'Close', { duration: 5000 });
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

  // Method to handle the action on selected leads
  handleSelectedLeadsAction() {
    if (this.selectedLeads.size > 0) {
      // Implement the action you want to perform on selected leads
      console.log('Performing action on selected leads', Array.from(this.selectedLeads));
      // Show success message or notification
      this.snackBar.open('Action performed successfully.', 'Close', { duration: 3000 });
    } else {
      this.snackBar.open('No leads selected. Please select leads to perform the action.', 'Close', { duration: 5000 });
    }
  }
}
