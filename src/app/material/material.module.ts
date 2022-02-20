import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule} from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatDividerModule} from '@angular/material/divider';
import { MatSelectModule} from '@angular/material/select';
import { MatCardModule} from '@angular/material/card';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatStepperModule} from '@angular/material/stepper';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule }  from '@angular/material/sidenav'; 
import { MatTableModule }  from '@angular/material/table';
import { MatPaginatorModule }  from '@angular/material/paginator';
import { MatSortModule }  from '@angular/material/sort';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { MatDatepickerModule} from '@angular/material/datepicker';
//import { MatNativeDateModule } from '@angular/material'
import { MatExpansionModule} from '@angular/material/expansion';
import { MatBadgeModule} from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule} from '@angular/material/toolbar';
import { ScrollingModule} from '@angular/cdk/scrolling';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';  //can be remove

//import { MaterialDesignModule } from '../material-design/material-design.module';


const MaterialComponents = [  
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatTableModule,
  MatSnackBarModule,
  MatPaginatorModule,
  MatDialogModule,     
  MatTabsModule,
  MatInputModule,
  MatFormFieldModule,
  MatSlideToggleModule,
  MatDividerModule,
  MatSelectModule,
  MatCardModule,
  MatGridListModule,
  MatStepperModule,
  MatButtonToggleModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatBadgeModule ,
  MatSortModule,
  MatMenuModule,
  MatToolbarModule,
  ScrollingModule,
  MatTooltipModule,
  MatRadioModule,
  MatProgressBarModule,
  MatListModule

  ]

@NgModule({  
  imports: [MaterialComponents],
  exports:[MaterialComponents]
})

export class MaterialModule { }
