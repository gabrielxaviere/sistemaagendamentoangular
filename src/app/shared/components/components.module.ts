import { CancelConfirmationComponent } from './cancel/cancel-confirmation.component';
import { NgModule } from "@angular/core";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { SharedModule } from "../shared.module";
import { DeleteConfirmationComponent } from "./delete/delete-confirmation.component";
import { MaterialModule } from "../material.module";

@NgModule({
  declarations: [BreadcrumbComponent, DeleteConfirmationComponent, CancelConfirmationComponent],
  imports: [SharedModule, MaterialModule],
  exports: [BreadcrumbComponent],
})
export class ComponentsModule {}
