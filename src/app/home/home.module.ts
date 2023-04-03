import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { ToolsPage } from './tools/tools.page';
import { HomePageRoutingModule } from './home-routing.module';
import { MyWorkPage } from './my-work/my-work.page';
import { WorkHistoryPage } from './work-history/work-history.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage,ToolsPage,MyWorkPage,WorkHistoryPage]
})
export class HomePageModule {}
