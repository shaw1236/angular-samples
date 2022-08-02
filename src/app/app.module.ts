import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table' 
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';

import { AppComponent } from './app.component';

// Providers
import { AuthGuard } from './service/auth.guard';
import { UserService } from './service/user.service';
import { HttpHeaderInterceptor } from "./service/http.interceptor";
import { NotificationService } from "./service/notification.service";

// Declarations
import { AfterContentParentComponent } from './lifecycle-hook/after-content-parent.component';
import { AfterContentComponent } from './lifecycle-hook/after-content.component';
import { ChildComponent } from './lifecycle-hook/child.component';

import { AfterViewParentComponent } from './lifecycle-hook/after-view-parent.component';
import { AfterViewComponent } from './lifecycle-hook/after-view.component';
import { ChildViewComponent } from './lifecycle-hook/child-view.component';

import { CounterParentComponent } from './lifecycle-hook/counter-parent.component';
import { MyCounterComponent } from './lifecycle-hook/counter.component';

import { DoCheckParentComponent } from './lifecycle-hook/do-check-parent.component';
import { DoCheckComponent } from './lifecycle-hook/do-check.component';

import { OnChangesParentComponent } from './lifecycle-hook/on-changes-parent.component';
import { OnChangesComponent } from './lifecycle-hook/on-changes.component';

import { PeekABooParentComponent } from './lifecycle-hook/peek-a-boo-parent.component';
import { PeekABooComponent } from './lifecycle-hook/peek-a-boo.component';

import { SpyParentComponent } from './lifecycle-hook/spy.component';
import { SpyDirective } from './lifecycle-hook/spy.directive';

import { TableTestExampleComponent } from './table-test/table-test-example.component';

import { HighlightDirective } from './directive/highlight.directive';
import { UnlessDirective } from './directive/unless.directive';

import { DirectiveTestExampleComponent } from './directive-test/directive-test-example';

import { ContentChildTestExampleComponent, TabExamampleComponent, PaneDirective } from './directive-test/contentchild-test-example';
import { CustomPipe, SquarePipe, PowerPipe, FullNamePipe, JsonPipe, DatePipe } from './pipe/custom-test-pipe';
import { PipeTestExampleComponent } from './pipe-test/pipe-test-example';

// Data share between parent and child components
import { ParentComponent } from './share-data/parent.component';
import { AliasingComponent } from './share-data/aliasing/aliasing.component';
import { InTheMetadataComponent } from './share-data/in-the-metadata/in-the-metadata.component';
import { InputOutputComponent } from './share-data/input-output/input-output.component';
import { ItemDetailComponent } from './share-data/item-detail/item-detail.component';
import { ItemOutputComponent } from './share-data/item-output/item-output.component';

// Async 
import { AsyncTestExampleComponent } from './async/async-test-eample';

// Form
import { FormTestExampleComponent } from './form-test/fom-test-example';

// Dialog
import { DialogAnimationsExample, DialogAnimationsExampleDialog, ConfirmationDialogComponent } from './service/dialog-animations-example';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatChipsModule
  ],
  declarations: [
    AppComponent,
    AfterContentParentComponent,
    AfterContentComponent,
    ChildComponent,
    AfterViewParentComponent,
    AfterViewComponent,
    ChildViewComponent,
    CounterParentComponent,
    MyCounterComponent,
    DoCheckParentComponent,
    DoCheckComponent,
    OnChangesParentComponent,
    OnChangesComponent,
    PeekABooParentComponent,
    PeekABooComponent,
    SpyParentComponent,
    SpyDirective,
    TableTestExampleComponent,
    HighlightDirective, UnlessDirective,
    DirectiveTestExampleComponent,
    ContentChildTestExampleComponent,
    TabExamampleComponent, 
    PaneDirective,
    CustomPipe, SquarePipe, PowerPipe, FullNamePipe, JsonPipe, DatePipe,
    PipeTestExampleComponent,
    ParentComponent,
    AliasingComponent,
    InTheMetadataComponent,
    InputOutputComponent,
    ItemDetailComponent,
    ItemOutputComponent,
    AsyncTestExampleComponent,
    FormTestExampleComponent,
    DialogAnimationsExample, DialogAnimationsExampleDialog, ConfirmationDialogComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpHeaderInterceptor,
    multi: true,
  }, NotificationService, UserService, AuthGuard
],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
