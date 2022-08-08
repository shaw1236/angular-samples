import { Component, OnInit } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { UserService } from '../service/user.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-spin-test',
  templateUrl: './spin-test.component.html',
  styleUrls: ['./spin-test.component.scss']
})
export class SpinTestComponent implements OnInit {
  readonly color = 'primary';
  readonly title = 'spinner';
  isLoading = new Subject<boolean>();
  isLoading2 = new BehaviorSubject<boolean>(false);
  pingData: any;
  constructor(private userService: UserService, private notif: NotificationService) { }

  ngOnInit(): void {
    const ob1 = this.userService.ping();
    ob1.subscribe((resp: any) =>{
      this.pingData = resp;
    })
  }

  spin() {
    this.notif.open("spin emits true", "Info");
    this.emit(true);
    setTimeout(() => this.emit(false), 2000);
    this.notif.open("spin emitted false", "Info");
  }

  emit(v: boolean) {
    this.isLoading.next(v);
  }

  spin2() {
    this.notif.open("spin2 emits true", "Info");
    this.isLoading2.next(true);  
    setTimeout(() => this.isLoading2.next(false), 2000);
    this.notif.open("spin2 emitted false", "Info");
  }
}
