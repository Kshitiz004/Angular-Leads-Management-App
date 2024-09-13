import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
  platformBrowser: boolean;

  constructor(
    private apiService: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.platformBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.getLeads();
  }

  getLeads() {
    if (this.platformBrowser) {
      const token = localStorage.getItem('token');
      if (token) {
        this.apiService.getLeads(token).subscribe({
          next: (response: any) => {
            if (response && Array.isArray(response.data)) {
              this.leads.data = response.data;
            } else {
              console.error('Unexpected response format', response);
            }
          },
          error: (error: HttpErrorResponse) => {
            console.error('Failed to fetch leads', error);
          }
        });
      } else {
        console.error('No token found');
      }
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
