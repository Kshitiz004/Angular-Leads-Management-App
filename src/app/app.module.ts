import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ToastModule } from 'primeng/toast';
import { ToastrModule } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { LeadsComponent } from './leads/leads.component';
import { TableModule } from 'primeng/table'; // Import TableModule
import { CheckboxModule } from 'primeng/checkbox';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LeadsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    AppRoutingModule,
    MatIconModule,
    MatSelectModule,
    MatPaginatorModule,
    ToastModule,
    TableModule,
    CheckboxModule,
    MatCheckboxModule,
    MatSliderModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing'
    }),
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

